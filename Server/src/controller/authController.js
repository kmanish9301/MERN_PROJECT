import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

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
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userRole = role === "admin" ? "admin" : "local-user";

    user = new User({
      user_name,
      email,
      password: hashedPassword,
      role: userRole,
    });
    await user.save();

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
      .json({ success: true, message: "User Created Successfully..!" });
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
      "1h"
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
