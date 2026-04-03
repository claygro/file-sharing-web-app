import crypto from "crypto";
import FileShareModel from "../models/share.models.js";
import FileUploadModel from "../models/fileUpload.models.js";
import axios from "axios";
function convertToMs(value, unit) {
  switch (unit) {
    case "minutes":
      return value * 60 * 1000;
    case "hours":
      return value * 60 * 60 * 1000;
  }
}
class FileShareControllers {
  async fileShare(req, res) {
    const { fileId, timeDuration, timeDurationUnit, isRestriction } = req.body;

    try {
      const token = crypto.randomBytes(16).toString("hex");

      let expiresAt = null;

      // Only set expiry if both values exist
      if (timeDuration && timeDurationUnit) {
        const timeInMs = convertToMs(timeDuration, timeDurationUnit);

        if (!isNaN(timeInMs)) {
          expiresAt = new Date(Date.now() + timeInMs);
        }
      }

      await FileShareModel.create({
        token,
        fileId,
        expiresAt, // null OR valid date
        isRestriction,
      });

      res.json({ url: `http://localhost:5173/share/${token}` });
    } catch (error) {
      res.status(500).json({
        message: `Error in creating sharing url ${error}`,
      });
    }
  }
  //checking the token expire
  async urlExpireValidate(req, res) {
    const { token } = req.params;
    try {
      const url = await FileShareModel.findOne({ token });
      if (!url) {
        return res.status(404).json({ message: "Can't find the url" });
      }
      // checking the expire of the url
      if (url.expiresAt !== null) {
        if (Date.now() > new Date(url.expiresAt).getTime()) {
          return res.status(410).json({ message: "Link expire" });
        }
      }

      const file = await FileUploadModel.findById(url.fileId);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      const response = await axios({
        url: file.secure_url,
        method: "GET",
        responseType: "stream",
      });
      // ✅ Set headers for preview
      res.setHeader("Content-Type", response.headers["content-type"]);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${file.originalFileName}"`,
      );

      // 📤 Pipe stream to client
      response.data.pipe(res);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in validate the expire of url ${error}` });
    }
  }
}
export default FileShareControllers;
