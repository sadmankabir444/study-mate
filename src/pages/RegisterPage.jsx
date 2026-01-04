import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const { createUser, updateUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [passError, setPassError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Optional: Demo autofill
  const handleDemoFill = (type) => {
    if (type === "user") {
      setForm({
        name: "Demo User",
        email: "user@example.com",
        password: "user1234",
        photo: "",
      });
    } else if (type === "admin") {
      setForm({
        name: "Demo Admin",
        email: "admin@example.com",
        password: "admin1234",
        photo: "",
      });
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, photo } = form;

    if (password.length < 6) {
      setPassError("Password should be at least 6 characters");
      setLoading(false);
      return;
    } else {
      setPassError("");
    }

    try {
      await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photo });

      toast.success("Registered successfully!");
      setForm({ name: "", email: "", password: "", photo: "" });
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    try {
      await loginWithGoogle();
      toast.success("Registered and logged in with Google!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Google login failed!");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 bg-indigo-50 min-h-[80vh]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-indigo-100">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Join StudyMate 🎓
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Optional: Profile photo URL"
              value={form.photo}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {passError && (
            <p className="text-xs text-red-500">{passError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 rounded-lg font-semibold transition duration-150 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        
        {/* OR Divider */}
        <div className="my-5 flex items-center justify-center">
          <div className="border-t border-gray-300 w-1/3"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>

        {/* Google login */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="w-full py-3 rounded-lg font-semibold bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center justify-center gap-2 shadow-sm transition duration-150"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {googleLoading ? "Please wait..." : "Continue with Google"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
