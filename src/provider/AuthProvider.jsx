import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial auth check
  const [googleLoading, setGoogleLoading] = useState(false); // prevent multiple Google popups

  // ✔ Create user with email/password
  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // ✔ Sign in with email/password
  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // ✔ Safe Google sign-in
  const loginWithGoogle = async () => {
    if (googleLoading) return; // prevent multiple popups
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Google login error:", error);
      throw error; // let page handle toast messages
    } finally {
      setGoogleLoading(false);
    }
  };

  // ✔ Update user profile
  const updateUser = async (updatedData) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, updatedData);
    setUser({ ...auth.currentUser });
  };

  // ✔ Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // ✔ Detect auth state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    loading,
    googleLoading,
    createUser,
    signIn,
    logout,
    updateUser,
    loginWithGoogle,
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
