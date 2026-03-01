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
  fileId: string;
  file: FileData[];
}

const FilePreviewPopUp = ({
  setIsFileShow,
  fileId,
  file,
}: FilePreviewPopUpProps) => {
  const selectedFile = file.find((f) => f.fileId === fileId);

  return (
    // Overlay
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      {/* Modal container */}
      <div className="bg-white rounded-xl shadow-xl max-w-xl h-auto w-full p-6 flex flex-col gap-4">
        {/* File preview */}
        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-md overflow-auto">
          {selectedFile ? (
            selectedFile.fileType === "pdf" ? (
              <embed
                src={`${fileUrl}/${fileId}`}
                type="application/pdf"
                className="w-full h-full"
              />
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
          <>
            <h1>Link:</h1>
            <a
              href={`${fileUrl}/${fileId}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline break-all"
            >
              {`${fileUrl}/${fileId}`}
            </a>
          </>
        )}

        {/* Done button */}
        <button
          onClick={() => setIsFileShow(false)}
          className="mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FilePreviewPopUp;
