import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => {
    return {
      folder: "uploadsAvatar",
      resource_type: "auto",
    };
  },
});

export const uploadAvatar = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

// 🔹 FileVault Storage (temporary local storage)
export const uploadFile = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: async () => ({
      folder: "fileVault",
      resource_type: "auto", // supports any file type
    }),
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});
