import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserGraduate } from 'react-icons/fa'; // Icon for Logo
import { IoMdArrowDropdown } from 'react-icons/io'; // Icon for Dropdown

const Header = () => {
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Custom function to handle logout and show notification (Need Toastify/SweetAlert2)
  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await logout();
      alert('Logout Successful!'); // Replace with toast/sweetalert
    } catch (error) {
      alert('Logout Failed!'); // Replace with toast/sweetalert
    }
  };

  // Navigation Links array
  const commonLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Partners', path: '/find-partners' },
  ];

  const loggedInLinks = [
    { name: 'Create Partner Profile', path: '/create-partner-profile' },
    { name: 'My Connections', path: '/my-connections' },
  ];

  // Utility function for NavLink style
  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 hover:text-indigo-600 transition duration-150 ${
      isActive ? 'font-bold text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'
    }`;

  // If loading, show nothing or a spinner (for simplicity, we show nothing)
  if (loading) return null;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-indigo-700">
            <FaUserGraduate className="w-6 h-6" />
            <span>StudyMate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Common Links */}
            {commonLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={navLinkStyle}>
                {link.name}
              </NavLink>
            ))}

            {/* Logged-in specific links */}
            {user &&
              loggedInLinks.map((link) => (
                <NavLink key={link.name} to={link.path} className={navLinkStyle}>
                  {link.name}
                </NavLink>
              ))}
          </nav>

          {/* User Auth/Profile Section (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                    src={user.photoURL || 'https://via.placeholder.com/150'}
                    alt={user.displayName}
                  />
                  <IoMdArrowDropdown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {/* Profile Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-100">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition duration-150"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-150"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <nav className="flex flex-col space-y-1 px-4">
            {/* Common Links */}
            {[...commonLinks, ...(user ? loggedInLinks : [])].map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm transition duration-150 ${
                    isActive ? 'font-bold text-indigo-600 bg-indigo-50 rounded-lg' : 'text-gray-700 hover:bg-gray-50 rounded-lg'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Auth Buttons/Profile */}
            <div className="pt-4 border-t mt-4">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 rounded-lg">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={user.photoURL || 'https://via.placeholder.com/150'}
                      alt={user.displayName}
                    />
                    <span className="font-semibold text-indigo-700">{user.displayName}</span>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-150"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;