import NotificationModels from "../models/notification.models.js";
class NotificationControllers {
  async getNotification(req, res) {
    const { userid } = req.user;
    try {
      const data = await NotificationModels.find({ senderId: userid }).populate(
        "receiverId",
      );
      if (!data) {
        return res.status(404).json({ message: "Notification not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: `Error in send notification ${error}` });
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
export default NotificationControllers;
