import UserModel from "../models/user.models.js";

class Profile {
  async profile(req, res) {
    const { id } = req.params;
    try {
      const response = await UserModel.findOne({ id });
      if (!response) {
        return res.status(404).json({ message: "User doesnot exist" });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: `Error in getting profile ${error}` });
    }
  }
}
export default Profile;
