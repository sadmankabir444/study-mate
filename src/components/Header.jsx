import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';
import { FaUserGraduate } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { toast } from 'react-toastify';

const Header = () => {
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  const getProfileImage = () => {
    
    if (user && user.photoURL && user.photoURL.length > 0) {
      return user.photoURL;
    }
    // Placeholder image with the user's initial (if display name exists)
    const initial = user?.displayName ? user.displayName[0].toUpperCase() : 'U';
    // Using a dynamic placeholder based on user's initial 
    return `https://placehold.co/150x150/007bff/ffffff?text=${initial}`;
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    try {
      await logout();
      toast.success('Logout Successful!');
    } catch (error) {
      toast.error('Logout Failed!');
    }
  };

  const commonLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Partners', path: '/find-partners' },
  ];

  const loggedInLinks = [
    { name: 'Create Partner Profile', path: '/create-partner-profile' },
    { name: 'My Connections', path: '/my-connections' },
  ];

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 hover:text-blue-600 transition duration-150 ${
      isActive
        ? 'font-bold text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-600'
    }`;

  
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90">
        <div className="w-20 h-20 rounded-full border-4 border-t-4 border-blue-400 border-t-blue-600 animate-spin shadow-xl" />
        <p className="mt-4 text-gray-700 font-semibold text-lg animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-blue-700"
          >
            <FaUserGraduate className="w-6 h-6" />
            <span>StudyMate</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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
          </nav>

          {/* User Auth/Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-1 focus:outline-none"
                >
                  <img
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                    
                    src={getProfileImage()} 
                    alt={user.displayName || 'User'}
                    title={user.displayName || 'User Profile'}
                  />
                  <IoMdArrowDropdown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-100">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
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
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition duration-150"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-150"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
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

      {/* Mobile Menu Panel */}
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
                      ? 'font-bold text-blue-600 bg-blue-50 rounded-lg'
                      : 'text-gray-700 hover:bg-gray-50 rounded-lg'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t mt-4">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      // 🛑 Fix 2: getProfileImage function call
                      src={getProfileImage()} 
                      alt={user.displayName || 'User'}
                    />
                    <span className="font-semibold text-blue-700">{user.displayName || 'User'}</span>
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
                    className="text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-150"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
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