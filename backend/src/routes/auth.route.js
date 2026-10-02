import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { validateSignup, validateLogin, isAuth } from "../middlewares/auth.middleware.js";
import { resMessage } from "../lib/resMessage.js";

const router = express.Router();

router.get("/me", isAuth, (req, res) => resMessage(res, 200, { authenticated: true, user: req.user }));
router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/logout", isAuth, logout);

export default router;