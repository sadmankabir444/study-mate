import React from 'react'
import Hero from '../components/Hero'
import TopPartners from '../components/TopPartners'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'


export default function Home(){
return (
<div className="container mx-auto px-4 py-8">
<Hero />
<div className="mt-10">
<TopPartners />
</div>
<div className="mt-16">
<HowItWorks />
</div>
<div className="mt-16">
<Testimonials />
</div>
</div>
)
}