import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SharePagePreview = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const hasFetched = useRef(false);
  const { token } = useParams();

  useEffect(() => {
    if (hasFetched.current) return; // 🚨 prevent double call
    hasFetched.current = true;
    async function fetchFile() {
      try {
        const res = await axios.get(
          `http://localhost:8000/shareUrl/share/${token}`,
          {
            responseType: "blob",
            withCredentials: true,
          },
        );

        const blob = res.data;
        setFileType(blob.type);

        const url = URL.createObjectURL(blob);
        setFileUrl(url);
      } catch (error: any) {
        const response = error?.response;

        if (response?.data instanceof Blob) {
          // convert blob error → json
          const text = await response.data.text();
          const json = JSON.parse(text);
          setErrorMessage(json.message);
        } else {
          setErrorMessage(response?.data?.message || "Something went wrong");
        }
      }
    }

    if (token) fetchFile();
  }, [token]);

  const isImage = fileType?.startsWith("image/");
  const isVideo = fileType?.startsWith("video/");
  const isPDF = fileType === "application/pdf";

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
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
        <div className="flex flex-1 items-center justify-center">
          <div className="animate-pulse text-white/60">Loading file...</div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full flex items-center justify-center">
            {/* 🖼 Image */}
            {isImage && (
              <img
                src={fileUrl}
                className="max-h-[80vh] rounded-xl shadow-lg"
              />
            )}

            {/* 🎥 Video */}
            {isVideo && (
              <video
                src={fileUrl}
                controls
                className="max-h-[80vh] w-full rounded-xl shadow-lg"
              />
            )}

            {/* 📄 PDF */}
            {isPDF && (
              <iframe
                src={fileUrl}
                className="w-full h-[85vh] rounded-xl border border-white/10"
              />
            )}

            {/* ❓ Unknown File */}
            {!isImage && !isVideo && !isPDF && (
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
