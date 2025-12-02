import React from 'react';
import Carousel from '../components/Carousel';
import PartnerCard from '../components/PartnerCard';
import { FaChalkboardTeacher, FaUsers, FaCheckCircle, FaQuoteLeft } from 'react-icons/fa';

// Dummy data for Top Study Partners (Replace with MongoDB data fetching)
const DUMMY_PARTNERS = [
  {
    id: 1,
    name: 'Alisha Rahman',
    image: 'https://i.ibb.co/C0rS35J/alisha.jpg', // Placeholder
    subjects: 'Calculus, Physics',
    skills: 'Problem Solving, Tutoring',
    rating: 4.9,
    reviews: 120,
  },
  {
    id: 2,
    name: 'Samin Khan',
    image: 'https://i.ibb.co/WzG5K9x/samin.jpg', // Placeholder
    subjects: 'Web Development, Data Structure',
    skills: 'JavaScript, React, Tailwind',
    rating: 4.8,
    reviews: 95,
  },
  {
    id: 3,
    name: 'Nusrat Jahan',
    image: 'https://i.ibb.co/hR15yF7/exam-success.jpg', // Placeholder
    subjects: 'Biology, Chemistry',
    skills: 'Lab Work, Exam Preparation',
    rating: 4.7,
    reviews: 150,
  },
];

// Dummy data for Testimonials
const DUMMY_TESTIMONIALS = [
    {
        id: 1,
        quote: "StudyMate changed my entire exam prep. I found an amazing partner who helped me master Calculus. Highly recommend!",
        name: "Rifat Hasan",
        subject: "Engineering Student",
    },
    {
        id: 2,
        quote: "The platform is incredibly user-friendly. Finding someone with the exact same focus areas as me was effortless. Two thumbs up!",
        name: "Sadia Afroz",
        subject: "Medical Aspirant",
    },
    {
        id: 3,
        quote: "I've connected with students from different universities. The diverse knowledge base has been invaluable for my final projects.",
        name: "Tanzim Ahmed",
        subject: "Computer Science Major",
    },
];

const Home = () => {
  // In a real application, you would fetch partners here:
  // useEffect(() => { /* fetch partners from backend */ }, []); 

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
          {DUMMY_PARTNERS.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
        <div className="text-center mt-10">
            <button className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 transition duration-300">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <FaCheckCircle className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">1. Create Profile</h3>
                <p className="text-gray-600">Tell us your subjects, skills, and study goals to get started.</p>
            </div>
            {/* Step 2 */}
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <FaUsers className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">2. Find Your Match</h3>
                <p className="text-gray-600">Browse highly-rated partners based on real-time ratings and reviews.</p>
            </div>
            {/* Step 3 */}
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
                <FaChalkboardTeacher className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3 text-gray-900">3. Start Collaborating</h3>
                <p className="text-gray-600">Connect, share knowledge, and achieve academic excellence together.</p>
            </div>
        </div>
      </section>
      
      <hr className="my-12 border-gray-200" />

      {/* 4. Testimonials / Review Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          ⭐ What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DUMMY_TESTIMONIALS.map(testimonial => (
                <div key={testimonial.id} className="p-8 bg-indigo-50 rounded-xl shadow-lg border-l-4 border-indigo-600">
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