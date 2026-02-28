import FileUploadModel from "../models/fileUpload.models.js";
import path from "path";
import { v4 as uuid } from "uuid";
import cloudinary from "../cloudinary.js";
class FileUploadController {
  async fileUpload(req, res) {
    let { name } = req.body;
    const file = req.file;
    const { userid } = req.user;
    //to find the extension of file.
    let extensionName = path.extname(file.originalname).replace(".", "");
    //to find the size of file
    let sizeInKb = (file.size / 1024).toFixed(2);
    let sizeInMb = (file.size / (1024 * 1024)).toFixed(4);
    const fileId = uuid();
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        folder: "fileVault",
      });
      const response = await FileUploadModel.create({
        userId: userid,
        name: name,
        originalFileName: result.original_filename,
        fileType: extensionName,
        sizeOfFileInKb: sizeInKb,
        fileId,
        sizeOfFileInMb: sizeInMb,
        secure_url: result.secure_url,
      });

      res.status(200).json({
        message: "File upload successfully",
        fileLink: `http://localhost:8000/file/${fileId}`,
        response,
      });
    } catch (error) {
      res.status(500).json({ message: `Error in upload file ${error}` });
    }
  }
}
export default FileUploadController;
