import React from "react";

interface FileDataType {
  name: string;
}

interface FilePreviewPopUpProps {
  setIsFileShow: React.Dispatch<React.SetStateAction<boolean>>;
  file: FileDataType;
}
const FilePreviewPopUp = ({ setIsFileShow, file }: FilePreviewPopUpProps) => {
  console.log(file);
  return <div>FilePreviewPopUp</div>;
};

export default FilePreviewPopUp;
