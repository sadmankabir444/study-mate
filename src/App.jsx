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
      children: [
        { index: true, element: <Home /> },

        {
          path: "find-partners",
          element: <FindPartners />,
          loader: () => fetch("http://localhost:5000/partners"),
        },

        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "profile", element: <Profile /> },
        { path: "create-partner-profile", element: <CreatePartnerProfile /> },

        {
          path: "partner/:id",
          element: <PartnerDetailsPage />,
          loader: ({ params }) =>
            fetch(`http://localhost:5000/partners/${params.id}`)
              .then((res) => {
                if (!res.ok) throw new Error("Not Found");
                return res.json();
              })
              .catch(() => {
                throw new Response("Not Found", { status: 404 });
              }),
        },

        { path: "*", element: <div className="p-10 text-center text-xl">404 – Page Not Found</div> },
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
