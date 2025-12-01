import React from 'react'


const data = [
{ name: 'Ayesha R.', text: 'Found a brilliant partner for calculus — we now study twice a week and my grades improved.' },
{ name: 'Rahim S.', text: 'Great platform — filters helped me find people who focus on programming exercises.' },
{ name: 'Nadia K.', text: 'Excellent for group projects and peer reviews.' }
]


export default function Testimonials(){
return (
<section>
<h3 className="text-2xl font-semibold">What students say</h3>
<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
{data.map((t,i)=> (
<div key={i} className="bg-white p-6 rounded-xl shadow">
<div className="text-slate-700">“{t.text}”</div>
<div className="mt-4 font-semibold">— {t.name}</div>
</div>
))}
</div>
</section>
)
}