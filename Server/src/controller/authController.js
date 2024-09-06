import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { sendEmail } from "../services/emailService.js";
import path from "path";
import { fileURLToPath } from "url";

const generateToken = (user, secret, expiresIn) => {
  return jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn });
};

export const register = async (req, res) => {
  const { user_name, email, password, role } = req.body;

  try {
    if (!user_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the admin already exists
    if (role === "admin") {
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({ message: "Admin already exists" });
      }
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    user = new User({
      user_name,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "local-user",
    });

    await user.save();

    // Define the path to the image
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imagePath = path.join(__dirname, "../assets/MailIcon.png");

    const createEmailTemplate = (user_name) => {
      return `
 <!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>User Onboard</title>
  <!-- Import Google Font for consistency -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>

<body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f0f0f0; font-family: 'Roboto', sans-serif;">
  <table role="presentation" style="width: 30rem; background-color: #fdfdfd; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; border-collapse: collapse;">
    <tr>
      <td style="text-align: center; background-color: #93bef4; height: 5rem; color: #ffffff; font-size: 1.5rem; text-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px; vertical-align: middle;">
        Velocity Sector
      </td>
    </tr>
    <tr>
      <td style="text-align: center; padding: 0;">
        <img src="cid:logo1" alt="Logo" style="height: 10rem; width: 10rem;" />
      </td>
    </tr>
    <tr>
      <td style="padding: 1rem 2rem 1rem 2rem; vertical-align: top;">
        <h4 style="margin: 0; padding: 0;">Dear ${user_name},</h4>
        <p style="margin: 0; padding: 0; padding-top: 0.5rem;">Welcome aboard! Your registration has been successful.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 1rem 2rem 1rem 2rem; vertical-align: top;">
        <p style="margin: 0; padding: 0;">Best regards,</p>
        <p style="margin: 0; padding: 0; padding-top: 0.5rem; font-weight: 600;">Manish Kharbade</p>
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
