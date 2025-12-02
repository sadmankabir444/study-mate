import React, { createContext, useState, useEffect, useContext } from 'react';

// Dummy user object for logged-in state
const DUMMY_USER = {
  uid: '123',
  displayName: 'Priya Sharma',
  email: 'priya@example.com',
  photoURL: 'https://i.ibb.co/L8B9k0j/profile-dummy.jpg', // Replace with a generic image URL
};

// Create the Context
const AuthContext = createContext();

// Create the Provider Component
export default function AuthProvider({ children }) {
  // Set is loading true initially, will change in useEffect
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy login function
  const login = (email, password) => {
    setLoading(true);
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'Pws123') {
          setUser(DUMMY_USER); // Successfully logged in
          resolve({ success: true, message: 'Login successful!' });
        } else {
          reject({ success: false, message: 'Invalid credentials or login failed.' });
        }
        setLoading(false);
      }, 1000);
    });
  };

  // Dummy registration function
  const register = (name, email, photoURL, password) => {
    setLoading(true);
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { uid: Date.now(), displayName: name, email, photoURL };
        setUser(newUser); // Successful registration and immediate login
        resolve({ success: true, message: 'Registration successful!' });
        setLoading(false);
      }, 1000);
    });
  };

  // Dummy Google social login function
  const googleLogin = () => {
    setLoading(true);
    // Simulate Google login flow
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(DUMMY_USER);
        resolve({ success: true, message: 'Google Login successful!' });
        setLoading(false);
      }, 1000);
    });
  };

  // Dummy logout function
  const logout = () => {
    setLoading(true);
    setUser(null);
    // Simulate logout process
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Logout successful!' });
        setLoading(false);
      }, 500);
    });
  };

  // Check initial login state (simulated)
  useEffect(() => {
    // Check local storage or token here for persistent login.
    // For now, we set loading to false.
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    loading,
    login,
    logout,
    register,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the Auth Context
export const useAuth = () => {
  return useContext(AuthContext);
};