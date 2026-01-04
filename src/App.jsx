import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import PartnerDetailsPage from "./pages/PartnerDetailsPage";
import { useAuth } from "./provider/AuthProvider";
import MyConnectionsPage from "./pages/MyConnectionsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import NotFoundPage from "./pages/NotFoundPage";

// Dashboard pages
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";

const API_BASE = "https://study-mate-seven-blond.vercel.app";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="relative w-24 h-24 animate-fadeIn">
          <div className="absolute inset-0 rounded-full bg-indigo-400 opacity-40 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-8 border-indigo-600 border-t-transparent animate-spin"></div>
          <div className="absolute inset-6 rounded-full bg-indigo-200 opacity-60"></div>
        </div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: (
        <div className="min-h-screen flex items-center justify-center text-center p-10">
          <div>
            <h1 className="text-3xl font-bold text-red-500">
              Something went wrong 😢
            </h1>
            <p className="mt-2 text-gray-600">
              Failed to load data from server. Please make sure backend is
              running.
            </p>
          </div>
        </div>
      ),
      children: [
        { index: true, element: <Home /> },

        // Find Partners Page (public)
        {
          path: "find-partners",
          element: <FindPartners />,
          loader: async () => {
            try {
              const res = await fetch(`${API_BASE}/partners`);
              if (!res.ok) return [];
              return res.json();
            } catch (err) {
              return [];
            }
          },
        },

        // Auth Pages
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },

        // User Profile Pages
        { path: "profile", element: <Profile /> },
        { path: "create-partner-profile", element: <CreatePartnerProfile /> },
        { path: "my-connections", element: <MyConnectionsPage /> },

        // Partner Details
        {
          path: "partner/:id",
          element: <PartnerDetailsPage />,
          loader: async ({ params }) => {
            try {
              const res = await fetch(`${API_BASE}/partners/${params.id}`);
              if (!res.ok) return null;
              return res.json();
            } catch {
              return null;
            }
          },
        },

        // -----------------------
        // Dashboard Nested Routes
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            { index: true, element: <DashboardHome /> },
            { path: "create-profile", element: <CreatePartnerProfile /> },
            { path: "connections", element: <MyConnectionsPage /> },
          ],
        },

        {
          path: "about",
          element: <AboutPage />,
        },
        { path: "contact", element: <ContactPage /> },
        { path: "blog", element: <BlogPage /> },

        // 404
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

export default App;
