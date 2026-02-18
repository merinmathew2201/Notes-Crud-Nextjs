"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Register() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async (e:any)=>{
    e.preventDefault()
    if(!name || !email || !password){
      alert("Fill the form completely")
    }else{
      const userDetails = {name,email,password}
      const res = await fetch('/api/register',{
        method:"POST",
        body:JSON.stringify(userDetails)
      })
      if(res.status == 201){
        alert("User Added Succesfully..Please Login...")
        router.push('/')
      }else if(res.status == 409){
        const data = await res.json()
        alert(data.message)
        router.push('/')
      }
      setName("")
      setEmail("")
      setPassword("")
    }

  }
  
  return(
    <main className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-blue-800">Register</h1>
      <form onSubmit={handleRegister} className="p-6 space-y-6 w-100 border rounded mt-10 border-blue-400 shadow-lg ">
        <input onChange={e=>setName(e.target.value)} value={name} type="text" placeholder="Name"  className="border border-gray-300 p-2 w-full rounded"/>
        <input onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder="Email"  className="border border-gray-300 p-2 w-full rounded"/>
        <input onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="Password"  className="border border-gray-300 p-2 w-full rounded"/>
        <button type="submit"  className="bg-blue-800 text-white px-4 py-2 rounded">Register</button>
        <p className="">Already a User? Click here to <a href="/" className="text-blue-800 underline">Login</a></p>
      </form>
    </main>
  )
}