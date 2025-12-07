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

  // Global loading should be ONLY for initial auth check
  const [loading, setLoading] = useState(true);

  // ✔ Create user WITHOUT global loading
  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  // ✔ Login WITHOUT global loading
  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // ✔ Google login WITHOUT global loading
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser({ ...result.user });
    return result.user;
  };

  // ✔ Update user and context
  const updateUser = async (updatedData) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, updatedData);
    setUser({ ...auth.currentUser });
  };

  // ✔ Logout WITHOUT global loading
  const logout = async () => {
    await signOut(auth);
  };

  // ✔ initial login state detection only
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
    createUser,
    signIn,
    logout,
    updateUser,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
