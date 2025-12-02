import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaUserCircle } from 'react-icons/fa';

const Profile = () => {
    const { user, loading } = useAuth();
    
    if (loading) return <div className="text-center py-20">Loading profile...</div>;

    if (!user) {
        return <div className="text-center py-20 text-red-600">You must be logged in to view this page.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
                <div className="text-center">
                    <img
                        className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-indigo-600 shadow-md"
                        src={user.photoURL || 'https://via.placeholder.com/150'}
                        alt={user.displayName}
                    />
                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                        {user.displayName || 'No Name Provided'}
                    </h1>
                    <p className="text-indigo-600 font-medium">{user.email}</p>
                    <div className="mt-6 border-t pt-6 text-left">
                        
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Account Information</h2>
                        
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-700">
                                <FaUserCircle className="w-5 h-5 text-indigo-500" />
                                <p><strong>Name:</strong> {user.displayName || 'N/A'}</p>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-700">
                                <FaEnvelope className="w-5 h-5 text-indigo-500" />
                                <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-700">
                                {/* Example of a custom field */}
                                <span className="text-indigo-500 font-bold">ID:</span>
                                <p>{user.uid}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* You can add an Edit Profile button here */}
                <div className="mt-8 text-center">
                    <button className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;