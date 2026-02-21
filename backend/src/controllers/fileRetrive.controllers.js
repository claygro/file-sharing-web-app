import FileUploadModel from "../models/fileUpload.models.js";

class FileRetriveControllers {
  async retriveFile(req, res) {
    const { userid } = req.user;
    try {
      const fileResponse = await FileUploadModel.find({ userId: userid });
      if (fileResponse.length <= 0) {
        return res
          .status(404)
          .json({ message: "No files found. Please upload a file first." });
      }
      res.status(200).json(fileResponse);
    } catch (error) {
      res.status(500).json({ message: `Error in retriving file ${error}` });
    }
  }
}
export default FileRetriveControllers;
