import UserModel from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
class AuthControllers {
  async signup(req, res) {
    const { avatar, userName, email, password } = req.body;
    try {
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) {
        return res.status(401).json({ message: "Email is already created" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const response = await UserModel.create({
        avatar,
        userName,
        email,
        password: hash,
      });
      const userToken = jwt.sign(
        {
          userName,
          email,
        },
        process.env.JWT_SECRETE_KEY,
        { expiresIn: "30d" },
      );
      res.cookie("userToken", userToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json(response);
      res.status(200).send("Hello world");
    } catch (error) {
      res.status(500).json({ message: `Error in signup ${error}` });
    }
  }
}
export default AuthControllers;
