import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'


export default function App(){
return (
<div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
<Navbar />
<main className="flex-1">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/profile/:id?" element={<Profile />} />
<Route path="/login" element={<Login />} />
{/* Add other routes like Find Partners, Create Profile etc. */}
</Routes>
</main>
<Footer />
</div>
)
}