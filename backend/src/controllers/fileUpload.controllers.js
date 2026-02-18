import FileUploadModel from "../models/fileUpload.models.js";
class FileUploadController {
  async fileUpload(req, res) {
    const { file, title, sizeOfFile, fileType } = req.body;
    const { userid } = req.user;

    try {
      res.status(401).json({ message: "File upload success fully" });
    } catch (error) {
      res.status(500).json({ message: `Error in upload file ${error}` });
    }
  }
}
export default FileUploadController;
