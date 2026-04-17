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
      file.save();
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
    const { id } = req.params; //getting the receiver id
    try {
      const deleteResponse = await NotificationModels.findOneAndDelete({
        receiverId: id,
        token: token,
      });
      if (!deleteResponse) {
        return res.status(404).json({ message: "Notification cannot find" });
      }
      res.status(200).json({ message: "Notification accepted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in deleting the notification :${error}` });
    }
  }
}
export default FileAccessRequest;
