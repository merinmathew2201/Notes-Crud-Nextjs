import { connectDB } from "@/lib/mongodb";
import users from "@/models/users";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{},
            async authorize(credentials:any){
                await connectDB()
                const user = await users.findOne({email:credentials.email})
                if(!user){
                    return null
                }
                const isMatch = await bcrypt.compare(credentials.password,user.password)
                if(!isMatch){
                    return null
                }
                return{
                    id:user._id,
                    name:user.name,
                    email:user.email
                }
            }

        })
    ],
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn:"/"
    },
    secret:process.env.NEXTAUTH_SECRET
};