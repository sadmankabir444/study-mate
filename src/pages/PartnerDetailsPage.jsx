import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaStar, FaCalendarAlt, FaGraduationCap } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PartnerDetailsPage = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/partner/${id}` } } });
    }
  }, [user, navigate, id]);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await fetch(`https://study-mate-seven-blond.vercel.app/partners/${id}`);
        if (!res.ok) throw new Error("Partner not found");
        const data = await res.json();
        setPartner(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [id]);

  const handleSendRequest = async () => {
    if (!user) return;
    setRequestLoading(true);

    try {
      await fetch(`https://study-mate-seven-blond.vercel.app/partners/${id}/increase-count`, { method: "PATCH" });

      const requestData = {
        partnerId: id,
        partnerName: partner.name,
        partnerImage: partner.profileimage || partner.image,
        subject: partner.subject,
        studyMode: partner.studyMode,
        availability: partner.availabilityTime || partner.availability,
        location: partner.location,
        experienceLevel: partner.experienceLevel,
        requestedBy: user.email,
        requestedAt: new Date()
      };

      const res = await fetch("https://study-mate-seven-blond.vercel.app/partner-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
      const data = await res.json();

      if (data.success) toast.success("Partner Request Sent Successfully!");
      setPartner(prev => ({ ...prev, partnerCount: (prev.partnerCount || 0) + 1 }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to send request");
    } finally {
      setRequestLoading(false);
    }
  };

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading partner details...</div>;
  if (!partner)
    return <div className="text-center py-20 text-red-500">Partner not found!</div>;

  const images = partner.images || [partner.profileimage || partner.image];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-8 border border-gray-200 transition-transform hover:scale-[1.02]">

        {/* Image Carousel */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="rounded-2xl overflow-hidden shadow-md mb-6"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center bg-gray-100">
              <img
                src={img}
                alt={`${partner.name} ${idx + 1}`}
                className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-contain rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Overview */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">{partner.name}</h1>
          <p className="text-indigo-600 font-semibold mt-2 text-lg">Subject: {partner.subject}</p>
          <p className="mt-4 text-gray-700">{partner.description || "No description available."}</p>
        </div>

        {/* Key Info / Specs */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-indigo-500" /> Location: <span className="font-semibold">{partner.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaGraduationCap className="text-indigo-500" /> Study Mode: <span className="font-semibold">{partner.studyMode}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaCalendarAlt className="text-indigo-500" /> Availability: <span className="font-semibold">{partner.availabilityTime || partner.availability}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaStar className="text-yellow-400" /> Rating: <span className="font-semibold">{partner.rating || 0}/5</span>
          </div>
          <div className="text-gray-700">
            Experience: <span className="font-semibold">{partner.experienceLevel}</span>
          </div>
          <div className="text-gray-700">
            Connected Partners: <span className="font-semibold">{partner.partnerCount || 0}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSendRequest}
            disabled={requestLoading}
            className={`w-full py-3 rounded-2xl text-white font-semibold transition-all duration-200 ${
              requestLoading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
            }`}
          >
            {requestLoading ? "Sending..." : "Send Partner Request"}
          </button>
        </div>

        {/* Related Partners */}
        {partner.relatedPartners && partner.relatedPartners.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Related Partners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partner.relatedPartners.map((p) => (
                <div
                  key={p._id}
                  className="bg-indigo-50 rounded-2xl p-4 text-center shadow hover:shadow-md transition cursor-pointer"
                  onClick={() => navigate(`/partner/${p._id}`)}
                >
                  <img
                    src={p.profileimage || p.image}
                    alt={p.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-2"
                  />
                  <h3 className="font-semibold text-gray-900">{p.name}</h3>
                  <p className="text-indigo-600">{p.subject}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PartnerDetailsPage;
