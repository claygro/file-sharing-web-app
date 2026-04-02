import mongoose from "mongoose";
const fileShare = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fileUpload",
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    isRestriction: {
      type: String,
      
    },
  },
  { timestamps: true },
);
const FileShareModel = mongoose.model("fileShare", fileShare);
export default FileShareModel;
