import React from "react";
import fileUrl from "../config/fileurl.config";

interface FileData {
  _id: string;
  sizeOfFileInKb: number;
  sizeOfFileInMb: number;
  name: string;
  createdAt: string;
  fileType: string;
  fileId: string;
}

interface FilePreviewPopUpProps {
  setIsFileShow: React.Dispatch<React.SetStateAction<boolean>>;
  setFileId: React.Dispatch<React.SetStateAction<string>>;
  fileId: string;
  file: FileData[];
}

const FilePreviewPopUp = ({
  setIsFileShow,
  setFileId,
  fileId,
  file,
}: FilePreviewPopUpProps) => {
  const selectedFile = file.find((f) => f.fileId === fileId);

  return (
    // Overlay
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      {/* Modal container */}
      <div
        key={fileId}
        className="bg-white rounded-xl shadow-xl max-w-xl h-auto w-full p-6 flex flex-col gap-4"
      >
        {/* File preview */}
        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-md overflow-auto">
          {!selectedFile ? (
            "Loading"
          ) : selectedFile ? (
            selectedFile.fileType === "pdf" ? (
              <embed
                src={`${fileUrl}/${fileId}`}
                type="application/pdf"
                className="w-full h-full"
              />
            ) : selectedFile.fileType === "mp4" ? (
              <video
                src={`${fileUrl}/${fileId}`}
                controls
                className="max-h-full max-w-full object-contain"
              />
            ) : selectedFile.fileType === "docx" ? (
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <p className="text-gray-600">Preview not available for DOCX</p>
              </div>
            ) : (
              <img
                src={`${fileUrl}/${fileId}`}
                alt={selectedFile.name}
                className="max-h-full max-w-full object-contain"
              />
            )
          ) : (
            <p className="text-gray-500">Loading preview...</p>
          )}
        </div>

        {/* Link */}
        {selectedFile && (
          <div className="mt-4 p-4 border rounded-xl shadow-sm bg-gray-50 flex items-center justify-between">
            <p className="text-sm text-gray-700 truncate max-w-xs">
              {selectedFile.name}
            </p>

          </div>
        )}

        {/* Done button */}
        <button
          onClick={() => {
            setFileId("");
            setIsFileShow(false);
          }}
          className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FilePreviewPopUp;
