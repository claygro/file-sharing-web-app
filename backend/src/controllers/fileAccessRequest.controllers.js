import FileShareModel from "../models/share.models.js";

class FileAccessRequest {
  async acceptRequest(req, res) {
    const { token } = req.body;
    const { id } = req.params;
    try {
      const file = await FileShareModel.findOne({ token: token });
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      file.accessUser.push(id);
      file.save();
      res.status(200).json({ message: "File is being accessed." });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in file access request ${error}` });
    }
  }
}
export default FileAccessRequest;
