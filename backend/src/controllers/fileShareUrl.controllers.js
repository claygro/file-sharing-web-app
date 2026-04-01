import crypto from "crypto";
import FileShareModel from "../models/share.models.js";
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
      const timeInMs = convertToMs(timeDuration, timeDurationUnit);
      const expiresAt = new Date(Date.now() + timeInMs);
      await FileShareModel.create({
        token,
        fileId,
        expiresAt,
        isRestriction,
      });
      res.json({ url: `http://localhost:5173/share/${token}` });
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in creating sharing url ${error}` });
    }
  }
}
export default FileShareControllers;
