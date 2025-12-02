import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { signIn, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(""); // Renamed 'error' to 'localError' to avoid confusion
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectPath = location.state?.from?.pathname || "/";
  
  // Helper to provide user-friendly error messages
  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please try again.';
      case 'auth/user-not-found':
        return 'No user found with this email.';
      case 'auth/wrong-password':
        return 'Invalid password.';
      default:
        return 'Login failed. Please check your network and credentials.';
    }
  };

  // Email & Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(""); // Clear previous error

    try {
      await signIn(email, password);
      
      // 🟢 SUCCESS: Redirect
      toast.success("Logged in successfully!");
      navigate(redirectPath, { replace: true });

    } catch (err) {
      console.error("Firebase Auth Error:", err);
      const friendlyMessage = getFriendlyErrorMessage(err.code);
      setLocalError(friendlyMessage);
      toast.error(friendlyMessage);
      
      // 🔴 FAILURE: Stop loading here
      setLoading(false); 
    }
    // No need for a separate 'finally' block for success, as navigation handles the state change
    // If catch hits, loading is set to false above.
  };

  // Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setLocalError("");
    try {
      await loginWithGoogle();
      
      // 🟢 SUCCESS: Redirect
      toast.success("Logged in with Google!");
      navigate(redirectPath, { replace: true });
      
    } catch (err) {
      console.error("Google Auth Error:", err);
      const friendlyMessage = "Google sign-in failed. Check if pop-ups are blocked.";
      setLocalError(friendlyMessage);
      toast.error(friendlyMessage);
      
      // 🔴 FAILURE: Stop loading here
      setLoading(false);
    }
    // No need for a separate 'finally' block
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
              className="input input-bordered w-full p-3 border rounded-lg focus:border-indigo-500"
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
                className="input input-bordered w-full pr-10 p-3 border rounded-lg focus:border-indigo-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {localError && <p className="text-red-600 text-sm font-medium mt-3 bg-red-50 p-3 rounded-lg border border-red-300">{localError}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full py-3 mt-4 rounded-lg font-semibold transition duration-150 ${
              loading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg font-semibold bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center justify-center gap-2 shadow-sm transition duration-150"
          disabled={loading}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Bottom Links */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Register
          </button>
        </p>

        <p
          onClick={() => navigate("/forgot-password")}
          className="text-center text-indigo-600 hover:underline mt-2 cursor-pointer text-sm font-medium"
        >
          Forgot Password?
        </p>

      </div>
    </div>
  );
};

export default LoginPage;