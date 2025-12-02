// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBggbGFdcsct5ur2RjxdKsX9paOmGLWPZQ",
  authDomain: "study-mate-c31e3.firebaseapp.com",
  projectId: "study-mate-c31e3",
  storageBucket: "study-mate-c31e3.firebasestorage.app",
  messagingSenderId: "442019546046",
  appId: "1:442019546046:web:2153d22175962107a5afef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();

export const auth = getAuth(app);


export default app;