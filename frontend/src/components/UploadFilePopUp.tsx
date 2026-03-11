import {
  useState,
  type ChangeEvent,
  type FormEvent,
  useRef,
  useContext,
} from "react";
import { X, UploadCloud } from "lucide-react";
import connection from "../config/connection.config";
import type { Dispatch, SetStateAction } from "react";
import { FileContext } from "../context/fileRetriveContext";
const UploadFilePopUp = ({
  setIsShowPopUp,
}: {
  setIsShowPopUp: Dispatch<SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { retriveFileData } = useContext(FileContext);
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);

      await connection.post("/uploadFile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Upload successful!");
      retriveFileData();
      setFile(null);
      setName("");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen px-4">
      {/* Modal Container */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-10 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setIsShowPopUp(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Upload Content
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter file title..."
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:outline-none text-lg"
            />
          </div>

          {/* Drag & Drop Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-900 hover:bg-blue-50/30 transition group"
          >
            <input
              required
              ref={fileInputRef}
              onChange={handleChangeFile}
              type="file"
              className="hidden"
              name="file"
            />

            <div className="bg-blue-100 p-5 rounded-full group-hover:scale-110 transition-transform">
              <UploadCloud className="w-10 h-10 text-blue-900" />
            </div>

            <p className="mt-5 text-lg font-medium text-gray-700">
              {file ? file.name : "Drag & Drop file here or click to browse"}
            </p>
            <p className="text-sm text-gray-400 mt-1">Max 50MB</p>
          </div>

          {/* File Preview */}
          {file && (
            <div className="bg-gray-50 border rounded-xl p-4 flex items-center justify-between">
              <div className="text-sm">
                <p className="font-semibold text-gray-700">{file.name}</p>
                <p className="text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r cursor-pointer from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-semibold py-4 rounded-2xl transition-all shadow-xl active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadFilePopUp;
