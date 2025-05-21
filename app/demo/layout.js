
import { auth } from "@/lib/auth.js";
import { getServerSideProps } from '@/lib/util.js';
import NoteLayout from "@/components/noteLayout";
import Link from "next/link";
import { prisma } from '@/lib/prisma';

export default async function DemoLaout({ children }) {

    // Fetch user from DB using email (recommended unique identifier)
    const user = await prisma.user.findUnique({
        where: { email: 'ortaly@ortaly.com' },
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
        <NoteLayout notes={notes} uniqueTags={uniqueTags}>
            {children}
        </NoteLayout>
    )
}
