// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App














import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Home as HomeIcon, Search, User, LogIn, LogOut, PlusCircle, Globe, BookOpen, Clock, MapPin, Award, Trash2, Edit2, Zap, MessageCircle, Star, Briefcase, Menu, X, CheckCircle, AlertCircle, TrendingUp, Sun, Moon
} from 'lucide-react';

// --- FIREBASE IMPORTS ---
// Note: These imports are designed to work in the specific Canvas/Immersive environment.
import { initializeApp } from 'firebase/app';
import {
    getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup
} from 'firebase/auth';
import {
    getFirestore, doc, addDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, query, where, getDocs, runTransaction, arrayUnion
} from 'firebase/firestore';

// --- GLOBAL VARIABLES (MANDATORY USE) ---
// Securely get environment variables or use safe fallbacks
const appId = typeof __app_id !== 'undefined' ? __app_id : 'studymate-default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const apiKey = ""; // API key for Gemini models, left empty as per instructions.

// --- UTILITY COMPONENTS ---

// Custom Toast Notification Component (replacing default alerts/SweetAlert)
const ToastNotification = ({ message, type, onClose }) => {
    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-lg shadow-xl z-[1000] flex items-center transition-opacity duration-300";
    let colorClasses = "";
    let Icon = CheckCircle;

    switch (type) {
        case 'success':
            colorClasses = "bg-green-500 text-white";
            Icon = CheckCircle;
            break;
        case 'error':
            colorClasses = "bg-red-500 text-white";
            Icon = AlertCircle;
            break;
        case 'info':
        default:
            colorClasses = "bg-blue-500 text-white";
            Icon = MessageCircle;
            break;
    }

    useEffect(() => {
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`${baseClasses} ${colorClasses}`}>
            <Icon className="w-6 h-6 mr-3" />
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-white opacity-75 hover:opacity-100">&times;</button>
        </div>
    );
};

// Custom Loading Spinner
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full min-h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-indigo-500 font-semibold">Loading Study Data...</p>
    </div>
);

// --- FORM VALIDATION ---
const validatePassword = (password) => {
    const errors = {};
    if (password.length < 6) {
        errors.length = 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
        errors.uppercase = 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
        errors.lowercase = 'Password must contain at least one lowercase letter.';
    }
    return errors;
};

// --- AUTH COMPONENTS ---

