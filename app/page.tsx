"use client"

import { useEffect, useState } from "react";

interface Note{
  _id:string,
  title:string,
  description:string
}

export default function Home() {
  
  const [allNotes,setAllNotes] = useState<Note[]>([])
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")

  console.log(allNotes);
  
  useEffect(()=>{
    fetchNotes()
  },[])

  const fetchNotes = async()=>{
    const res = await fetch("/api/notes")
    setAllNotes(await res.json())
  }
  const addNote = async ()=>{
    if(!title || !description){
      alert("Fill the form completely")
    }else{
      // api call
      
    }
  }

  return (
    <main className="min-h-screen bg-blue-50 p-10 ">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="font-bold text-2xl text-blue-600 mb-4 text-center">Note Manager</h1>
        <input value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="Title" className="border p-2 w-full border-gray-200 mb-2" />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="border p-2 w-full border-gray-200 mb-2" />

        <button onClick={addNote} className="bg-green-600 px-3 py-2 text-white rounded">ADD NOTE</button>
        <div className="mt-6 space-y-6">
          {/* note duplicated */}
          {
            allNotes?.length>0?
              allNotes?.map((note:Note)=>(
                <div key={note?._id} className="border border-gray-200 p-3 rounded">
                  <h3 className="font-semibold">{note?.title}</h3>
                  <p className="text-sm text-gray-600">{note?.description}</p>
                  <button className="text-red-600 text-sm mt-2 me-5">Update</button>
                  <button className="text-red-600 text-sm mt-2 ">Delete</button>
                </div>
              ))
            :
            <p>Nothing to display....</p>}
        </div>
      </div>

      
    </main>
  );
}
