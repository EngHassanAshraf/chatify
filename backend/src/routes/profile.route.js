import express from "express";
import { getProfile, updateProfile, updateProfilePicture } from "../controllers/profile.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuth, getProfile);
router.put("/update", isAuth, updateProfile);
router.patch("/update/picture", isAuth, updateProfilePicture);

export default router;
