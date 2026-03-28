import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
class AuthControllers {
  async signup(req, res) {
    const { userName, email, password } = req.body;
    try {
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) {
        return res.status(401).json({ message: "Email is already created" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      let avatarData = null;
      if (req.file) {
        avatarData = {
          url: req.file.path, // Cloudinary URL
          publicId: req.file.filename,
        };
      }
      const response = await UserModel.create({
        avatar: avatarData,
        userName,
        email,
        password: hash,
      });
      const userToken = jwt.sign(
        {
          userid: response._id,
          avatar: avatarData,
          username: userName,
          email: email,
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
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: `Error in signup ${error}` });
    }
  }
  //signout
  async signout(req, res) {
    try {
      await res.cookie("userToken", "", {
        secure: process.env.NODE_ENV === "production", // Use true for HTTPS
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // "None" for cross-origin
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiry time (30 days)
      });
      res.status(200).json({ message: "Signout successfully" });
    } catch (error) {
      res.status(500).json({ message: `Error in signout ${error}` });
    }
  }
  //signin
  async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "Something went wrong" });
      }

      bcrypt.compare(password, user.password, function (error, result) {
        if (result) {
          return res.status(200).json({ message: "Welcome back" });
        } else {
          return res.status(404).json({ message: "Something went wrong" });
        }
      });
      const userToken = jwt.sign(
        {
          userid: user._id,
          avatar: user.avatar,
          username: user.userName,
          email: email,
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
      res.status(500).json({ message: `Error in signIn ${error}` });
    }
  }
}
export default AuthControllers;
