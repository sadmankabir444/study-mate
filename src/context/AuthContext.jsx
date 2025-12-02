// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut, 
    signInWithPopup,
    updateProfile // User profile update korar jonno
} from 'firebase/auth';
// 🛑 IMPORTANT: firebase.config.js file theke auth and googleProvider import kora hoyechhe
import { auth, googleProvider } from '../firebase/firebase.config.js'; 

// --- 1. Context Setup ---
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
// ------------------------

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Loading state ensure kore je Firebase user-er info load korar aage app render hobena
  const [loading, setLoading] = useState(true);

  // 2. Core Functions: Dummy functions gulo ekhon real Firebase API calls diye replace kora
  
  // Register Function: Email/Password + Name/Photo update
  const register = (name, email, photoURL, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const currentUser = userCredential.user;
        // User profile update
        return updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL
        })
        .then(() => {
            // successful registration and profile update
            return { success: true, message: 'Registration successful!' };
        });
      })
      .catch(error => {
        setLoading(false);
        throw new Error(error.message); 
      });
  };

  // Login Function: Email/Password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        return { success: true, message: 'Login successful!' };
      })
      .catch(error => {
        setLoading(false);
        throw new Error(error.message);
      });
  };
  
  // Google Login Function
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then(() => {
        return { success: true, message: 'Google Login successful!' };
      })
      .catch(error => {
        setLoading(false);
        throw new Error(error.message);
      });
  };

  // Logout Function
  const logout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        return { success: true, message: 'Logout successful!' };
      })
      .catch(error => {
        setLoading(false);
        throw new Error(error.message);
      });
  };
  
  // 3. State Listener (Persistent Login Handling)
  useEffect(() => {
    // onAuthStateChanged Firebase-er user state-e kono change hole (login/logout) call hoy
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // currentUser object-e user logged in thakle tar details thake, na thakle null thake
      setUser(currentUser); 
      setLoading(false);
    });
    // Cleanup function: component unmount hole listener remove hoye jay
    return () => unsubscribe(); 
  }, []);

  // 4. Context Value
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
      {/* Loading complete na howa porjonto children render hobena (prevents flashing login pages) */}
      {!loading && children} 
    </AuthContext.Provider>
  );
}