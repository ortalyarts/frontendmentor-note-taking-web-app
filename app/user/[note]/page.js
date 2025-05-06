import Note from "@/components/note.jsx";
import IconDelete from "@/components/UI/IconDelete";
import IconArchive from "@/components/UI/iconArchive";

import { getNote, handleUpdateNote } from '@/lib/util.js';

export default async function NotePage (props){
    
    const params = await props.params;
    const noteId = params.note; //'65f9d084-c524-40b2-9766-4ee688651f85'; // Replace with actual user ID
    const {note} = await getNote(noteId);

    return(
        <>
            <Note note={note}/>
        </>
    )
}