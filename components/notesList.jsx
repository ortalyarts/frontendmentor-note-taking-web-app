
'use client'

import { useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link"

export default function NotesList({notes, params}) {

    const segments = useSelectedLayoutSegments()
    const noteId = segments[0] // if you're at /user/[noteId]

    return(
    <ul className="notes-list">
        {notes.length === 0 && <p>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>}
        {notes.map((note, index) => (
            
            <li key={index}>      
                <Link href={`/user/${note.id}`} className={`note-item ${note.id === noteId ? 'active' : ''}`}>
                <h3 className="note-title text-3">{note.title}</h3>
                <ul className="note-tags">
                    {note.tags.split(",").map((tag, index) => (
                    <li key={index} className="text-6">{tag}</li>
                    ))}
                </ul>
                <span className="note-date text-6">{new Date(note.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                </Link> 
            </li>
        ))}
    </ul>
    )
}