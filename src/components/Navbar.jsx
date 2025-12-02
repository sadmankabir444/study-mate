import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Find Partners", path: "/find-partners" },
  ];

  const loggedInLinks = [
    { name: "Create Partner Profile", path: "/create-partner-profile" },
    { name: "My Connections", path: "/my-connections" },
  ];

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 hover:text-blue-600 transition duration-150 ${
      isActive
        ? "font-bold text-blue-600 border-b-2 border-blue-600"
        : "text-gray-600"
    }`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {commonLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={navLinkStyle}>
                {link.name}
              </NavLink>
            ))}
            {user &&
              loggedInLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={navLinkStyle}>
                  {link.name}
                </NavLink>
              ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <nav className="flex flex-col space-y-1 px-4">
            {[...commonLinks, ...(user ? loggedInLinks : [])].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm transition duration-150 ${
                    isActive
                      ? "font-bold text-blue-600 bg-blue-50 rounded-lg"
                      : "text-gray-700 hover:bg-gray-50 rounded-lg"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
