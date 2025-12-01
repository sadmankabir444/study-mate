import React, { useState } from 'react'
<div className="relative">
<button onClick={()=>setOpen(o=>!o)} className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-slate-200">
<img src={user.photo} alt="profile" className="w-full h-full object-cover"/>
</button>
{open && (
<div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2">
<Link to={`/profile/${user.id}`} className="block px-4 py-2 text-sm hover:bg-slate-50">Profile</Link>
<button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50">Logout</button>
</div>
)}
</div>
</>
)}
</nav>


{/* mobile */}
<div className="md:hidden flex items-center gap-2">
<button onClick={()=>setOpen(o=>!o)} className="p-2 rounded-md bg-slate-100">
<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
</svg>
</button>
</div>


{/* mobile panel */}
{open && (
<div className="md:hidden absolute right-4 top-16 w-64 bg-white rounded-lg shadow-lg p-4">
<Link to="/" className="block py-2">Home</Link>
<Link to="/find" className="block py-2">Find Partners</Link>
{!user ? (
<>
<Link to="/login" className="block py-2">Login</Link>
<Link to="/register" className="block py-2">Register</Link>
</>
) : (
<>
<Link to="/create" className="block py-2">Create Partner Profile</Link>
<Link to="/connections" className="block py-2">My Connections</Link>
<Link to={`/profile/${user.id}`} className="block py-2">Profile</Link>
<button onClick={handleLogout} className="w-full text-left py-2">Logout</button>
</>
)}
</div>
)}


</div>
</header>
)
}