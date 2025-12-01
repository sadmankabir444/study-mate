import React from 'react'
import { useParams } from 'react-router-dom'


export default function Profile(){
const { id } = useParams()
return (
<div className="container mx-auto px-4 py-12">
<div className="bg-white p-8 rounded-2xl shadow">
<h2 className="text-2xl font-semibold">Profile Details</h2>
<p className="mt-4 text-slate-600">This page should display full details for partner id: <strong>{id || 'current user'}</strong>.</p>
<p className="mt-2 text-slate-500">Implement fetching partner by id from <code>/api/partners/:id</code>.</p>
</div>
</div>
)
}