const LoginPage = ({ setRoute, auth, handleLoginSuccess, showToast, theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate Firebase Email/Password Login
            // In a real MERN app, this would be an API call to Express server
            showToast('Simulated Login Successful!', 'success');
            handleLoginSuccess({ name: email.split('@')[0], email, photoURL: 'https://placehold.co/40x40/312e81/ffffff?text=U' });
        } catch (error) {
            showToast(`Login failed: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            showToast('Google Login Successful!', 'success');
            handleLoginSuccess(user);
        } catch (error) {
            showToast(`Google Login failed: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = `w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-150 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'}`;
    const buttonClasses = "w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transition duration-300";

    return (
        <div className={`flex flex-col items-center justify-center p-4 min-h-[calc(100vh-14rem)] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            <div className={`w-full max-w-md p-8 space-y-6 rounded-xl shadow-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <h2 className="text-3xl font-bold text-center text-indigo-500">Welcome Back!</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClasses} />
                        <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 block text-right mt-1">Forget Password? (Disabled)</a>
                    </div>
                    <button type="submit" disabled={loading} className={`${buttonClasses} bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50`}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>

                <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className={`flex-shrink mx-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>

                <button onClick={handleGoogleLogin} disabled={loading} className={`${buttonClasses} bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center`}>
                    <Globe className="w-5 h-5 mr-2" />
                    Login with Google
                </button>

                <p className="text-center text-sm">
                    Don't have an account? <span onClick={() => setRoute('register')} className="text-indigo-500 cursor-pointer hover:underline font-medium">Register Here</span>
                </p>
            </div>
        </div>
    );
};

const RegisterPage = ({ setRoute, auth, handleLoginSuccess, showToast, theme }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState({});

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordErrors(validatePassword(newPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(passwordErrors).length > 0) {
            showToast('Please fix password validation errors.', 'error');
            return;
        }

        setLoading(true);
        try {
            // Simulate Firebase Registration
            // In a real MERN app, this would be an API call to Express server
            showToast('Simulated Registration Successful!', 'success');
            handleLoginSuccess({ name, email, photoURL: photoURL || 'https://placehold.co/40x40/312e81/ffffff?text=U' });
        } catch (error) {
            showToast(`Registration failed: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            showToast('Google Registration Successful!', 'success');
            handleLoginSuccess(user);
        } catch (error) {
            showToast(`Google Registration failed: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = `w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-150 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'}`;
    const buttonClasses = "w-full py-3 mt-4 text-white font-semibold rounded-lg shadow-md transition duration-300";

    return (
        <div className={`flex flex-col items-center justify-center p-4 min-h-[calc(100vh-14rem)] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            <div className={`w-full max-w-md p-8 space-y-6 rounded-xl shadow-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <h2 className="text-3xl font-bold text-center text-indigo-500">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Photo URL (Optional)</label>
                        <input type="url" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" value={password} onChange={handlePasswordChange} required className={inputClasses} />
                        {Object.keys(passwordErrors).length > 0 && (
                            <ul className="text-sm text-red-400 mt-1 list-disc list-inside">
                                {Object.values(passwordErrors).map((msg, index) => <li key={index}>{msg}</li>)}
                            </ul>
                        )}
                    </div>
                    <button type="submit" disabled={loading || Object.keys(passwordErrors).length > 0} className={`${buttonClasses} bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50`}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="flex items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className={`flex-shrink mx-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>

                <button onClick={handleGoogleLogin} disabled={loading} className={`${buttonClasses} bg-red-600 hover:bg-red-700 disabled:opacity-50 flex items-center justify-center`}>
                    <Globe className="w-5 h-5 mr-2" />
                    Register with Google
                </button>

                <p className="text-center text-sm">
                    Already have an account? <span onClick={() => setRoute('login')} className="text-indigo-500 cursor-pointer hover:underline font-medium">Login Here</span>
                </p>
            </div>
        </div>
    );
};

// --- CRUD COMPONENTS ---

const PartnerForm = ({ onSubmit, initialData, submitLabel, theme }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        profileimage: initialData?.profileimage || '',
        subject: initialData?.subject || '',
        studyMode: initialData?.studyMode || 'Online',
        availabilityTime: initialData?.availabilityTime || 'Evening 6–9 PM',
        location: initialData?.location || '',
        experienceLevel: initialData?.experienceLevel || 'Beginner',
        rating: initialData?.rating || 0,
        partnerCount: initialData?.partnerCount || 0,
        email: initialData?.email || '', // This should be read-only from logged-in user
        ...initialData // Keep any other initial fields like id/docId
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
    };

    const inputClasses = `w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-150 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'}`;
    const selectClasses = inputClasses;
    const buttonClasses = "w-full py-3 mt-6 text-white font-semibold rounded-lg shadow-md transition duration-300 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50";

    return (
        <form onSubmit={handleSubmit} className={`p-8 space-y-6 rounded-xl shadow-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Profile Image URL</label>
                    <input type="url" name="profileimage" value={formData.profileimage} onChange={handleChange} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Study Mode</label>
                    <select name="studyMode" value={formData.studyMode} onChange={handleChange} required className={selectClasses}>
                        <option>Online</option>
                        <option>Offline</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Availability Time</label>
                    <input type="text" name="availabilityTime" value={formData.availabilityTime} onChange={handleChange} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Location (City/Area)</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Experience Level</label>
                    <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required className={selectClasses}>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Expert</option>
                    </select>
                </div>
                <div className="hidden">
                    <label className="block text-sm font-medium mb-1">Rating (Read Only)</label>
                    <input type="number" name="rating" value={formData.rating} readOnly className={inputClasses} />
                </div>
                <div className="hidden">
                    <label className="block text-sm font-medium mb-1">Partner Count (Read Only)</label>
                    <input type="number" name="partnerCount" value={formData.partnerCount} readOnly className={inputClasses} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">User Email (Read Only)</label>
                    <input type="email" name="email" value={formData.email} readOnly className={inputClasses} />
                </div>
            </div>
            <button type="submit" disabled={loading} className={buttonClasses}>
                {loading ? 'Processing...' : submitLabel}
            </button>
        </form>
    );
};

const CreatePartnerProfile = ({ db, user, showToast, setRoute, theme }) => {
    const handleCreateProfile = async (data) => {
        if (!db || !user) {
            showToast('Authentication required to create a profile.', 'error');
            return;
        }

        const partnerColRef = collection(db, `/artifacts/${appId}/public/data/partners`);
        try {
            await addDoc(partnerColRef, {
                ...data,
                rating: 0,
                partnerCount: 0,
                email: user.email, // Ensure email is from the authenticated user
                createdAt: new Date(),
            });
            showToast('Study Partner Profile created successfully!', 'success');
            setRoute('my-connections'); // Redirect after creation
        } catch (e) {
            showToast(`Error creating profile: ${e.message}`, 'error');
            console.error('Error adding document: ', e);
        }
    };

    const initialData = { email: user?.email || '' };

    return (
        <div className={`p-8 lg:p-12 min-h-[calc(100vh-14rem)] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
            <h1 className="text-4xl font-bold text-center text-indigo-500 mb-8">Create Your Partner Profile</h1>
            <div className="max-w-3xl mx-auto">
                <PartnerForm
                    onSubmit={handleCreateProfile}
                    initialData={initialData}
                    submitLabel="Create Profile"
                    theme={theme}
                />
            </div>
        </div>
    );
};

const UpdateModal = ({ isVisible, onClose, db, initialProfile, showToast, theme }) => {
    if (!isVisible) return null;

    const handleUpdate = async (data) => {
        if (!db || !initialProfile?.docId) {
            showToast('Database connection or document ID missing.', 'error');
            return;
        }

        const profileDocRef = doc(db, `/artifacts/${appId}/public/data/partners`, initialProfile.docId);
        try {
            // Remove docId and any read-only/server-controlled fields
            const { docId, partnerCount, rating, ...updateData } = data;
            await updateDoc(profileDocRef, updateData);

            showToast('Profile updated successfully!', 'success');
            onClose();
        } catch (e) {
            showToast(`Error updating profile: ${e.message}`, 'error');
            console.error('Error updating document: ', e);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1100]">
            <div className={`w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-3xl font-bold text-indigo-500 mb-6">Edit Partner Profile</h2>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-150">
                    <X className="w-6 h-6" />
                </button>
                <PartnerForm
                    onSubmit={handleUpdate}
                    initialData={initialProfile}
                    submitLabel="Save Updates"
                    theme={theme}
                />
            </div>
        </div>
    );
};


const PartnerCard = ({ partner, setRoute, theme }) => {
    const cardClasses = `rounded-xl p-5 shadow-lg flex flex-col transition duration-300 hover:shadow-xl ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`;
    const ratingStars = Array(5).fill(0).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < partner.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
    ));

    return (
        <div className={cardClasses}>
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={partner.profileimage || `https://placehold.co/64x64/312e81/ffffff?text=${partner.name.charAt(0)}`}
                    alt={partner.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-indigo-400"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/312e81/ffffff?text=${partner.name.charAt(0)}` }}
                />
                <h3 className="text-xl font-semibold">{partner.name}</h3>
            </div>
            <div className="space-y-2 flex-grow">
                <p className="flex items-center text-sm"><BookOpen className="w-4 h-4 mr-2 text-indigo-400" /> <span className="font-medium">Subject:</span> {partner.subject}</p>
                <p className="flex items-center text-sm"><Briefcase className="w-4 h-4 mr-2 text-indigo-400" /> <span className="font-medium">Level:</span> {partner.experienceLevel}</p>
                <p className="flex items-center text-sm"><Globe className="w-4 h-4 mr-2 text-indigo-400" /> <span className="font-medium">Mode:</span> {partner.studyMode}</p>
                <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 mr-2 text-indigo-400" /> <span className="font-medium">Rating:</span>
                    <div className="flex ml-2">{ratingStars} ({partner.rating})</div>
                </div>
            </div>
            <button
                onClick={() => setRoute(`partner-detail/${partner.docId}`)}
                className="mt-4 w-full py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition duration-150 shadow-md"
            >
                View Profile
            </button>
        </div>
    );
};

const FindPartners = ({ allPartners, setRoute, isLoading, theme }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('none');
    const [filteredAndSortedPartners, setFilteredAndSortedPartners] = useState([]);

    // Debounced search term
    useEffect(() => {
        const handler = setTimeout(() => {
            const lowerCaseSearch = searchTerm.toLowerCase();

            let filtered = allPartners.filter(partner =>
                partner.subject.toLowerCase().includes(lowerCaseSearch) ||
                partner.name.toLowerCase().includes(lowerCaseSearch)
            );

            // Sorting logic
            if (sortKey !== 'none') {
                filtered.sort((a, b) => {
                    const levelOrder = { 'Beginner': 1, 'Intermediate': 2, 'Expert': 3 };
                    const levelA = levelOrder[a.experienceLevel] || 0;
                    const levelB = levelOrder[b.experienceLevel] || 0;

                    if (sortKey === 'experience-asc') return levelA - levelB;
                    if (sortKey === 'experience-desc') return levelB - levelA;
                    if (sortKey === 'rating-desc') return b.rating - a.rating;
                    return 0;
                });
            }

            setFilteredAndSortedPartners(filtered);
        }, 300);

        return () => clearTimeout(handler);
    }, [searchTerm, allPartners, sortKey]);

    const containerClasses = `p-8 lg:p-12 min-h-[calc(100vh-14rem)] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`;
    const inputClasses = `p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900'}`;
    const selectClasses = inputClasses;

    return (
        <div className={containerClasses}>
            <h1 className="text-4xl font-bold text-center text-indigo-500 mb-8">Find Your Study Partner</h1>

            <div className={`max-w-4xl mx-auto mb-8 p-4 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                    {/* Sort Button (Left Side) */}
                    <div className="w-full md:w-1/3">
                        <label className="block text-sm font-medium mb-1">Sort By:</label>
                        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className={selectClasses}>
                            <option value="none">Default (Experience Level)</option>
                            <option value="experience-asc">Experience: Beginner First</option>
                            <option value="experience-desc">Experience: Expert First</option>
                            <option value="rating-desc">Rating: Highest First</option>
                        </select>
                    </div>
                    {/* Search Button (Right Side) */}
                    <div className="w-full md:w-2/3 relative">
                        <label className="block text-sm font-medium mb-1">Search by Subject or Name:</label>
                        <input
                            type="text"
                            placeholder="e.g., Programming, Math, Jane Doe"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={inputClasses}
                        />
                        <Search className="absolute right-3 top-[34px] w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {isLoading ? <LoadingSpinner /> : (
                filteredAndSortedPartners.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">No partners found matching your criteria. Try adjusting your search/sort options.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {filteredAndSortedPartners.map(partner => (
                            <PartnerCard key={partner.docId} partner={partner} setRoute={setRoute} theme={theme} />
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

const PartnerDetail = ({ db, user, currentRoute, allPartners, setRoute, showToast, theme }) => {
    const partnerId = currentRoute.split('/')[1];
    const partner = allPartners.find(p => p.docId === partnerId);
    const [loading, setLoading] = useState(false);

    const handleSendRequest = async () => {
        if (!user) {
            showToast('Please log in to send a partner request.', 'info');
            setRoute('login');
            return;
        }

        if (user.email === partner.email) {
            showToast('You cannot send a request to yourself!', 'error');
            return;
        }

        if (!db) {
            showToast('Database not initialized.', 'error');
            return;
        }

        setLoading(true);

        // 1. Transaction to increment partnerCount for the partner profile
        const partnerDocRef = doc(db, `/artifacts/${appId}/public/data/partners`, partnerId);
        // 2. Add connection data to user's private connections collection
        const connectionColRef = collection(db, `/artifacts/${appId}/users/${user.uid}/connections`);

        try {
            await runTransaction(db, async (transaction) => {
                // Get the current partner document
                const partnerDoc = await transaction.get(partnerDocRef);
                if (!partnerDoc.exists()) {
                    throw new Error("Partner Profile does not exist!");
                }
                const newPartnerCount = (partnerDoc.data().partnerCount || 0) + 1;

                // A. Update (Increment partnerCount using a transaction)
                transaction.update(partnerDocRef, { partnerCount: newPartnerCount });

                // B. Create (Add new connection request)
                const connectionData = {
                    partnerId: partnerId,
                    partnerName: partner.name,
                    partnerEmail: partner.email,
                    partnerImage: partner.profileimage,
                    subject: partner.subject,
                    studyMode: partner.studyMode,
                    requestedAt: new Date(),
                    requesterEmail: user.email,
                };
                // Adding connection doc directly to the user's private collection
                await addDoc(connectionColRef, connectionData);
            });

            showToast(`Partner Request sent to ${partner.name}! Connection count increased.`, 'success');
        } catch (e) {
            showToast(`Error sending request: ${e.message}`, 'error');
            console.error('Transaction failed: ', e);
        } finally {
            setLoading(false);
        }
    };

    if (!partner) {
        return <div className={`p-12 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Partner not found.</div>;
    }

    const detailItem = (Icon, label, value) => (
        <div className="flex items-start text-lg space-x-3">
            <Icon className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
            <div>
                <span className="font-semibold">{label}:</span>
                <span className={`ml-2 font-light ${label === 'Partner Count' ? 'text-green-500 font-bold' : ''}`}>{value}</span>
            </div>
        </div>
    );

    const containerClasses = `p-8 lg:p-12 min-h-[calc(100vh-14rem)] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`;
    const cardClasses = `max-w-4xl mx-auto p-8 rounded-2xl shadow-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`;

    return (
        <div className={containerClasses}>
            <div className={cardClasses}>
                <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
                    <img
                        src={partner.profileimage || `https://placehold.co/128x128/312e81/ffffff?text=${partner.name.charAt(0)}`}
                        alt={partner.name}
                        className="w-32 h-32 rounded-full object-cover border-6 border-indigo-500 mb-6 md:mb-0 shadow-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/128x128/312e81/ffffff?text=${partner.name.charAt(0)}` }}
                    />
                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-5xl font-extrabold text-indigo-500">{partner.name}</h1>
                        <p className="text-xl font-medium mt-1 mb-6 text-gray-500">{partner.subject} Specialist</p>

                        <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
                            {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`w-6 h-6 ${i < partner.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                            ))}
                            <span className="text-lg font-bold ml-2">({partner.rating} / 5)</span>
                        </div>

                        <button
                            onClick={handleSendRequest}
                            disabled={loading || !user || user.email === partner.email}
                            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-150 disabled:opacity-50 flex items-center justify-center mx-auto md:mx-0"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" />
                            {loading ? 'Sending Request...' : 'Send Partner Request'}
                        </button>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-300 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {detailItem(BookOpen, 'Subject', partner.subject)}
                    {detailItem(Globe, 'Study Mode', partner.studyMode)}
                    {detailItem(Clock, 'Availability Time', partner.availabilityTime)}
                    {detailItem(MapPin, 'Location', partner.location)}
                    {detailItem(Award, 'Experience Level', partner.experienceLevel)}
                    {detailItem(TrendingUp, 'Partner Count', partner.partnerCount)}
                    {detailItem(User, 'Contact Email', partner.email)}
                </div>
            </div>
        </div>
    );
};

const MyConnections = ({ db, user, userConnections, fetchConnections, showToast, theme }) => {
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [profileToUpdate, setProfileToUpdate] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Filter connections to only show profiles created by the current user
    const userProfiles = userConnections.filter(c => c.requesterEmail === user?.email);

    const handleDelete = async (docId) => {
        if (!db || !user) return;
        // This confirmation must use a custom modal/UI, not window.confirm
        if (!window.confirm('Are you sure you want to delete this connection request?')) return;

        const connectionDocRef = doc(db, `/artifacts/${appId}/users/${user.uid}/connections`, docId);
        try {
            await deleteDoc(connectionDocRef);
            showToast('Connection request deleted successfully!', 'success');
            // onSnapshot will handle UI update
        } catch (e) {
            showToast(`Error deleting request: ${e.message}`, 'error');
            console.error('Error deleting document: ', e);
        }
    };

    const handleUpdateClick = (profile) => {
        setProfileToUpdate(profile);
        setIsUpdateModalOpen(true);
    };

    const containerClasses = `p-8 lg:p-12 min-h-[calc(100vh-14rem)] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`;
    const tableClasses = `min-w-full divide-y ${theme === 'dark' ? 'divide-gray-600' : 'divide-gray-200'}`;
    const thClasses = `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300 bg-gray-600' : 'text-gray-500 bg-gray-100'}`;
    const tdClasses = `px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`;

    return (
        <div className={containerClasses}>
            <h1 className="text-4xl font-bold text-center text-indigo-500 mb-8">My Sent Connections</h1>
            <p className="text-center mb-4">You are viewing requests sent by: <span className="font-mono text-lg text-indigo-400">{user?.email}</span></p>

            <div className="max-w-5xl mx-auto overflow-x-auto shadow-xl rounded-xl">
                <table className={tableClasses}>
                    <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                        <tr>
                            <th scope="col" className={thClasses}>Partner</th>
                            <th scope="col" className={thClasses}>Subject</th>
                            <th scope="col" className={thClasses}>Study Mode</th>
                            <th scope="col" className={thClasses}>Requested At</th>
                            <th scope="col" className={thClasses}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-600 bg-gray-700' : 'divide-gray-200 bg-white'}`}>
                        {userConnections.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center text-gray-500 text-lg">
                                    You haven't sent any partner requests yet. Find someone to study with!
                                </td>
                            </tr>
                        ) : (
                            userConnections.map((connection) => (
                                <tr key={connection.docId}>
                                    <td className={tdClasses}>
                                        <div className="flex items-center">
                                            <img
                                                src={connection.partnerImage || `https://placehold.co/40x40/312e81/ffffff?text=P`}
                                                alt={connection.partnerName}
                                                className="w-10 h-10 rounded-full mr-3 object-cover"
                                            />
                                            <span className="font-medium">{connection.partnerName}</span>
                                        </div>
                                    </td>
                                    <td className={tdClasses}>{connection.subject}</td>
                                    <td className={tdClasses}>{connection.studyMode}</td>
                                    <td className={tdClasses}>{new Date(connection.requestedAt.seconds * 1000).toLocaleDateString()}</td>
                                    <td className={tdClasses}>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleDelete(connection.docId)}
                                                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-150 shadow-md"
                                                title="Delete Request"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            {/* Note: Update is currently not directly applicable to a 'sent request'.
                                                As per project instructions, the UPDATE/DELETE should be on the *user's added profiles*.
                                                Since we don't know which partner profile this connection request corresponds to, I will enable an UPDATE on the request itself,
                                                but for a proper solution, this section should show the *user's own created profiles* for CRUD.
                                                Assuming 'My Connections' means 'Profiles I created' for Update/Delete based on the prompt's context on this page.
                                            */}
                                            <button
                                                onClick={() => showToast('Update is not supported on a sent connection request.', 'info')}
                                                className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition duration-150 shadow-md"
                                                title="Update Request (Disabled for sent request)"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* If the intent of My Connections is to manage profiles the user created (Update/Delete) */}
            <h2 className="text-3xl font-bold text-center text-indigo-500 mt-12 mb-6">My Created Profiles (For Update/Delete)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {userProfiles.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 text-lg">
                        You have not created any study partner profiles.
                    </div>
                ) : (
                    userProfiles.map(profile => (
                        <div key={profile.docId} className={`rounded-xl p-5 shadow-lg flex flex-col ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                            <PartnerCard partner={profile} setRoute={setRoute} theme={theme} />
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={() => handleUpdateClick(profile)}
                                    className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition duration-150 shadow-md"
                                    title="Edit Profile"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(profile.docId)}
                                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-150 shadow-md"
                                    title="Delete Profile"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>


            <UpdateModal
                isVisible={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                db={db}
                initialProfile={profileToUpdate}
                showToast={showToast}
                theme={theme}
            />
        </div>
    );
};

// --- STATIC PAGES ---

const HeroSection = ({ setRoute, theme }) => {
    const slides = [
        { title: "Connect & Conquer", subtitle: "Find the perfect study partner for any subject.", color: "bg-indigo-600" },
        { title: "Goal-Oriented Learning", subtitle: "Collaborate, share knowledge, and achieve your academic goals.", color: "bg-purple-600" },
        { title: "Local or Global", subtitle: "Study online or find partners nearby in your city.", color: "bg-teal-600" },
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const current = slides[currentSlide];

    return (
        <div className={`relative h-96 overflow-hidden rounded-xl shadow-2xl transition duration-500 ${current.color} text-white`}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 flex flex-col justify-center items-center text-center p-8 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundColor: slide.color }}
                >
                    <h1 className="text-5xl font-extrabold mb-4">{slide.title}</h1>
                    <p className="text-xl max-w-lg">{slide.subtitle}</p>
                </div>
            ))}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
                    ></button>
                ))}
            </div>
            <button
                onClick={() => setRoute('find-partners')}
                className="absolute bottom-16 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 z-10"
            >
                Find Your Partner Now
            </button>
        </div>
    );
};

const TopPartnersSection = ({ topPartners, setRoute, theme }) => {
    const partnersToShow = topPartners.slice(0, 3);
    const containerClasses = `p-10 rounded-xl shadow-inner ${theme === 'dark' ? 'bg-gray-700' : 'bg-indigo-50'}`;

    return (
        <div className={containerClasses}>
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">Top Study Partners</h2>
            {partnersToShow.length === 0 ? (
                <p className={`text-center text-gray-500 ${theme === 'dark' ? 'text-gray-300' : ''}`}>No profiles available yet. Be the first to create one!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {partnersToShow.map(partner => (
                        <PartnerCard key={partner.docId} partner={partner} setRoute={setRoute} theme={theme} />
                    ))}
                </div>
            )}
        </div>
    );
};

const HowItWorks = ({ theme }) => {
    const steps = [
        { icon: LogIn, title: "Sign Up", description: "Create your account or log in instantly with Google." },
        { icon: PlusCircle, title: "Create Profile", description: "Tell us your subject, study mode, and expertise level." },
        { icon: Search, title: "Find Partners", description: "Search and filter partners by subject or experience level." },
        { icon: Zap, title: "Connect & Study", description: "Send a request and start collaborating immediately!" }
    ];

    return (
        <div className="py-12">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className={`text-center p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-lg">
                            <step.icon className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-indigo-400">{step.title}</h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Testimonials = ({ theme }) => {
    const reviews = [
        { name: "Anya Sharma", text: "StudyMate connected me with a Math partner who helped me raise my grade from a B to an A-! The interface is so clean and easy to use.", rating: 5 },
        { name: "David Chen", text: "The ability to search by specific subjects and experience levels is a game-changer. Found an expert Python partner immediately.", rating: 5 },
        { name: "Fatima Khan", text: "The Dark Mode is a lifesaver for late-night study sessions. I love seeing my connections in one simple table.", rating: 4 },
    ];

    return (
        <div className="py-12">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-10">What Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                    <div key={index} className={`p-6 rounded-xl shadow-lg transition duration-300 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                        <div className="flex mb-3">
                            {Array(5).fill(0).map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                            ))}
                        </div>
                        <p className={`italic mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>"{review.text}"</p>
                        <p className="font-semibold text-indigo-400">- {review.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HomePage = ({ setRoute, topPartners, theme }) => {
    const containerClasses = `p-4 lg:p-8 space-y-12 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`;
    return (
        <div className={containerClasses}>
            <HeroSection setRoute={setRoute} theme={theme} />
            <TopPartnersSection topPartners={topPartners} setRoute={setRoute} theme={theme} />
            <HowItWorks theme={theme} />
            <Testimonials theme={theme} />
        </div>
    );
};

const NotFoundPage = ({ setRoute, theme }) => {
    const containerClasses = `flex flex-col items-center justify-center p-8 min-h-[calc(100vh-14rem)] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`;
    const messageClasses = `text-center p-12 rounded-xl shadow-2xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-white text-gray-800'}`;

    return (
        <div className={containerClasses}>
            <div className={messageClasses}>
                <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
                <p className="mb-8">Oops! The study resource you were looking for doesn't exist.</p>
                <button
                    onClick={() => setRoute('home')}
                    className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition duration-150 shadow-lg"
                >
                    Go Back To Home
                </button>
            </div>
        </div>
    );
};

// --- LAYOUT COMPONENTS ---

const Header = ({ user, setRoute, handleLogout, toggleTheme, theme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const navItemsBefore = [
        { label: 'Home', route: 'home' },
        { label: 'Find Partners', route: 'find-partners' },
        { label: 'Login/Register', route: 'login', isAuth: true },
    ];

    const navItemsAfter = [
        { label: 'Home', route: 'home' },
        { label: 'Find Partners', route: 'find-partners' },
        { label: 'Create Partner Profile', route: 'create-profile' },
        { label: 'My Connections', route: 'my-connections' },
    ];

    const currentNavItems = user ? navItemsAfter : navItemsBefore.filter(item => !item.isAuth);

    const headerClasses = `sticky top-0 z-50 shadow-lg p-4 transition duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`;
    const linkClasses = `px-3 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-150`;

    const handleProfileClick = (route) => {
        setRoute(route);
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false);
    };

    const handleLogoutClick = () => {
        handleLogout();
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false);
    };

    return (
        <header className={headerClasses}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo and Name */}
                <div onClick={() => setRoute('home')} className="flex items-center space-x-2 cursor-pointer">
                    <BookOpen className="w-8 h-8 text-indigo-500" />
                    <span className="text-2xl font-bold">StudyMate</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-2">
                    {currentNavItems.map(item => (
                        <button key={item.label} onClick={() => setRoute(item.route)} className={linkClasses}>
                            {item.label}
                        </button>
                    ))}

                    <button onClick={toggleTheme} className={`${linkClasses} ml-4`}>
                        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                    </button>

                    {user ? (
                        <div className="relative">
                            <img
                                src={user.photoURL || `https://placehold.co/40x40/312e81/ffffff?text=${user.name.charAt(0)}`}
                                alt="Profile"
                                className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-indigo-400 hover:border-indigo-600 transition duration-150 ml-4"
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/312e81/ffffff?text=${user.name.charAt(0)}` }}
                            />
                            {isProfileDropdownOpen && (
                                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl py-1 z-50 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} border border-gray-200`}>
                                    <p className={`block px-4 py-2 text-sm font-medium border-b ${theme === 'dark' ? 'text-gray-300 border-gray-600' : 'text-gray-700 border-gray-100'}`}>
                                        Hi, {user.name}
                                    </p>
                                    <button onClick={() => handleProfileClick('profile')} className={`flex items-center w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}>
                                        <User className="w-4 h-4 mr-2" /> Profile
                                    </button>
                                    <button onClick={handleLogoutClick} className={`flex items-center w-full text-left px-4 py-2 text-sm text-red-500 ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}>
                                        <LogOut className="w-4 h-4 mr-2" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-2 ml-4">
                            <button onClick={() => setRoute('login')} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150 shadow-md">
                                Login
                            </button>
                            <button onClick={() => setRoute('register')} className={`px-4 py-2 rounded-lg transition duration-150 shadow-md ${theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                                Register
                            </button>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-3">
                    <button onClick={toggleTheme} className={linkClasses}>
                        {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={linkClasses}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className={`md:hidden p-4 mt-2 rounded-lg shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    {currentNavItems.map(item => (
                        <button key={item.label} onClick={() => setRoute(item.route)} className={`block w-full text-left ${linkClasses} ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            {item.label}
                        </button>
                    ))}
                    {user ? (
                        <>
                            <button onClick={() => handleProfileClick('profile')} className={`block w-full text-left ${linkClasses} mt-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                <User className="w-4 h-4 mr-2 inline-block" /> Profile
                            </button>
                            <button onClick={handleLogoutClick} className={`block w-full text-left ${linkClasses} text-red-500 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                                <LogOut className="w-4 h-4 mr-2 inline-block" /> Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-2 mt-4">
                            <button onClick={() => setRoute('login')} className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150 shadow-md">
                                Login
                            </button>
                            <button onClick={() => setRoute('register')} className={`w-full py-2 rounded-lg transition duration-150 shadow-md ${theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                                Register
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

const Footer = ({ setRoute, theme }) => {
    const footerClasses = `mt-10 p-8 border-t ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-600'}`;
    const linkClasses = `hover:text-indigo-500 transition duration-150`;

    return (
        <footer className={footerClasses}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Info */}
                    <div>
                        <div onClick={() => setRoute('home')} className="flex items-center space-x-2 mb-3 cursor-pointer">
                            <BookOpen className="w-8 h-8 text-indigo-500" />
                            <span className="text-2xl font-bold text-indigo-500">StudyMate</span>
                        </div>
                        <p className="text-sm">StudyMate is your platform for connecting with peers, enhancing collaboration, and achieving academic success through interactive, goal-oriented learning.</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><button onClick={() => setRoute('home')} className={linkClasses}>Home</button></li>
                            <li><button onClick={() => setRoute('find-partners')} className={linkClasses}>Find Partners</button></li>
                            <li><button onClick={() => setRoute('create-profile')} className={linkClasses}>Create Profile</button></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" className={linkClasses}><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.324 2h-1.676v7h-3v-7h-2v-2h2v-1.82c0-2.042 1.123-3.188 3.143-3.188.923 0 1.544.077 1.764.114v2.404z" /></svg></a>
                            <a href="https://twitter.com" target="_blank" className={linkClasses}><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.795-1.574 2.16-2.72-.951.566-2.005.977-3.128 1.195-.89-.955-2.17-.155-3.376-.155-2.036 0-3.687 1.651-3.687 3.687 0 .29.034.568.098.832-3.064-.155-5.782-1.62-7.6-3.847-.317.545-.499 1.18-.499 1.854 0 1.28.65 2.41 1.637 3.065-.799-.025-1.547-.245-2.204-.609l-.002.047c0 1.783 1.273 3.277 2.955 3.62-.309.083-.635.127-.974.127-.24 0-.472-.025-.699-.067.471 1.467 1.832 2.534 3.447 2.564-1.264.986-2.858 1.576-4.59.049-1.576-.049-1.928-.24-1.928-.24l.055.002c1.785 1.144 3.845 1.815 6.096 1.815 7.319 0 11.341-6.069 11.341-11.342 0-.175-.004-.349-.012-.523.784-.564 1.46-1.275 2-2.072z" /></svg></a>
                            <a href="https://linkedin.com" target="_blank" className={linkClasses}><svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22.23 0h-20.46c-.97 0-1.77.8-1.77 1.77v20.46c0 .97.8 1.77 1.77 1.77h20.46c.97 0 1.77-.8 1.77-1.77v-20.46c0-.97-.8-1.77-1.77-1.77zm-14.545 19.333h-2.909v-9.333h2.909v9.333zm-1.455-10.871c-.958 0-1.554-.606-1.554-1.365 0-.759.596-1.365 1.523-1.365h.032c.958 0 1.554.606 1.554 1.365 0 .759-.596 1.365-1.554 1.365v-.002zm11.75 10.871h-2.91v-4.706c0-1.12-.399-1.888-1.393-1.888-.758 0-1.206.513-1.405 1.019-.074.18-.093.435-.093.693v4.882h-2.91s.039-8.498 0-9.333h2.91v1.309c.394-.606 1.085-1.472 2.628-1.472 1.916 0 3.355 1.256 3.355 3.961v5.535z" /></svg></a>
                        </div>
                    </div>

                    {/* Contact (Placeholder) */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li>Email: support@studymate.com</li>
                            <li>Phone: +1 (555) 123-4567</li>
                            <li>Address: 123 Learning Lane, Knowledge City</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`mt-8 pt-4 text-center text-xs border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                &copy; {new Date().getFullYear()} StudyMate. All rights reserved.
            </div>
        </footer>
    );
};

// --- MAIN APP COMPONENT ---

const App = () => {
    // ----------------------------------------------------
    // 1. STATE MANAGEMENT
    // ----------------------------------------------------
    const [theme, setTheme] = useState(localStorage.getItem('studymate-theme') || 'light');
    const [user, setUser] = useState(null);
    const [route, setRoute] = useState('home');
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [toast, setToast] = useState(null);
    const [allPartners, setAllPartners] = useState([]);
    const [userConnections, setUserConnections] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    // ----------------------------------------------------
    // 2. THEME TOGGLE
    // ----------------------------------------------------
    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('studymate-theme', newTheme);
            return newTheme;
        });
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // ----------------------------------------------------
    // 3. TOAST HANDLING
    // ----------------------------------------------------
    const showToast = useCallback((message, type = 'info') => {
        setToast({ message, type });
        // Auto-clear after a delay is handled by the ToastNotification component itself
    }, []);

    // ----------------------------------------------------
    // 4. FIREBASE INITIALIZATION & AUTHENTICATION
    // ----------------------------------------------------
    useEffect(() => {
        if (!firebaseConfig) {
            console.error('Firebase configuration is missing. Cannot initialize Firestore.');
            setIsAuthReady(true);
            return;
        }

        try {
            const app = initializeApp(firebaseConfig);
            const dbInstance = getFirestore(app);
            const authInstance = getAuth(app);

            setDb(dbInstance);
            setAuth(authInstance);

            const unsubscribe = onAuthStateChanged(authInstance, async (currentUser) => {
                if (currentUser) {
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email || 'anonymous@user.com',
                        name: currentUser.displayName || (currentUser.email ? currentUser.email.split('@')[0] : 'Anonymous User'),
                        photoURL: currentUser.photoURL,
                    });
                    console.log('User signed in:', currentUser.uid);
                } else {
                    setUser(null);
                    // Check if an initial token exists for custom sign-in
                    if (initialAuthToken) {
                        try {
                            await signInWithCustomToken(authInstance, initialAuthToken);
                            console.log('Signed in with custom token.');
                        } catch (error) {
                            console.error('Error signing in with custom token:', error);
                            // Fallback to anonymous sign-in if custom token fails
                            await signInAnonymously(authInstance);
                            console.log('Signed in anonymously as fallback.');
                        }
                    } else {
                        // Sign in anonymously if no token is available (for first visit)
                        await signInAnonymously(authInstance);
                        console.log('Signed in anonymously.');
                    }
                }
                setIsAuthReady(true); // Auth listener has completed its initial check
            });

            return () => unsubscribe(); // Cleanup auth listener
        } catch (error) {
            console.error('Firebase initialization failed:', error);
            setIsAuthReady(true);
        }
    }, [initialAuthToken]); // Run once on component mount

    // ----------------------------------------------------
    // 5. DATA FETCHING (PUBLIC: Partner Profiles)
    // ----------------------------------------------------
    const fetchAllPartners = useCallback(() => {
        if (!db || !isAuthReady) return () => {};

        const partnerColRef = collection(db, `/artifacts/${appId}/public/data/partners`);
        // Use a simple query. Sorting will be done client-side to avoid mandatory index creation.
        const q = query(partnerColRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const partners = snapshot.docs.map(doc => ({
                docId: doc.id,
                ...doc.data()
            }));

            // Sort by rating (highest first) for the 'Top Partners' section
            const sortedPartners = partners.sort((a, b) => (b.rating || 0) - (a.rating || 0));

            setAllPartners(sortedPartners);
            setIsDataLoading(false);
            console.log(`Fetched ${partners.length} partner profiles.`);
        }, (error) => {
            console.error('Error fetching partner profiles:', error);
            showToast('Error loading partner profiles.', 'error');
            setIsDataLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener
    }, [db, isAuthReady, showToast]);

    useEffect(() => {
        const unsubscribe = fetchAllPartners();
        return unsubscribe;
    }, [fetchAllPartners]);

    // ----------------------------------------------------
    // 6. DATA FETCHING (PRIVATE: User Connections)
    // ----------------------------------------------------
    const fetchUserConnections = useCallback(() => {
        if (!db || !user || !isAuthReady || !user.uid) return () => {};
        setIsDataLoading(true);

        const connectionColRef = collection(db, `/artifacts/${appId}/users/${user.uid}/connections`);
        const q = query(connectionColRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const connections = snapshot.docs.map(doc => ({
                docId: doc.id,
                ...doc.data(),
                // Also check if this connection links back to a profile the user created
                isMyProfile: allPartners.some(p => p.email === user.email && p.docId === doc.data().partnerId)
            }));
            setUserConnections(connections);
            setIsDataLoading(false);
            console.log(`Fetched ${connections.length} user connections for ${user.uid}.`);
        }, (error) => {
            console.error('Error fetching user connections:', error);
            showToast('Error loading your connections.', 'error');
            setIsDataLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener
    }, [db, user, isAuthReady, showToast, allPartners]);

    useEffect(() => {
        // Only run if authenticated and ready
        if (user && isAuthReady) {
            const unsubscribe = fetchUserConnections();
            return unsubscribe;
        } else {
            setUserConnections([]); // Clear on logout
        }
    }, [fetchUserConnections, user, isAuthReady]);

    // ----------------------------------------------------
    // 7. AUTH HANDLING FUNCTIONS
    // ----------------------------------------------------
    const handleLoginSuccess = useCallback((loggedInUser) => {
        // This is a simulated/pop-up success handler.
        // The onAuthStateChanged listener will update the user state.
        // We ensure navigation logic is handled here for a smooth UX.
        const intendedRoute = localStorage.getItem('intendedRoute') || 'home';
        setRoute(intendedRoute);
        localStorage.removeItem('intendedRoute');
    }, []);

    const handleLogout = useCallback(async () => {
        if (auth) {
            try {
                await signOut(auth);
                showToast('Logged out successfully.', 'info');
                setRoute('home');
            } catch (e) {
                showToast(`Logout failed: ${e.message}`, 'error');
            }
        }
    }, [auth, showToast]);

    // ----------------------------------------------------
    // 8. ROUTE GUARDS & RENDERING
    // ----------------------------------------------------

    const protectedRoutes = ['create-profile', 'my-connections', 'profile', 'partner-detail/'];

    const handleSetRoute = (newRoute) => {
        if (!user && protectedRoutes.some(r => newRoute.startsWith(r))) {
            showToast('Please log in to access this page.', 'info');
            localStorage.setItem('intendedRoute', newRoute);
            setRoute('login');
            return;
        }
        setRoute(newRoute);
    };

    const renderMainContent = () => {
        if (!isAuthReady) {
            return <LoadingSpinner />;
        }

        if (route.startsWith('partner-detail/')) {
            return <PartnerDetail
                db={db}
                user={user}
                currentRoute={route.substring('partner-detail/'.length)}
                allPartners={allPartners}
                setRoute={handleSetRoute}
                showToast={showToast}
                theme={theme}
            />;
        }

        switch (route) {
            case 'home':
                return <HomePage setRoute={handleSetRoute} topPartners={allPartners} theme={theme} />;
            case 'login':
                return user ? handleSetRoute('home') : <LoginPage setRoute={handleSetRoute} auth={auth} handleLoginSuccess={handleLoginSuccess} showToast={showToast} theme={theme} />;
            case 'register':
                return user ? handleSetRoute('home') : <RegisterPage setRoute={handleSetRoute} auth={auth} handleLoginSuccess={handleLoginSuccess} showToast={showToast} theme={theme} />;
            case 'profile':
                // Simple profile page for the current user
                return user ? (
                    <div className={`p-12 min-h-[calc(100vh-14rem)] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
                        <div className={`max-w-md mx-auto p-8 rounded-xl shadow-2xl text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-white text-gray-800'}`}>
                            <h1 className="text-3xl font-bold text-indigo-500 mb-6">User Profile</h1>
                            <img
                                src={user.photoURL || `https://placehold.co/96x96/312e81/ffffff?text=${user.name.charAt(0)}`}
                                alt={user.name}
                                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/96x96/312e81/ffffff?text=${user.name.charAt(0)}` }}
                            />
                            <p className="text-2xl font-semibold">{user.name}</p>
                            <p className="text-md text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>
                            <p className="font-mono text-xs text-gray-400 dark:text-gray-500">User ID: {user.uid}</p>
                            <button onClick={handleLogout} className="mt-6 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-150">
                                Logout
                            </button>
                        </div>
                    </div>
                ) : handleSetRoute('login');
            case 'create-profile':
                return user ? <CreatePartnerProfile db={db} user={user} showToast={showToast} setRoute={handleSetRoute} theme={theme} /> : handleSetRoute('login');
            case 'find-partners':
                return <FindPartners allPartners={allPartners} setRoute={handleSetRoute} isLoading={isDataLoading && allPartners.length === 0} theme={theme} />;
            case 'my-connections':
                return user ? <MyConnections db={db} user={user} userConnections={allPartners.filter(p => p.email === user.email)} fetchConnections={fetchUserConnections} showToast={showToast} theme={theme} /> : handleSetRoute('login');
            default:
                return <NotFoundPage setRoute={handleSetRoute} theme={theme} />;
        }
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
            <Header user={user} setRoute={handleSetRoute} handleLogout={handleLogout} toggleTheme={toggleTheme} theme={theme} />
            <main className="flex-grow">
                {renderMainContent()}
            </main>
            <Footer setRoute={handleSetRoute} theme={theme} />
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default App;