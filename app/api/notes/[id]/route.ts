import { connectDB } from "@/lib/mongodb";
import notes from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";

// view a single note
export async function GET(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
        await connectDB()
        const {id} = await params
        const noteDetails = await notes.findById({_id:id})
        // send response to client
        return NextResponse.json(noteDetails,{status:200})

    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
}

// update a single note
export async function PUT(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
        await connectDB()
        const {id} = await params
        const reqBody = await req.json()
        const UpdatedNoteDetails = await notes.findByIdAndUpdate({_id:id},reqBody,{new:true})
        // send response to client
        return NextResponse.json(UpdatedNoteDetails,{status:200})

    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
}

// delete a single note
export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:string}>}) {
    try{
        await connectDB()
        const {id} = await params
        const removeNote = await notes.findByIdAndDelete({_id:id})
        // send response to client
        return NextResponse.json(removeNote,{status:200})

    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
}