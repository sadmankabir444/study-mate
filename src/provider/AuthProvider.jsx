import React, { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // initial load only

  // Register user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login user
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Update profile
  const updateUser = async (updatedData) => {
    if (!auth.currentUser) return Promise.reject("No user logged in");
    await updateProfile(auth.currentUser, updatedData);
    setUser({ ...auth.currentUser });
  };

  // Logout
  const logout = () => signOut(auth);

  // Firebase listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // only used on first load
    });

    return () => unSubscribe();
  }, []);

  const authData = {
    user,
    loading,
    createUser,
    signIn,
    logout,
    updateUser,
    setUser, // ✅ FIXED (added)
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
