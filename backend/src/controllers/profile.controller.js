import { updateService } from "../services/profile.service.js";
import { resMessage } from "../lib/resMessage.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/User.js";

export const getProfile = async (req, res) => {
    // TODO: Get Profile Logic
    return resMessage(
        res,
        200,
        {
            message: "Profile retrieved Successfully",
        })
}

export const updateProfile = async (req, res) => {
    // TODO: Update Profile Logic
    try {
        return resMessage(
            res,
            200,
            {
                success: true,
                message: "Profile updated Successfully",
            });
    } catch (error) {
        console.error(`Update Profile Failed: ${error.message}`);
        return resMessage(res, 500, "Internal Server Error while updating profile");
    }

}

export const updateProfilePicture = async (req, res) => {
    try {

        const picture = req.body;

        if (!picture) return resMessage(res, 400, "picture not found");

        const userId = req.user.id;

        const uploadRes = await cloudinary.uploader.upload(picture);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { picture: uploadRes.secure_url },
            { new: true }
        );

        req.user = updatedUser;

        return resMessage(
            res,
            200,
            {
                success: true,
                message: "Profile Picture Updated Successfully",
            }
        );
    } catch (error) {
        console.error(`Update profile picture failed: ${error.message}`);
        return resMessage(res, 500, "Internal server error while updating profile picture");
    }

}