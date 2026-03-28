import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import connection from "../config/connection.config";
import toast, { Toaster } from "react-hot-toast";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedInUser = localStorage.getItem("userLoggedIn");
    if (isLoggedInUser && JSON.parse(isLoggedInUser) === true) {
      navigate("/layout");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await connection.post("/auth/signIn", formData);

      toast.success("Welcome back! You're logged in 🎉");

      setFormData({ email: "", password: "" });
      localStorage.setItem("userLoggedIn", JSON.stringify(true));

      navigate("/layout");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center"/>
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-[450px]">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-10 border border-gray-50">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-gray-500 mt-2">
                Login to continue your journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Inputs */}
              <div className="space-y-4">
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

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/")}
                className="text-indigo-600 font-semibold hover:underline decoration-2 underline-offset-4"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
