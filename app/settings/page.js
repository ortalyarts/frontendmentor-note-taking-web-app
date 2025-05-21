import { auth } from "@/lib/auth.js";
import { getServerSideProps } from '@/lib/util.js';
import SettingsLayout from "@/components/settingsLayout";
import Link from "next/link";
import { prisma } from '@/lib/prisma';

export default async function Settings () {
    const session = await auth();
    // if not authorized tryes to visit the page
    if (!session?.user?.id) {
        return (
        <main className="wrong-page">
            <h1 className="text-3">You must be signed in to view this content.</h1>
            <Link href="/login" className="btn-main">Sign in</Link>
        </main>)
    }
    // Fetch user from DB using email (recommended unique identifier)
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const userId = user?.id;
    const {notes} = await getServerSideProps(userId);
    
    // group all user tags

    const userTags = notes
    .map(note => note.tags)
    .toString()
    .split(",")
    .map(tag => tag.trim().toLowerCase());

    const uniqueTags = [...new Set(userTags)] // remove duplicates

    return(
        <SettingsLayout uniqueTags={uniqueTags} />
    )
}