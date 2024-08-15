import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/userController.js";
import { Authenticate } from "../middleware/Authenticate.js";
import { login, refreshToken, register } from "../controller/authController.js";

const route = express.Router();

// Authentication Routes
route.post("/register", register);
route.post("/login", login);
route.post("/refresh_token", refreshToken);

route.post("/create_user", Authenticate, createUser);
route.get("/get_users", Authenticate, getAllUsers);
route.get("/get_users/:id", Authenticate, getUserById);
route.patch("/update_user/:id", Authenticate, updateUser);
route.delete("/delete_user/:id", Authenticate, deleteUser);

export default route;
