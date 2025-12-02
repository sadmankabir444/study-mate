import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectPath = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signIn(email, password);
      toast.success("Logged in successfully!");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.code);
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google login failed!");
      });
  };

  return (
    <div className="flex items-center justify-center py-16 bg-indigo-50 min-h-[80vh]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-indigo-100">

        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Welcome Back to StudyMate 🎓
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-slate-700 mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pr-10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center justify-center">
          <div className="border-t border-gray-300 w-1/3"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center justify-center gap-2"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Bottom Links */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline"
          >
            Register
          </button>
        </p>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-center text-indigo-600 hover:underline mt-2 cursor-pointer"
        >
          Forgot Password?
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
