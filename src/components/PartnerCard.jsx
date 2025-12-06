import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const PartnerCard = ({ partner }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewProfile = () => {
    if (user) {
      navigate(`/partner/${partner.id}`);
    } else {
      toast("Please login to view profile details!");
      navigate("/login", {
        state: { from: { pathname: `/partner/${partner.id}` } },
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 p-6 cursor-pointer">
      <div className="flex justify-center">
        <img
          src={partner.profileimage}
          alt={partner.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100 shadow-sm"
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 text-center mt-4">
        {partner.name}
      </h3>

      <p className="text-center text-indigo-600 font-medium mt-1">
        {partner.subject}
      </p>

      <div className="mt-3 text-gray-700 text-sm text-center">
        Study Mode: <span className="font-semibold text-gray-900">{partner.studyMode}</span>
      </div>

      <div className="mt-1 text-gray-700 text-sm text-center">
        Experience: <span className="font-semibold text-gray-900">{partner.experienceLevel}</span>
      </div>

      <button
        onClick={handleViewProfile}
        className="w-full mt-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200"
      >
        View Profile
      </button>
    </div>
  );
};

export default PartnerCard;
