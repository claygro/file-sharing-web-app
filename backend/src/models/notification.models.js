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
    default: "pending",
  },
  fileName: {
    type: String,
    // required: [true, "File name is required"],
  },

  token: {
    type: String,
  },
});
const NotificationModels = mongoose.model("notification", notificationSchema);
export default NotificationModels;
