// import FileUploadModel from "../models/fileUpload.models.js";
class FileUploadController {
  async fileUpload(req, res) {
    const file = req.file;
    // const { userid } = req.user;
    // console.log(userid);
    console.log(file);
    try {
      res.status(200).json(file.path);
    } catch (error) {
      res.status(500).json({ message: `Error in upload file ${error}` });
    }
  }
}
export default FileUploadController;
