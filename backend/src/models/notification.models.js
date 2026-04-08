import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  fileToken: String,

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});
const NotificationModels = mongoose.model("notification", notificationSchema);
export default NotificationModels;
