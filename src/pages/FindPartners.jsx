import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import PartnerCard from "../components/PartnerCard";

const FindPartners = () => {
  const loadedData = useLoaderData(); // Data from loader
  const [partners, setPartners] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  useEffect(() => {
    setPartners(loadedData || []);
  }, [loadedData]);

  // Filter by subject
  const filtered = partners.filter((p) =>
    p.subject?.toLowerCase().includes(search.toLowerCase())
  );

  // Sort by experience
  const sorted = filtered.sort((a, b) => {
    const expA = Number(a.experience) || 0;
    const expB = Number(b.experience) || 0;
    if (sortOrder === "asc") return expA - expB;
    if (sortOrder === "desc") return expB - expA;
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Find Study Partners
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Use search filters and sorting options to connect with your ideal StudyMate.
      </p>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-6 rounded-xl shadow-inner mb-10 gap-4">
        <input
          type="text"
          placeholder="Search by Subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sort by Experience</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sorted.length > 0 ? (
          sorted.map((partner) => <PartnerCard key={partner._id} partner={partner} />)
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No partners found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindPartners;
