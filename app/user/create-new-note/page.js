import NewNote from "@/components/newNote";
import { auth } from "@/lib/auth.js";
import { prisma } from '@/lib/prisma';

export default async function NotePage (){
    const session = await auth();

    // Fetch user from DB using email (recommended unique identifier)
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });
    const userId = user?.id;

    return(
        <>
            <NewNote userId={userId}/>
        </>
    )
}