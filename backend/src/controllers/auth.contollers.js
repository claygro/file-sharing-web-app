import UserModel from "../models/user.models.js";
class AuthControllers {
  async signup(req, res) {
    const { userName, email, password } = req.body;
    try {
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) {
        return res.status(401).json({ message: "Email is already created" });
      }
      const response = await UserModel.create({ userName, email, password });
      res.status(200).json(response);
      res.status(200).send("Hello world");
    } catch (error) {
      res.status(500).json({ message: `Error in signup ${error}` });
    }
  }
}
export default AuthControllers;
