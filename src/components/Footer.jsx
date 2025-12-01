import React from 'react'


export default function Footer(){
return (
<footer className="mt-12 border-t bg-white">
<div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
<div>
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold">SM</div>
<div>
<div className="font-bold">StudyMate</div>
<div className="text-sm text-slate-500">Connect. Study. Grow.</div>
</div>
</div>
<p className="mt-4 text-sm text-slate-600 max-w-sm">StudyMate helps students find compatible study partners by subject, skill and schedules — making studying social and effective.</p>
</div>


<div className="flex flex-col">
<h4 className="font-semibold">Quick Links</h4>
<a href="/" className="mt-3 text-sm">Home</a>
<a href="/find" className="mt-2 text-sm">Find Partners</a>
<a href="/create" className="mt-2 text-sm">Create Profile</a>
</div>


<div>
<h4 className="font-semibold">Follow Us</h4>
<div className="mt-3 flex gap-3">
<a href="#" aria-label="facebook" className="text-slate-500 text-sm">Facebook</a>
<a href="#" aria-label="twitter" className="text-slate-500 text-sm">Twitter</a>
<a href="#" aria-label="linkedin" className="text-slate-500 text-sm">LinkedIn</a>
<a href="#" aria-label="instagram" className="text-slate-500 text-sm">Instagram</a>
</div>
</div>
</div>
<div className="bg-slate-50 text-slate-500 text-sm text-center py-4">© {new Date().getFullYear()} StudyMate — All rights reserved.</div>
</footer>
)
}