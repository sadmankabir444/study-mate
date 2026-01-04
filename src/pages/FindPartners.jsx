import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import PartnerCard from "../components/PartnerCard";
import { FaSearch } from "react-icons/fa";

const FindPartners = () => {
  const loadedData = useLoaderData(); // Data from loader
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [studyModeFilter, setStudyModeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  // Pagination / Load More
  const [visibleCount, setVisibleCount] = useState(12); // initially 12 items

  useEffect(() => {
    setPartners(loadedData || []);
    setLoading(false);
  }, [loadedData]);

  // Filter by search and study mode
  const filtered = partners.filter((p) => {
    const matchesSearch = p.subject?.toLowerCase().includes(search.toLowerCase());
    const matchesStudyMode = studyModeFilter ? p.studyMode === studyModeFilter : true;
    return matchesSearch && matchesStudyMode;
  });

  // Sort by experience
  const sorted = filtered.sort((a, b) => {
    const expA = Number(a.experienceLevel || 0);
    const expB = Number(b.experienceLevel || 0);
    if (sortOrder === "asc") return expA - expB;
    if (sortOrder === "desc") return expB - expA;
    return 0;
  });

  const visiblePartners = sorted.slice(0, visibleCount);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
        Find Study Partners
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Use search filters and sorting options to connect with your ideal StudyMate.
      </p>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-6 rounded-xl shadow-inner mb-10 gap-4">
        <div className="flex items-center w-full md:w-1/2 relative">
          <FaSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={studyModeFilter}
          onChange={(e) => setStudyModeFilter(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Study Modes</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Hybrid">Hybrid</option>
        </select>

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
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 animate-pulse rounded-2xl"
            ></div>
          ))}
        </div>
      ) : visiblePartners.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {visiblePartners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 col-span-full text-center">
          No partners found.
        </p>
      )}

      {/* Load More Button */}
      {visibleCount < sorted.length && (
        <div className="text-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow-md transition-all duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FindPartners;
