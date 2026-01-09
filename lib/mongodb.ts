import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URL as string;

export const connectDB = async()=>{
    try{
        const res = await  mongoose.connect(connectionString)
        console.log("Database Connected..");
    }catch(err){
        console.log("Database connection failed..");
        console.log(err);
    }
}