import React from "react";
import fileUrl from "../config/fileurl.config";
import { Download, Share2 } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div
        key={fileId}
        className="rounded-2xl w-full max-w-4xl flex flex-col gap-4 overflow-hidden"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <span className="text-sm font-medium truncate max-w-xs text-white/60">
            {selectedFile?.name ?? "Preview"}
          </span>

          <div className="flex items-center gap-2">
            {/* Download */}
            <a
              href={selectedFile ? `${fileUrl}/${fileId}` : "#"}
              download={selectedFile?.name}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition"
            >
              <Download size={14} />
              Download
            </a>

            {/* Share */}
            <button
              onClick={() => {
                if (selectedFile && navigator.clipboard) {
                  navigator.clipboard.writeText(`${fileUrl}/${fileId}`);
                }
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 transition"
            >
              <Share2 size={14} />
              Share
            </button>

            {/* Done */}
            <button
              onClick={() => {
                setFileId("");
                setIsFileShow(false);
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-white text-black border border-white/20 hover:bg-white/90 transition"
            >
              Done
            </button>
          </div>
        </div>

        {/* Preview (FIXED SIZE) */}
        <div className="flex justify-center items-center mx-6 mb-6 rounded-xl overflow-hidden w-[800px] h-[450px] max-w-full bg-black/30 border border-white/10">
          {!selectedFile ? (
            <span className="text-white/40 text-sm">Loading</span>
          ) : selectedFile.fileType === "pdf" ? (
            <embed
              src={`${fileUrl}/${fileId}`}
              type="application/pdf"
              className="w-full h-full"
            />
          ) : selectedFile.fileType === "mp4" ? (
            <video
              src={`${fileUrl}/${fileId}`}
              controls
              className="w-full h-full object-contain"
            />
          ) : selectedFile.fileType === "docx" ? (
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <p className="text-white/40 text-sm">
                Preview not available for DOCX
              </p>
            </div>
          ) : (
            <img
              src={`${fileUrl}/${fileId}`}
              alt={selectedFile.name}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* File info */}
        {selectedFile && (
          <div className="mx-6 mb-6 px-4 py-3 rounded-xl flex items-center justify-between bg-white/5 border border-white/10">
            <p className="text-sm truncate max-w-xs text-white/70">
              {selectedFile.name}
            </p>
            <span className="text-xs text-white/40">
              {selectedFile.sizeOfFileInMb
                ? `${selectedFile.sizeOfFileInMb.toFixed(2)} MB`
                : `${selectedFile.sizeOfFileInKb} KB`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreviewPopUp;
