import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import FindPartners from './pages/FindPartners';
import CreatePartnerProfile from './pages/CreatePartnerProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout includes persistent Header and Footer */}
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="find-partners" element={<FindPartners />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Protected Routes (Need to implement actual protection) */}
          <Route path="profile" element={<Profile />} />
          <Route path="create-partner-profile" element={<CreatePartnerProfile />} />
          
          {/* Dynamic Details Page (Placeholder) */}
          <Route path="partner/:id" element={<div>Partner Details Page</div>} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
              <p className="mt-4 text-gray-600">The page you are looking for does not exist.</p>
            </div>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;