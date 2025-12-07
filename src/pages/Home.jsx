import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import PartnerCard from "../components/PartnerCard";
import { FaChalkboardTeacher, FaUsers, FaCheckCircle, FaQuoteLeft } from "react-icons/fa";

const Home = () => {
  const [topPartners, setTopPartners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("https://study-mate-seven-blond.vercel.app/partners");
        if (!res.ok) throw new Error("Failed to fetch partners");
        const data = await res.json();
        // Show only first 3 partners
        setTopPartners(data.slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };

    fetchPartners();
  }, []);

  // Dummy data for Testimonials
  const DUMMY_TESTIMONIALS = [
    {
      id: 1,
      quote:
        "StudyMate changed my entire exam prep. I found an amazing partner who helped me master Calculus. Highly recommend!",
      name: "Rifat Hasan",
      subject: "Engineering Student",
    },
    {
      id: 2,
      quote:
        "The platform is incredibly user-friendly. Finding someone with the exact same focus areas as me was effortless. Two thumbs up!",
      name: "Sadia Afroz",
      subject: "Medical Aspirant",
    },
    {
      id: 3,
      quote:
        "I've connected with students from different universities. The diverse knowledge base has been invaluable for my final projects.",
      name: "Tanzim Ahmed",
      subject: "Computer Science Major",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Banner / Hero Section (Carousel) */}
      <section className="mb-16">
        <Carousel />
      </section>

      {/* 2. Top Study Partners Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          🔥 Top-Rated Study Partners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topPartners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/find-partners")}
            className="px-8 py-3 bg-indigo-400 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300"
          >
            View All Partners
          </button>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* 3. How It Works Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          💡 How StudyMate Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-indigo-50 rounded-2xl shadow-lg border-l-4 border-indigo-600 hover:scale-105 transform transition">
            <FaCheckCircle className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">1. Create Profile</h3>
            <p className="text-gray-700">Share your subjects, skills, and goals to get started.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl shadow-lg border-l-4 border-indigo-600 hover:scale-105 transform transition">
            <FaUsers className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">2. Find Your Match</h3>
            <p className="text-gray-700">Browse top partners based on ratings, reviews, and expertise.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl shadow-lg border-l-4 border-indigo-600 hover:scale-105 transform transition">
            <FaChalkboardTeacher className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">3. Start Collaborating</h3>
            <p className="text-gray-700">Connect, share knowledge, and achieve academic success together.</p>
          </div>
        </div>
      </section>

      <hr className="my-12 border-gray-200" />

      {/* 4. Testimonials Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          ⭐ What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DUMMY_TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 bg-white rounded-2xl shadow-lg border-t-4 border-indigo-600 hover:shadow-2xl transition"
            >
              <FaQuoteLeft className="w-6 h-6 text-indigo-400 mb-4" />
              <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-indigo-600">{testimonial.subject}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
