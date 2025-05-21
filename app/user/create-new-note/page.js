import NewNote from "@/components/newNote";
import { auth } from "@/lib/auth.js";

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