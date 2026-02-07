import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    avatar: {
      url: String,
      publicId: String,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const UserModel = mongoose.model("user", userSchema);
export default UserModel;
