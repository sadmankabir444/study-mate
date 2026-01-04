import React from "react";
import { useAuth } from "../../provider/AuthProvider";
import { useState, useEffect } from "react";

const DashboardHome = () => {
  const { user } = useAuth();
  const [requestsCount, setRequestsCount] = useState(0);
  const [connectionsCount, setConnectionsCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const resRequests = await fetch(
          `https://study-mate-seven-blond.vercel.app/partner-requests?email=${user.email}`
        );
        const requestsData = await resRequests.json();
        setRequestsCount(requestsData.length);

        const resPartners = await fetch(
          `https://study-mate-seven-blond.vercel.app/partners?email=${user.email}`
        );
        const partnersData = await resPartners.json();
        setConnectionsCount(partnersData.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName || "Student"}!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold">Partner Requests</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{requestsCount}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold">My Profiles / Connections</h2>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{connectionsCount}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold">Explore Study Partners</h2>
          <p className="text-indigo-600 mt-2">Check out new partners!</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
