import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
