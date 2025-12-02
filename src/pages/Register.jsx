import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaUserGraduate } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// Import for Toast/SweetAlert (replace alert() in logic)
// import { toast } from 'react-toastify'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, googleLogin } = useAuth(); // Get registration functions

  // Password Validation Logic
  const validatePassword = (pwd) => {
    let errorMessage = '';
    if (pwd.length < 6) {
      errorMessage += 'Password must be at least 6 characters long. ';
    }
    if (!/[A-Z]/.test(pwd)) {
      errorMessage += 'Password must contain at least one uppercase letter. ';
    }
    if (!/[a-z]/.test(pwd)) {
      errorMessage += 'Password must contain at least one lowercase letter. ';
    }
    return errorMessage.trim();
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Final check for password validation
    if (passwordError) {
      setError('Please fix the password errors before proceeding.');
      return;
    }
    
    setLoading(true);

    try {
      const response = await register(name, email, photoURL, password);
      // Show success toast here
      alert(response.message); // Replace with toast
      navigate('/'); // Navigate to desired route or Home
    } catch (err) {
      setError(err.message || 'Registration failed.');
      // Show failure toast here
      alert(err.message || 'Registration failed!'); // Replace with toast
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await googleLogin(); // Assuming googleLogin can handle both login/register flow
      // Show success toast here
      alert(response.message); // Replace with toast
      navigate('/'); // Navigate to desired route or Home
    } catch (err) {
      setError(err.message || 'Google Registration failed.');
      // Show failure toast here
      alert(err.message || 'Google Registration failed!'); // Replace with toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <div className="text-center mb-8">
          <FaUserGraduate className="mx-auto w-12 h-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Create Your StudyMate Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the community of dedicated learners.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* Photo URL Field */}
          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
              Photo URL (Optional)
            </label>
            <div className="mt-1">
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                autoComplete="photoURL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="https://your-photo-link.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            {/* Password Validation Error Message */}
            {passwordError && (
              <p className="mt-2 text-sm text-red-600 space-y-1">
                <span className="font-semibold">Password Rules:</span>
                <ul className="list-disc list-inside ml-2">
                  <li className={password.length >= 6 ? 'text-green-600' : 'text-red-600'}>
                    At least 6 characters long.
                  </li>
                  <li className={/[A-Z]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                    Contains at least one uppercase letter.
                  </li>
                  <li className={/[a-z]/.test(password) ? 'text-green-600' : 'text-red-600'}>
                    Contains at least one lowercase letter.
                  </li>
                </ul>
              </p>
            )}
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50"
              disabled={loading || !!passwordError}
            >
              {loading ? 'Registering...' : 'Register Account'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Register Button */}
          <div className="mt-6">
            <button
              onClick={handleGoogleRegister}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-150 disabled:opacity-50"
              disabled={loading}
            >
              <FaGoogle className="w-5 h-5 mr-3 text-red-500" />
              {loading ? 'Processing...' : 'Sign up with Google'}
            </button>
          </div>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;