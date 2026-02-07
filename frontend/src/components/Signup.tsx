import { useState, useRef, type ChangeEvent, useEffect } from "react";
import Cropper from "react-cropper";
import type { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Camera,
  User,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import connection from "../config/connection.config";

interface SignupFormData {
  userName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const cropperRef = useRef<ReactCropperElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null | any>(null);

  const [formData, setFormData] = useState<SignupFormData>({
    userName: "",
    email: "",
    password: "",
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<Blob | null | string>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({ width: 400, height: 400 });
    canvas.toBlob(
      (blob: string | null | any) => {
        if (blob) {
          setCroppedImage(blob);
          setPreviewUrl(URL.createObjectURL(blob));
          setImageSrc(null);
        }
      },
      "image/jpeg",
      0.9,
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("userName", formData.userName);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (croppedImage) data.append("avatar", croppedImage);

      await connection.post("/auth/signup", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Welcome aboard! Your account is ready.");
      setFormData({ userName: "", email: "", password: "" });
      setCroppedImage(null);
      setPreviewUrl(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      {/* Modal Overlay for Cropper */}
      {imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Adjust your photo</h3>
              <button
                onClick={() => setImageSrc(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <Cropper
                src={imageSrc}
                style={{ height: 400, width: "100%" }}
                aspectRatio={1}
                viewMode={1}
                guides={true}
                ref={cropperRef}
              />
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setImageSrc(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCrop}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[450px]">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-10 border border-gray-50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Get Started
            </h1>
            <p className="text-gray-500 mt-2">
              Create your account to start exploring
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Avatar Picker */}
            <div className="flex flex-col items-center mb-6">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="group relative w-28 h-28 rounded-3xl bg-indigo-50 border-2 border-dashed border-indigo-200 flex items-center justify-center cursor-pointer overflow-hidden transition-all hover:border-indigo-400"
              >
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center text-indigo-400 group-hover:text-indigo-600 transition">
                    <Camera size={28} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
                      Photo
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Camera size={20} className="text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* Notifications */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-xl animate-shake">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl">
                <CheckCircle2 size={16} /> {success}
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-4">
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                  size={18}
                />
                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-gray-700"
                />
              </div>

              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-gray-700"
                />
              </div>

              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none text-gray-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button className="text-indigo-600 font-semibold hover:underline decoration-2 underline-offset-4">
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
