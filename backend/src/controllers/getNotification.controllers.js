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
}
export default NotificationControllers;
