import { useState } from "react";
import connection from "../config/connection.config";

interface SignupFormData {
  userName: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await connection.post("/auth/signup", formData);
      setSuccess("Account created successfully!");
      setFormData({ userName: "", email: "", password: "" });
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center text-blue-800">
          Create Account
        </h2>
        <p className="text-center text-blue-500 text-sm mb-6">Join us today</p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 text-red-600 text-sm text-center py-2">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-md bg-green-50 text-green-600 text-sm text-center py-2">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
