import axios from "axios";
import FileUploadModel from "../models/fileUpload.models.js";

class FileUrlLink {
  async getUrl(req, res) {
    const { fileId } = req.params;
    try {
      const fileResponse = await FileUploadModel.findOne({ fileId });
      if (!fileResponse) return res.status(404).send("File not found");
      //stream file securely from cloudinary
      const response = await axios({
        url: fileResponse.secure_url,
        method: "GET",
        responseType: "stream",
      });
      //response.data=a stream of file data coming from Cloudinary.
      response.data.pipe(res);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in getting the file url ${error}` });
    }
  }
}
export default FileUrlLink;
