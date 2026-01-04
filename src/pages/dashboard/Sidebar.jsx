import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

const Sidebar = () => {
  const { user } = useAuth();

  const linkClass =
    "block py-3 px-4 rounded-lg transition-colors hover:bg-indigo-100";

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-md hidden lg:block">
      <div className="p-6">
        <div className="text-center mb-8">
          <img
            src={user?.photoURL || "https://via.placeholder.com/80"}
            alt={user?.displayName || "User"}
            className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-indigo-300"
          />
          <h2 className="mt-3 text-lg font-semibold">{user?.displayName || "Student"}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              linkClass + (isActive ? " bg-indigo-50 font-semibold" : "")
            }
          >
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/create-profile"
            className={({ isActive }) =>
              linkClass + (isActive ? " bg-indigo-50 font-semibold" : "")
            }
          >
            Create Profile
          </NavLink>

          <NavLink
            to="/dashboard/connections"
            className={({ isActive }) =>
              linkClass + (isActive ? " bg-indigo-50 font-semibold" : "")
            }
          >
            My Connections
          </NavLink>

          <NavLink
            to="/find-partners"
            className={({ isActive }) =>
              linkClass + (isActive ? " bg-indigo-50 font-semibold" : "")
            }
          >
            Explore Partners
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
