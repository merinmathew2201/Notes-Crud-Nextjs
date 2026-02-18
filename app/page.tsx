"use client"
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


export default function Home() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("") 
  
  const handleLogin = async(e:any)=>{
    e.preventDefault()
    await signIn("credentials",{
      email,password,callbackUrl:"/dashboard"
    })
  } 
  return(
    <main className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold text-blue-800">Login</h1>
      <form onSubmit={handleLogin} className="p-6 w-100 space-y-6 border rounded mt-10 border-blue-400 shadow-lg ">
        <input onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder="Email"  className="border border-gray-300 p-2 w-full rounded"/>
        <input onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="Password"  className="border border-gray-300 p-2 w-full rounded"/>
        <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded">Login</button>
        <p className="">New User? Click here to <Link href="/register" className="text-blue-800 underline">Register</Link></p>
      </form>
    </main>
  )
}
