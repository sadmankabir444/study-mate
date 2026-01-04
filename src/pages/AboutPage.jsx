import React from "react";

const AboutPage = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-indigo-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
            About StudyMate 🎓
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            StudyMate is your ultimate platform to connect with study partners, share knowledge, and grow together.
            Whether you are learning a new language, programming, or preparing for exams, StudyMate makes it easy and fun!
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose StudyMate?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Connect Easily</h3>
              <p className="text-gray-700">
                Find study partners based on subject, location, and study mode. Build your learning circle effortlessly.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Track Progress</h3>
              <p className="text-gray-700">
                Monitor your learning, set goals, and get motivated by seeing how you and your partners grow together.
              </p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Safe & Reliable</h3>
              <p className="text-gray-700">
                All profiles are verified. StudyMate ensures a safe and trusted environment for learning and networking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "Sadman Kabir", role: "Founder & Developer", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Jane Doe", role: "UI/UX Designer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "John Smith", role: "Backend Developer", img: "https://randomuser.me/api/portraits/men/56.jpg" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-indigo-100 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-indigo-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-indigo-600">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start learning with StudyMate?
          </h2>
          <p className="mb-8 text-lg md:text-xl">
            Join our community and find your perfect study partners today!
          </p>
          <a
            href="/register"
            className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
