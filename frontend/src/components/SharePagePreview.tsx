import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SharePagePreview = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const token = useParams();
  console.log(token.token);

  useEffect(() => {
    async function fetchFile() {
      const res = await fetch(
        `http://localhost:8000/shareUrl/share/${token?.token}`,
      );
      if (!res.ok) {
        setErrorMessage("Opps! Url is expired");
      }
      const blob = await res.blob();
      setFileType(blob.type);
      const url = URL.createObjectURL(blob);
      setFileUrl(url);
    }

    if (token?.token) fetchFile();
  }, [token]);
  console.log(fileUrl);
  console.log(errorMessage);
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* 🔝 Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h1 className="text-lg font-semibold">File Preview</h1>
      </div>

      {/* 🚨 Error UI */}
      {errorMessage ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-xl text-center">
            <h2 className="text-red-400 text-lg font-semibold">
              {errorMessage}
            </h2>
          </div>
        </div>
      ) : !fileUrl ? (
        /* ⏳ Loading UI */
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-pulse text-white/60">Loading file...</div>
        </div>
      ) : (
        /* 📦 File Preview */
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full flex items-center justify-center">
            {/* 🖼 Image */}
            {fileType.startsWith("image/") && (
              <img
                src={fileUrl}
                className="max-h-[80vh] rounded-xl shadow-lg"
              />
            )}

            {/* 🎥 Video */}
            {fileType.startsWith("video/") && (
              <video
                src={fileUrl}
                controls
                className="max-h-[80vh] w-full rounded-xl shadow-lg"
              />
            )}

            {/* 📄 PDF */}
            {fileType === "application/pdf" && (
              <iframe
                src={fileUrl}
                className="w-full h-[85vh] rounded-xl border border-white/10"
              />
            )}

            {/* ❓ Unknown File */}
            {!fileType.startsWith("image/") &&
              !fileType.startsWith("video/") &&
              fileType !== "application/pdf" && (
                <div className="text-center">
                  <p className="text-white/70 mb-4">Preview not available</p>
                  <a
                    href={fileUrl}
                    download
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  >
                    Download File
                  </a>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePagePreview;
