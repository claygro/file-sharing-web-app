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
    <div className="fixed inset-0 bg-black/60  backdrop-blur-sm flex justify-center items-center z-50">
      {/* Modal container */}
      <div
        key={fileId}
        className="rounded-2xl w-full max-w-4xl h-auto flex flex-col gap-4 overflow-hidden"
        style={{
          background: "rgba(10, 10, 10, 0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 48px 0 rgba(0,0,0,0.55)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        {/* Top action bar */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* File name */}
          <span
            className="text-sm font-medium truncate max-w-xs"
            style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}
          >
            {selectedFile?.name ?? "Preview"}
          </span>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {/* Download */}
            <a
              href={selectedFile ? `${fileUrl}/${fileId}` : "#"}
              download={selectedFile?.name}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.13)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.07)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>

            {/* Share */}
            <button
              onClick={() => {
                if (selectedFile && navigator.clipboard) {
                  navigator.clipboard.writeText(`${fileUrl}/${fileId}`);
                }
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.13)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.07)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share
            </button>

            {/* Done */}
            <button
              onClick={() => {
                setFileId("");
                setIsFileShow(false);
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: "rgba(255,255,255,0.9)",
                color: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.9)";
              }}
            >
              Done
            </button>
          </div>
        </div>

        {/* File preview */}
        <div
          className="flex justify-center items-center mx-6 mb-6 rounded-xl overflow-auto"
          style={{
            minHeight: "420px",
            background: "rgba(0,0,0,0.25)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {!selectedFile ? (
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
              Loading
            </span>
          ) : selectedFile ? (
            selectedFile.fileType === "pdf" ? (
              <embed
                src={`${fileUrl}/${fileId}`}
                type="application/pdf"
                className="w-full h-full"
                style={{ minHeight: "420px" }}
              />
            ) : selectedFile.fileType === "mp4" ? (
              <video
                src={`${fileUrl}/${fileId}`}
                controls
                className="max-h-full max-w-full object-contain"
              />
            ) : selectedFile.fileType === "docx" ? (
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
                  Preview not available for DOCX
                </p>
              </div>
            ) : (
              <img
                src={`${fileUrl}/${fileId}`}
                alt={selectedFile.name}
                className="max-h-full max-w-full object-contain"
              />
            )
          ) : (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
              Loading preview...
            </p>
          )}
        </div>

        {/* File info bar */}
        {selectedFile && (
          <div
            className="mx-6 mb-6 px-4 py-3 rounded-xl flex items-center justify-between"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p
              className="text-sm truncate max-w-xs"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {selectedFile.name}
            </p>
            <span
              className="text-xs"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
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
