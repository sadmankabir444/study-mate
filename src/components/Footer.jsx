import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebook, href: 'https://www.facebook.com/profile.php?id=61576964673876', label: 'Facebook' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/feed/', label: 'LinkedIn' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          {/* Section 1: Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 text-3xl font-bold text-indigo-400 mb-4">
              <FaUserGraduate className="w-8 h-8" />
              <span>StudyMate</span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              StudyMate is your platform for connecting with highly-rated study partners globally. Achieve your academic goals together through collaborative learning and shared knowledge.
            </p>
          </div>

          {/* Section 2: Quick Links (Example) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-indigo-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-indigo-400 transition">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Section 3: Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="text-gray-400 hover:text-indigo-400 transition duration-300"
                >
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-4">Join our community!</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} StudyMate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;