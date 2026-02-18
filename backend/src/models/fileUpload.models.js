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
    },
    sizeOfFile: {
      type: Number,
    },
    fileType: {
      type: String,
    },
  },
  { timestamps: true },
);
const FileUploadModel = mongoose.model("fileUpload", fileUploadSchema);
export default FileUploadModel;
