import React from "react";

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
        <a
          href={`http://localhost:8000/fileVault/file/${fileId}`}
          target="_blank"
          rel="noreferrer"
        >
          {`http://localhost:8000/fileVault/file/${fileId}`}
        </a>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default FilePreviewPopUp;
