import FileShareModel from "../models/share.models.js";
import NotificationModels from "../models/notification.models.js";
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
      await file.save();
      res.status(200).json({ message: "File is being accessed." });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in file access request ${error}` });
    }
  }
  // deleting the notification
  async deleteNotification(req, res) {
    const { token } = req.body;
    const { id } = req.params;
    try {
      const deleteResponse = await NotificationModels.findOneAndDelete({
        token: token,
        _id: id,
      });
      if (!deleteResponse) {
        return res.status(404).json({ message: "Notification cannot find" });
      }
      res.status(200).json({ message: "Notification delete successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in deleting the notification :${error}` });
    }
  }
  // access denied
  async accessDenied(req, res) {
    const { token } = req.body;
    const { receiverId } = req.params;
    try {
      const file = await NotificationModels.findOne({
        $and: [{ token: token }, { receiverId: receiverId }],
      }).populate("senderId");
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      file.status = "denied";
      await file.save();
      res.status(403).json({
        message: `${file.senderId.userName} denied your request for ${file.fileName} file`,
      });
    } catch (error) {
      res.status(500).json({ message: `Error in access denied: ${error}` });
    }
  }
}
export default FileAccessRequest;
