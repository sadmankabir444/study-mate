import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const PartnerDetailsPage = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: { from: { pathname: `/partner/${id}` } },
      });
    }
  }, [user, navigate, id]);

  // Fetch partner details from backend
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await fetch(`http://localhost:5000/partners/${id}`);
        if (!res.ok) throw new Error("Partner not found");
        const data = await res.json();
        setPartner(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchPartner();
  }, [id]);

  // Handle "Send Partner Request" button click
  const handleSendRequest = async () => {
    if (!user) return;

    try {
      // Increase partner count
      await fetch(`http://localhost:5000/partners/${id}/increase-count`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      // Add new partner request
      const requestData = {
        partnerId: id,
        partnerName: partner.name,
        partnerImage: partner.profileimage || partner.image,
        requestedBy: user.email,
        requestedAt: new Date(),
      };

      await fetch("http://localhost:5000/partner-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      toast.success("Partner Request Sent Successfully!");

      // Update partner count in UI
      setPartner((prev) => ({
        ...prev,
        partnerCount: (prev.partnerCount || 0) + 1,
      }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Loading partner details...
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="text-center py-20 text-xl text-red-500">
        Partner not found!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-200 transition-transform hover:scale-[1.02]">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <img
            src={partner.profileimage || partner.image}
            alt={partner.name}
            className="w-44 h-44 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          />

          {/* Name */}
          <h1 className="text-4xl font-bold mt-6 text-gray-900">{partner.name}</h1>

          {/* Subject */}
          <p className="text-indigo-600 font-semibold mt-2 text-lg">
            Subject: {partner.subject}
          </p>

          {/* Study Mode */}
          <p className="text-gray-700 mt-2">
            Study Mode: <span className="font-semibold">{partner.studyMode}</span>
          </p>

          {/* Availability */}
          <p className="text-gray-700 mt-2">
            Availability: <span className="font-semibold">{partner.availabilityTime || partner.availability}</span>
          </p>

          {/* Location */}
          <p className="text-gray-700 mt-2">
            Location: <span className="font-semibold">{partner.location}</span>
          </p>

          {/* Experience Level */}
          <p className="text-gray-700 mt-2">
            Experience Level: <span className="font-semibold">{partner.experienceLevel}</span>
          </p>

          {/* Rating */}
          <p className="mt-4 text-yellow-500 text-lg font-bold">
            ⭐ {partner.rating || 0} / 5
          </p>

          {/* Partner Count */}
          <p className="mt-2 text-gray-700">
            Connected Partners: <span className="font-semibold">{partner.partnerCount || 0}</span>
          </p>

          {/* Send Request Button */}
          <button
            onClick={handleSendRequest}
            className="mt-6 w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md transition-all duration-200"
          >
            Send Partner Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailsPage;
