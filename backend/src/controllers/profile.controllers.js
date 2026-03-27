import UserModel from "../models/user.models.js";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
class Profile {
  async profile(req, res) {
    const { userid } = req.user;
    try {
      const response = await UserModel.findOne({ _id: userid });
      if (!response) {
        return res.status(404).json({ message: "User doesnot exist" });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: `Error in getting profile ${error}` });
    }
  }
  async updateProfile(req, res) {
    const { userid } = req.user;
    const { userName, email, password } = req.body;
    try {
      const updateFields = { userName, email }; //contains all the field which are going to update.

      if (req.file) {
        updateFields.avatar = {
          url: req.file.path, //cloudinary url
          publicId: req.file.filename,
        };
      }

      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        updateFields.password = hashPassword;
      }
      const updatedUser = await UserModel.findByIdAndUpdate(
        userid,
        {
          $set: updateFields,
        },
        { new: true, runValidators: true },
      );
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "User not found or something went wrong" });
      }
      const userToken = jwt.sign(
        {
          userid: updatedUser._id,
          avatar: updatedUser.avatar,
          username: updatedUser.userName,
          email: updatedUser.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" },
      );
      res.cookie("userToken", userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    } catch (error) {
      res.status(500).json({ message: `Error in profile update ${error}` });
    }
  }
}
export default Profile;
