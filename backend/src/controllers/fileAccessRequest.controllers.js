import FileShareModel from "../models/share.models.js";
import NotificationModels from "../models/notification.models.js";

class FileAccessRequest {
  async acceptRequest(req, res) {
    const { token, notificationId } = req.body;
    const { id } = req.params;

    try {
      const file = await FileShareModel.findOne({ token: token });

      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      // give access
      file.accessUser.push(id);
      await file.save();

      // delete notification
      await NotificationModels.findByIdAndDelete(notificationId);

      res.status(200).json({
        message: "File is being accessed.",
      });
    } catch (error) {
      res.status(500).json({
        message: `Error in file access request ${error}`,
      });
    }
  }

  // access denied
  async accessDenied(req, res) {
    const { token } = req.body;
    const { id } = req.params; // notification id

    try {
      const file = await NotificationModels.findOne({
        $and: [{ token: token }, { _id: id }],
      }).populate("senderId");

      if (!file) {
        return res.status(404).json({
          message: "File not found",
        });
      }

      file.status = "denied";
      await file.save();

      // delete notification
      await NotificationModels.findByIdAndDelete(id);

      res.status(200).json({
        message: "Successfully denied the request.",
      });
    } catch (error) {
      res.status(500).json({
        message: `Error in access denied: ${error}`,
      });
    }
  }
}

export default FileAccessRequest;
