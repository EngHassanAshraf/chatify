import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { validateSignup } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.get("/login", (req, res) => { res.send("Login endpoint") });
router.get("/logout", (req, res) => { res.send("Logout endpoint") });

export default router;