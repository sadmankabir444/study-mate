import React, { createContext, useContext, useState, useEffect } from 'react'


const AuthContext = createContext()


export function AuthProvider({ children }){
// Minimal auth simulation. Replace with your real auth logic.
const [user, setUser] = useState(null)


useEffect(()=>{
// try to load user from localStorage (example)
const raw = localStorage.getItem('sm_user')
if(raw){
try{ setUser(JSON.parse(raw)) }catch(e){ setUser(null) }
}
},[])


function loginMock(){
const demo = { id: 'u1', name: 'Sadman Kabir', email: 'sadman@example.com', photo: 'https://i.pravatar.cc/150?img=12' }
setUser(demo)
localStorage.setItem('sm_user', JSON.stringify(demo))
}
function logout(){ setUser(null); localStorage.removeItem('sm_user') }


return (
<AuthContext.Provider value={{ user, loginMock, logout }}>
{children}
</AuthContext.Provider>
)
}


export function useAuth(){ return useContext(AuthContext) }