import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopPartners } from "../api/partnerApi"; // তোমার API ফাইল
import { useAuth } from "../context/AuthContext"; // user context

const TopPartners = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    let mounted = true;

    setLoading(true);

    getTopPartners()
      .then((data) => {
        if (mounted) {
          setItems(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setItems([]);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleView = (id) => {
    if (!user) return nav("/login");
    nav(`/profile/${id}`);
  };

  return (
    <section id="top-partners" className="py-16">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Top Study Partners</h3>
        <a href="/find" className="text-sm text-slate-600">
          Explore all partners →
        </a>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-40 bg-white rounded-xl shadow animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items && items.length ? (
              items.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-2xl shadow p-4 flex flex-col"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.photo || `https://i.pravatar.cc/80?u=${p._id}`}
                      alt="avatar"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-slate-500">
                        {p.subjects?.slice(0, 3).join(", ")}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex-1">
                    <div className="text-sm text-slate-600 mb-2">
                      {p.bio
                        ? p.bio.slice(0, 120)
                        : "Enthusiastic study partner — organized, punctual and collaborative."}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-yellow-500 font-medium">
                        {p.rating?.toFixed(1) || "4.5"}
                      </div>
                      <div className="text-xs text-slate-500">
                        ({p.reviewsCount || 12})
                      </div>
                    </div>

                    <button
                      onClick={() => handleView(p._id)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-600">No partners found.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopPartners;
