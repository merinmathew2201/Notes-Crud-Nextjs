import { connectDB } from "@/lib/mongodb";
import notes from "@/models/notes";
import { NextResponse } from "next/server";

// steps to solve add note api-post

export async function POST(req:Request) {
    try{
        await connectDB()
        const body = await req.json()
        const newNote = await notes.create(body)
        // send response to client
        return NextResponse.json(newNote,{status:201})

    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
}

// get all notes api-get
export async function GET() {
    try{
        await connectDB()
        const allNotes = await notes.find()
        // send response to client
        return NextResponse.json(allNotes,{status:200})

    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
}