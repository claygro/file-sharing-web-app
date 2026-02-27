import mongoose from "mongoose";
const fileUploadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    title: {
      type: String,
    },
    originalFileName: {
      type: String,
      required: true,
    },
    sizeOfFileInKb: {
      type: Number,
    },
    sizeOfFileInMb: {
      type: Number,
    },
    fileType: {
      type: String,
    },
    fileId: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const FileUploadModel = mongoose.model("fileUpload", fileUploadSchema);
export default FileUploadModel;
