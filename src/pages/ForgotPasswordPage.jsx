import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
      setEmail(""); // Clear input after send
    } catch (error) {
      console.error(error);
      toast.error("Failed to send reset email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 bg-indigo-50 min-h-[80vh]">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
          Reset Your Password
        </h2>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-slate-700 mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
