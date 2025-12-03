import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Slides data (StudyMate theme)
const slides = [
  {
    id: 1,
    title: "Connect with Study Partners Globally 🌍",
    subtitle: "Find peers with matching subjects and skills to collaborate on projects and exams.",
    image: "https://learningmole.com/wp-content/uploads/2024/09/image-216.jpeg",
    buttonColor: "bg-indigo-600",
  },
  {
    id: 2,
    title: "Achieve Your Best Ratings Together 🏆",
    subtitle: "Work with highly-rated partners and boost your collective academic performance.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxhJ3vrVZed_P6pw5W1qG6VD2u-Nfo6aNXvQ&s",
    buttonColor: "bg-teal-600",
  },
  {
    id: 3,
    title: "Seamless Collaboration Anytime, Anywhere 📚",
    subtitle: "Organize sessions, share resources, and track your progress easily with StudyMate.",
    image: "https://learningmole.com/wp-content/uploads/2024/08/image-146.jpeg",
    buttonColor: "bg-purple-600",
  },
];

const Carousel = () => {
  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      <Swiper
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col md:flex-row justify-between items-center h-full px-6 md:px-16 lg:px-24 gap-10">
              
              {/* Text Content */}
              <motion.div
                className="flex-1 text-center md:text-left space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-4xl md:text-5xl font-bold text-indigo-800 leading-tight"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="text-gray-700 text-lg md:text-xl max-w-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {slide.subtitle}
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-4 px-8 py-3 ${slide.buttonColor} text-white rounded-full shadow-lg hover:opacity-90 transition`}
                >
                  Get Started
                </motion.button>
              </motion.div>

              {/* Image */}
              <motion.div
                className="flex-1 flex justify-center md:justify-end"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <motion.img
                  src={slide.image}
                  alt={slide.title}
                  className="w-64 h-80 object-cover rounded-2xl md:w-96 lg:w-[430px] drop-shadow-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay gradient shimmer */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-indigo-200/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </section>
  );
};

export default Carousel;
