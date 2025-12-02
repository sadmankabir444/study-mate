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


function App() {
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

      {/* ToastContainer to show all toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
