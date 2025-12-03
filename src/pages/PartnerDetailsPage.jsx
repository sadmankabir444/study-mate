import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const PartnerDetailsPage = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  // If user logs out, redirect to login
  if (user === null) {
    navigate("/login");
  }
}, [user, navigate]);



  // Dummy API simulation — later you will fetch from backend
  useEffect(() => {
    const dummyPartners = [
      {
        id: 1,
        name: "Alisha Rahman",
        image:
          "https://i.pinimg.com/280x280_RS/71/c5/51/71c5514a805826ca53ac97dfa002b2ab.jpg",
        subjects: "Calculus, Physics",
        skills: "Problem Solving, Tutoring",
        rating: 4.9,
        reviews: 120,
      },
      {
        id: 2,
        name: "Samin Khan",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjllhF3m97JRuNMaio_pFAw69r3SjP_vdG8A&s",
        subjects: "Web Development, Data Structure",
        skills: "JavaScript, React, Tailwind",
        rating: 4.8,
        reviews: 95,
      },
      {
        id: 3,
        name: "Nusrat Jahan",
        image:
          "https://resize.indiatvnews.com/en/resize/newbucket/355_-/2020/09/capture-1600680322.jpg",
        subjects: "Biology, Chemistry",
        skills: "Lab Work, Exam Preparation",
        rating: 4.7,
        reviews: 150,
      },
    ];

    const found = dummyPartners.find(
      (partner) => partner.id === Number(id)
    );

    setPartner(found);
  }, [id]);

  if (!partner) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Loading partner details...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-col items-center">
          <img
            src={partner.image}
            alt={partner.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />

          <h1 className="text-3xl font-bold mt-6 text-gray-900">
            {partner.name}
          </h1>

          <p className="text-indigo-600 font-semibold mt-2">
            Subjects: {partner.subjects}
          </p>

          <p className="text-gray-700 mt-2">
            Skills: <span className="font-semibold">{partner.skills}</span>
          </p>

          <p className="mt-4 text-yellow-500 text-lg font-bold">
            ⭐ {partner.rating} / 5 ({partner.reviews} reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailsPage;
