import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";
import Notes from "../notes/page";


export default async function Dashboard(){
  const session = await getServerSession(authOptions)
  console.log((session));

  if(!session){
    redirect('/')
  }
  
  return(
    <main>
      {
        session &&
        <Notes loginSession = {session}/>
      }
    </main>
  )
}