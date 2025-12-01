import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function Login(){
const { loginMock } = useAuth()
const nav = useNavigate()


function handleDemo(){
loginMock()
nav('/')
}


return (
<div className="container mx-auto px-4 py-12 flex items-center justify-center">
<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
<h3 className="text-xl font-semibold">Login (demo)</h3>
<p className="mt-2 text-sm text-slate-600">This demo login will create a sample user in localStorage.</p>
<button onClick={handleDemo} className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-medium">Login Demo</button>
</div>
</div>
)
}