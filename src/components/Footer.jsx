import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61576964673876", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/feed/", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-800 text-white mt-12 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          {/* 1. Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-3xl font-bold text-indigo-400 mb-4">
              <FaUserGraduate className="w-8 h-8" />
              <span>StudyMate</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              StudyMate connects you with top-rated study partners globally. Achieve academic success through collaboration and shared learning.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-gray-400 text-sm">
              <p className="flex items-center space-x-2">
                <FaEnvelope /> <span>support@studymate.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <FaPhoneAlt /> <span>+880 123 456 789</span>
              </p>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-indigo-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-indigo-400 transition">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* 3. Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect & Subscribe</h3>
            {/* Social Icons */}
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="text-gray-400 hover:text-indigo-400 transition duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-gray-400 text-sm">
          &copy; {currentYear} StudyMate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
