import React from 'react'


const steps = [
{ title: 'Create a Profile', desc: 'Add your subjects, skills and a short bio so partners can find you.' },
{ title: 'Search & Filter', desc: 'Find partners by subject, availability and rating.' },
{ title: 'Connect & Study', desc: 'Message, schedule sessions and rate each other.' }
]


export default function HowItWorks(){
return (
<section className="bg-white rounded-2xl p-8 shadow">
<h3 className="text-2xl font-semibold">How It Works</h3>
<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
{steps.map((s,i)=> (
<div key={i} className="p-5 border rounded-lg">
<div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center font-bold text-purple-700">{i+1}</div>
<h4 className="mt-3 font-semibold">{s.title}</h4>
<p className="mt-2 text-sm text-slate-600">{s.desc}</p>
</div>
))}
</div>
</section>
)
}