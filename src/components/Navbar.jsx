import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { FaUserGraduate, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate(); // 🔹 Added navigate

  // ================= Outside Click for Profile =================
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Find Partners", path: "/find-partners" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" }
  ];

  const loggedInLinks = [
    { name: "Dashboard", path: "/dashboard" },
    // { name: "Create Profile", path: "/create-partner-profile" },
    { name: "My Connections", path: "/my-connections" },
  ];

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "text-indigo-600 bg-indigo-50"
        : "text-gray-700 hover:text-indigo-600"
    }`;

  const getProfileImage = () => {
    if (user && user.photoURL) return user.photoURL;
    const initial = user?.displayName ? user.displayName[0].toUpperCase() : "U";
    return `https://placehold.co/150x150/007bff/ffffff?text=${initial}`;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout Successful!");
      setProfileOpen(false);
      navigate("/login", { replace: true }); // 🔹 Redirect immediately after logout
    } catch {
      toast.error("Logout Failed!");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-indigo-600"
          >
            <FaUserGraduate className="w-6 h-6" />
            <span>StudyMate</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {commonLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={navLinkStyle}>
                {link.name}
              </NavLink>
            ))}
            {user &&
              loggedInLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={navLinkStyle}
                >
                  {link.name}
                </NavLink>
              ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Profile Dropdown */}
            {user ? (
              <div ref={profileRef} className="relative hidden md:block">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                >
                  <img
                    src={getProfileImage()}
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-300"
                  />
                  <FaChevronDown
                    className={`text-xs transition ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg overflow-hidden">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                    >
                      My Profile
                    </NavLink>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-100 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                >
                  Register
                </NavLink>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {[...commonLinks, ...(user ? loggedInLinks : [])].map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-sm hover:bg-gray-100 transition"
            >
              {link.name}
            </NavLink>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100 transition"
            >
              Logout
            </button>
          )}

          {!user && (
            <div className="flex flex-col gap-2 px-4 py-3">
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-100 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
