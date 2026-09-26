import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { validateSignup, validateLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

export default router;