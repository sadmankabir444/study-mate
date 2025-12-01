import React, { useState, useEffect } from 'react'


const slides = [
{ title: 'Find study partners who match your goals', subtitle: 'Pair with people who study the same subjects and at the same pace.', img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=60' },
{ title: 'Practice, share, succeed together', subtitle: 'Group up for projects, revision sessions, or mock tests.', img: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=60' },
{ title: 'Learn skills & earn ratings', subtitle: 'Build your profile, showcase skills and get rated by partners.', img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=60' }
]


export default function Hero(){
const [index, setIndex] = useState(0)


useEffect(()=>{
const id = setInterval(()=> setIndex(i => (i+1) % slides.length), 5000)
return ()=> clearInterval(id)
},[])


return (
<section className="relative rounded-2xl overflow-hidden shadow">
<div className="relative h-64 md:h-96">
{slides.map((s,i)=> (
<div key={i} className={`absolute inset-0 transition-all duration-700 ${i===index? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ backgroundImage: `url(${s.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
<div className="h-full w-full bg-gradient-to-r from-black/40 to-black/10 flex items-center">
<div className="container mx-auto px-4 text-white">
<h1 className="text-2xl md:text-4xl font-extrabold drop-shadow-lg">{s.title}</h1>
<p className="mt-2 text-sm md:text-lg max-w-xl">{s.subtitle}</p>
<div className="mt-4">
<a href="#top-partners" className="inline-block px-5 py-2 rounded-lg bg-white text-purple-700 font-medium">Find Partners</a>
</div>
</div>
</div>
</div>
))}


{/* dots */}
<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
{slides.map((_,i)=> (
<button key={i} onClick={()=>setIndex(i)} className={`w-3 h-3 rounded-full ${i===index? 'bg-white' : 'bg-white/40'}`}></button>
))}
</div>
</div>
</section>
)
}