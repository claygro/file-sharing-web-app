import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    resource_type: "auto", // images only
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp", // images
      "pdf", // PDF
      "doc",
      "docx", // Word
      "xls",
      "xlsx", // Excel
      "ppt",
      "pptx", // PowerPoint
      "txt",
    ],
    transformation: [
      { width: 300, height: 300, crop: "fill", gravity: "face" },
    ],
  },
});

const uploadAvatar = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default uploadAvatar;
