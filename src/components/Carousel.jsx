import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegDotCircle, FaDotCircle } from 'react-icons/fa';

// Dummy data for the carousel
const slides = [
  {
    id: 1,
    title: 'Connect with Study Partners Globally',
    description: 'Find peers with matching subjects and skills to collaborate on projects and exams.',
    image: 'https://i.ibb.co/6R2n90k/study-group.jpg', // Placeholder image
    color: 'bg-indigo-600',
  },
  {
    id: 2,
    title: 'Achieve Your Best Ratings Together',
    description: 'Work with highly-rated partners and boost your collective academic performance.',
    image: 'https://i.ibb.co/hR15yF7/exam-success.jpg', // Placeholder image
    color: 'bg-teal-600',
  },
  {
    id: 3,
    title: 'Seamless Collaboration, Anytime, Anywhere',
    description: 'Use StudyMate to organize sessions, share resources, and track your progress easily.',
    image: 'https://i.ibb.co/zX0q2vR/online-learning.jpg', // Placeholder image
    color: 'bg-purple-600',
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative h-96 md:h-[500px]">
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-start p-8 md:p-20`}>
              <div className="max-w-xl text-white">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl font-light">
                  {slide.description}
                </p>
                <button className={`mt-6 px-6 py-3 ${slide.color} text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition duration-300`}>
                  Start Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition duration-300 focus:outline-none"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition duration-300 focus:outline-none"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="text-white hover:text-indigo-400 transition"
          >
            {index === currentSlide ? <FaDotCircle className="w-3 h-3" /> : <FaRegDotCircle className="w-3 h-3" />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;