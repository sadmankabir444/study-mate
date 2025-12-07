import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { signIn, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // handle object from PartnerCard
  const redirectPath = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Invalid email or password.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Wrong password.";
      default:
        return "Login failed. Please try again.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError("");

    try {
      await signIn(email, password);
      toast.success("Logged in successfully!");
      setEmail("");
      setPassword("");
      navigate(redirectPath, { replace: true }); // redirect to original page
    } catch (err) {
      const friendlyMessage = getFriendlyErrorMessage(err?.code);
      setLocalError(friendlyMessage);
      toast.error(friendlyMessage);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setLocalError("");
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate(redirectPath, { replace: true });
    } catch (err) {
      toast.error("Google sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 bg-indigo-50 min-h-[80vh] dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 border border-indigo-100 dark:border-gray-700 transition-colors">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-6 text-center">
          Welcome Back to StudyMate 🎓
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-700 dark:text-gray-200 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 transition-colors"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 dark:text-gray-200 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pr-10 p-3 border rounded-lg focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {localError && (
            <p className="text-red-600 text-sm font-medium mt-3 bg-red-50 dark:bg-red-900 p-3 rounded-lg border border-red-300 dark:border-red-700 transition-colors">
              {localError}
            </p>
          )}

          <button
            type="submit"
            className={`w-full py-3 mt-4 rounded-lg font-semibold transition duration-150 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed text-white"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="border-t border-gray-300 flex-grow dark:border-gray-600"></div>
          <span className="px-3 text-gray-500 dark:text-gray-300 text-sm">or</span>
          <div className="border-t border-gray-300 flex-grow dark:border-gray-600"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg font-semibold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-100 flex items-center justify-center gap-2 shadow-sm transition duration-150"
          disabled={loading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline font-medium dark:text-indigo-400"
          >
            Register
          </button>
        </p>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-center text-indigo-600 hover:underline mt-2 cursor-pointer text-sm font-medium dark:text-indigo-400"
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
