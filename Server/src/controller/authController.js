import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { sendEmail } from "../services/emailService.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../../userImages");

const generateToken = (user, secret, expiresIn) => {
  return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn });
};

export const register = async (req, res) => {
  const { user_name, email, password, role } = req.body;

  try {
    if (!user_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({ message: "Admin already exists" });
      }
    }

    let user = await User.findOne({ email });
    if (user) {
      // Delete the uploaded file if the user already exists
      if (req.file) {
        fs.unlink(path.join(uploadsDir, req.file.filename), (err) => {
          if (err) {
            console.error("Error deleting the file:", err);
          }
        });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle image upload if there's an image in the request
    const relativeImagePath = req.file
      ? `${process.env.APP_BASE_URL}/userImages/${req.file.filename}`
      : null;

    // Create the new user
    user = new User({
      user_name,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "local-user",
      userImage: relativeImagePath,
    });

    await user.save();

    // Define the path to the image for email
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, "../assets/Mail_Icon.jpg");

    const createEmailTemplate = (user_name) => {
      return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Onboard</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
    }

    table {
      border-spacing: 0;
      border-collapse: collapse;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }

    img {
      display: block;
      margin: 0 auto;
      border: 0;
      background : transparent;
    }

    h4, p {
      margin: 0;
      padding: 0;
      font-size: 16px;
      line-height: 1.5;
    }

    .email-header {
      background-color: #93bef4;
      color: #ffffff;
      font-size: 24px;
      padding: 20px;
      text-align: center;
      text-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px;
    }

    .email-body {
      padding: 20px;
    }

    .email-footer {
      padding: 20px;
      font-size: 14px;
      color: #333333;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #93bef4;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <table role="presentation">
    <tr>
      <td>
        <div class="email-header">
          Velocity Sector
        </div>
      </td>
    </tr>
    <tr>
      <td style="text-align: center;">
        <img src="cid:logo1" alt="Logo" style="width: 100px; height: 100px; margin-top: 20px;" />
      </td>
    </tr>
    <tr>
      <td class="email-body">
        <h4>Dear ${user_name},</h4>
        <p>Welcome aboard! Your registration has been successful. We're excited to have you on board.</p>
      </td>
    </tr>
    <tr>
      <td class="email-footer">
        <p>Best regards,</p>
        <p><strong>Manish Kharbade</strong></p>
      </td>
    </tr>
  </table>
</body>
</html>
      `;
    };

    // Prepare the email template and attachments
    const emailTemplate = createEmailTemplate(user.user_name);
    const attachments = [
      {
        filename: "logo.jpg",
        path: imagePath,
        cid: "logo1",
      },
    ];

    await sendEmail(
      user.email,
      "Welcome Onboard...!",
      emailTemplate,
      attachments
    );

    // Generate JWT tokens
    const token = generateToken(
      user,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      "15m"
    );
    const refreshToken = generateToken(
      user,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      "7d"
    );

    user.refreshToken = refreshToken;
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate tokens
    const token = generateToken(
      user,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      "24h"
    );
    const refreshToken = generateToken(
      user,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      "7d"
    );

    // Save the refresh token to the user object
    user.refreshToken = refreshToken;
    await user.save();

    // Send the data & tokens and user role in the response
    const userData = {
      userName: user.user_name,
      email: user.email,
      role: user.role,
      userImage: user.userImage,
    };
    res
      .status(200)
      .json({ accessToken: token, refreshToken: refreshToken, userData });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists" });
    }
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: true, message: messages });
    }
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  const { token: oldRefreshToken } = req.body;
  if (!oldRefreshToken)
    return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(
      oldRefreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== oldRefreshToken) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const token = generateToken(
      user,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      "15m"
    );
    const newRefreshToken = generateToken(
      user,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      "7d"
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({ token, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
