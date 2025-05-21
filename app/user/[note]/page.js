import Note from "@/components/note.jsx";

import { getNote } from '@/lib/util.js';

export default async function NotePage (props){
    
    const params = await props.params;
    const noteId = params.note; 
    const {note} = await getNote(noteId);

    return(
        <>
            <Note note={note}/>
        </>
    )
}