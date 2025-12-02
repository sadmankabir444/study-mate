import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import FindPartners from "./pages/FindPartners";
import CreatePartnerProfile from "./pages/CreatePartnerProfile";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { useAuth } from "./provider/AuthProvider";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linier-to-br from-indigo-50 to-indigo-100">
        <div className="relative w-24 h-24 animate-fadeIn">
          <div className="absolute inset-0 rounded-full bg-indigo-400 opacity-40 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-8 border-indigo-600 border-t-transparent animate-spin"></div>
          <div className="absolute inset-6 rounded-full bg-indigo-200 opacity-60"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="find-partners" element={<FindPartners />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="create-partner-profile" element={<CreatePartnerProfile />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
