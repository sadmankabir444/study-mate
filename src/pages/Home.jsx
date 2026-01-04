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

  // Features
  const FEATURES = [
    { title: "Find Partners Easily", desc: "Connect with students matching your subjects and skills." },
    { title: "Collaborate Anywhere", desc: "Work together on projects, assignments, and study sessions remotely." },
    { title: "Track Progress", desc: "Monitor your collaboration and academic growth effectively." },
    { title: "High-Rated Users", desc: "Partner with top-rated students to boost your learning." },
  ];

  // Categories
  const CATEGORIES = ["Mathematics", "Physics", "Programming", "Languages", "Chemistry", "Biology"];

  // Stats
  const STATS = [
    { value: 1200, label: "Students" },
    { value: 850, label: "Projects" },
    { value: 2400, label: "Sessions" },
    { value: 5000, label: "Ratings" },
  ];

  // Blog posts
  const BLOGS = [
    { title: "Top 5 Study Tips for Students", excerpt: "Improve your grades and productivity with these proven strategies.", link: "#" },
    { title: "How to Collaborate Remotely Effectively", excerpt: "Learn to organize sessions and share resources efficiently.", link: "#" },
    { title: "Boost Your Learning with Peer Reviews", excerpt: "Get the most out of collaboration with structured feedback.", link: "#" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Hero / Carousel */}
      <section className="mb-16">
        <Carousel />
      </section>

      {/* 2. Top Study Partners */}
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

      {/* 3. How It Works */}
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

      {/* 4. Features */}
      <section className="mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((f, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2 text-gray-800">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Categories */}
      <section className="mb-16 bg-indigo-50 py-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Study Categories</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className="px-6 py-3 bg-white rounded-full shadow hover:shadow-lg transition cursor-pointer text-gray-800 font-semibold">
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, idx) => (
            <div key={idx} className="flex flex-col items-center p-4">
              <h3 className="text-3xl font-bold text-gray-800">{s.value}+</h3>
              <p className="text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">⭐ What Our Users Say</h2>
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

      {/* 8. Blog */}
      <section className="mb-16 bg-indigo-50 py-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Learning Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS.map((b, idx) => (
            <div key={idx} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2 text-gray-800">{b.title}</h3>
              <p className="text-gray-600 mb-4">{b.excerpt}</p>
              <a href={b.link} className="text-indigo-600 font-semibold hover:underline">
                Read More
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Newsletter / CTA */}
      <section className="mb-16 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-8">
            Get updates on the latest study partners, blog posts, and tips.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed!");
            }}
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-3 rounded-full border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* 10. Footer */}
      <section>
        {/* Footer component can go here */}
      </section>
    </div>
  );
};

export default Home;
