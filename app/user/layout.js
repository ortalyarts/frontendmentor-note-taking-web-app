
import { getServerSideProps } from '@/lib/util.js';
import NoteLayout from "@/components/noteLayout";

export default async function User({ children }) {

    const userId = 'dbd9532e-9f89-4f17-bd5d-8d37947c045d'; // Replace with actual user ID
    const {notes} = await getServerSideProps(userId);

    // const { userId } = params; // To implement with Auth
    
    // group all user tags
    const userTags = notes.map(note => note.tags).toString().split(","); 
    const uniqueTags = [...new Set(userTags)] // remove duplicates

    return(
        <NoteLayout notes={notes} uniqueTags={uniqueTags}>
            {children}
        </NoteLayout>
    )
}
