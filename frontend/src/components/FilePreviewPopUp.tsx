import React from "react";
import fileUrl from "../config/fileurl.config";
interface FilePreviewPopUpProps {
  setIsFileShow: React.Dispatch<React.SetStateAction<boolean>>;
  fileId: string;
}
const FilePreviewPopUp = ({ setIsFileShow, fileId }: FilePreviewPopUpProps) => {
  console.log(setIsFileShow);
  console.log(fileId);
  return (
    <div>
      {fileId ? (
        <a href={`${fileUrl}/${fileId}`} target="_blank" rel="noreferrer">
          {`${fileUrl}${fileId}`}
        </a>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default FilePreviewPopUp;
