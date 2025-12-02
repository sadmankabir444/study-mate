import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PartnerCard = ({ partner }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewProfile = () => {
    if (user) {
      // If logged in, go to details page
      navigate(`/partner/${partner.id}`);
    } else {
      // If not logged in, redirect to login page
      alert('Please login to view profile details!'); // Replace with toast
      navigate('/login');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100">
      <div className="relative h-40 bg-indigo-500 flex justify-center items-center">
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-white absolute -bottom-16"
          src={partner.image}
          alt={partner.name}
        />
      </div>
      <div className="pt-20 pb-6 px-4 text-center">
        <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
        <p className="text-sm text-indigo-600 font-semibold mt-1">{partner.subjects}</p>
        
        <div className="mt-2 text-gray-600 text-sm">
          Skills: <span className="font-medium text-gray-800">{partner.skills}</span>
        </div>

        <div className="flex justify-center items-center mt-3 mb-4">
          <FaStar className="w-5 h-5 text-yellow-400" />
          <span className="ml-1 text-lg font-bold text-gray-800">{partner.rating}</span>
          <span className="ml-1 text-sm text-gray-500">({partner.reviews} reviews)</span>
        </div>

        <button
          onClick={handleViewProfile}
          className="w-full mt-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default PartnerCard;