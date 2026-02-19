import FileUploadModel from "../models/fileUpload.models.js";
import path from "path";
class FileUploadController {
  async fileUpload(req, res) {
    let { title } = req.body;
    const file = req.file;
    const { userid } = req.user;
    // console.log(userid);
    console.log(file);
    console.log(file.path);
    //to find the extension of file.
    let extensionName = path.extname(file.originalname).replace(".", "");
    console.log(extensionName);
    //to find the size of file
    let sizeInKb = (file.size / 1024).toFixed(2);
    let sizeInMb = (file.size / (1024 * 1024)).toFixed(4);
    try {
      const response = await FileUploadModel.create({
        userId: userid,
        title: title,
        file: file.path,
        fileType: extensionName,
        sizeOfFileInKb: sizeInKb,
        sizeOfFileInMb: sizeInMb,
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: `Error in upload file ${error}` });
    }
  }
}
export default FileUploadController;
