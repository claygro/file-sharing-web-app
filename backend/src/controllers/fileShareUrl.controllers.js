import crypto from "crypto";
import FileShareModel from "../models/share.models.js";
import FileUploadModel from "../models/fileUpload.models.js";
import axios from "axios";
import NotificationModels from "../models/notification.models.js";
import { getIo } from "../../socket.js";
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
    const { userid } = req.user;
    try {
      if (!userid) {
        return (
          res.status(401),
          json({ message: "Unauthorized. Please loggedin" })
        );
      }
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
        ownerId: userid,
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
  async checkUrl(req, res) {
    const { token } = req.params;
    const { userid } = req.user;
    try {
      const files = await FileShareModel.findOne({ token });
      if (!files) {
        return res.status(404).json({ message: "Can't find the file" });
      }
      // checking the expire of the url
      if (files.expiresAt !== null) {
        if (Date.now() > new Date(files.expiresAt).getTime()) {
          return res.status(410).json({ message: "Link expire" });
        }
      }
      const hasAccess = files.accessUser.some(
        (user) => user.toString() == userid,
      );
      console.log(hasAccess);
      // checking the restriction on url
      if (files.isRestriction === "restricted" && !hasAccess) {
        const existNotification = await NotificationModels.findOne({
          receiverId: userid,
          token: token,
        });
        if (existNotification) {
          return res
            .status(409)
            .json({
              message:
                "Notification already sent. Please wait for sender response.",
            });
        }
        const notification = await NotificationModels.create({
          senderId: files.ownerId,
          receiverId: userid,
          token: token,
        });
        await notification.populate("receiverId");
        const io = getIo();
        io.to(files.ownerId.toString()).emit("new_notification", notification);
        return res.status(401).json({ message: "This file is restricted" });
      }
      const file = await FileUploadModel.findById(files.fileId);
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
      //this content type tells the browser what type of file it is.
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${file.originalFileName}"`,
      );
      // Content-Disposition — What should browser do with it?
      // inline
      // Opens file inside the browser
      // Example: PDF opens in a tab
      // 📤 Pipe stream to client
      if (!hasAccess) {
        return res.status(403).json({ message: "No access to this file" });
      }
      response.data.pipe(res);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error in validate the expire of url ${error}` });
    }
  }
}
export default FileShareControllers;
