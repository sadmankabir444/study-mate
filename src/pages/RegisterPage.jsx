import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { createUser, updateUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
  });

  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, photo } = form;

    if (password.length < 6) {
      setPassError("Password should be more than 6 characters");
      setLoading(false);
      return;
    } else {
      setPassError("");
    }

    try {
      // 1. Create user
      const result = await createUser(email, password);

      // 2. Update profile (Firebase + Context update)
      await updateUser({
        displayName: name,
        photoURL: photo,
      });

      toast.success("Registered successfully!");

      // 3. Reset form
      setForm({ name: "", email: "", password: "", photo: "" });

      // 4. Redirect to home
      navigate("/");

    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Registered and logged in with Google!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google login failed!");
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
            <label className="block text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input input-bordered w-full"
              placeholder="Your photo URL"
              value={form.photo}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {passError && <p className="text-xs text-red-500">{passError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="my-5 flex items-center justify-center">
          <div className="border-t border-gray-300 w-1/3"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="border-t border-gray-300 w-1/3"></div>
        </div>

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
