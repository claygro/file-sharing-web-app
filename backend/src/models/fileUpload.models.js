import mongoose from "mongoose";
const fileUploadSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    file: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    sizeOfFile: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const FileUploadModel = mongoose.model("fileUpload", fileUploadSchema);
export default FileUploadModel;
