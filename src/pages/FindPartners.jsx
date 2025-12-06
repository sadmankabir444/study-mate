import React from 'react';
import { useLoaderData } from 'react-router-dom';
import PartnerCard from '../components/PartnerCard';

const FindPartners = () => {
  const data = useLoaderData();
  console.log(data)
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Find Study Partners</h1>
      <p className="text-lg text-gray-600 mb-8">
        Use search filters and sorting options to connect with your ideal StudyMate.
      </p>
      
      {/* Placeholder for Search/Filter form */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-inner mb-10">
        <p className="text-gray-500">
          [Placeholder: Search Bar, Filter Options (Subject, Skill, Rating)]
        </p>
      </div>

      {/* Placeholder for Partner List (The cards will go here) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
         {/* DUMMY_PARTNERS.map(...) can be used here later */}
         {data.map(partners => <PartnerCard key={partners.id} partner={partners} />)}
         
      </div>
    </div>
  );
};

export default FindPartners;