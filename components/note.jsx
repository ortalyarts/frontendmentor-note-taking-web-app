'use client'

import { useState } from 'react';

import IconClock from "./UI/iconClock";
import IconTag from "./UI/iconTag";
import IconDelete from "@/components/UI/IconDelete";
import IconArchive from "@/components/UI/iconArchive";
import Modal from './UI/modal';

import { handleUpdateNote, handleArchiveNote, handleDeleteNote } from '@/lib/util.js';

export default function Note({note}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // const [state, formAction] = useFormState(saveNote, { message: null }); // to show message if an input is invalid or empty
    const initialValues = {
        title: note.title,
        content: note.content,
        tags: note.tags,
      }
    const [formValues, setFormValues] = useState(initialValues)
    const [noteEdited, setNoteEdited] = useState(false);

    function handleEdit(e){
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
        setNoteEdited(true);
    }
    function cancelChanches(){
        setFormValues(initialValues)
        setNoteEdited(false);
    }

    async function saveNote(event){
        event.preventDefault()     
        const formData = new FormData(event.currentTarget);
        // Validate form data
        // ++++ //
        const updatedNote = {
            title: formData.get('title'),
            content: formData.get('content'),
            tags: formData.get('tags'),
          };

        await handleUpdateNote(note.id, updatedNote);
        setNoteEdited(false);
    }

    return(
        <>
    <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal-holder'>
            <div className='modal-content'>
                <span className='icon-grey-bg'><IconDelete /></span>
                <div className='modal-text'>
                    <h2 className='text-3'>Delete Note</h2>
                    <p className='text-5'>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
                </div>
            </div>
            <div className='horizontal-line'></div>
            <div className='modal-buttons'>                
                <button className="btn-grey" type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                <button className="btn-main btn-red" type="button" onClick={() => handleDeleteNote(note.id)}>Delete Note</button>
            </div>
        </div>
    </Modal>
       
    <form onSubmit={saveNote} className="note-form">
        <div className="note">
            <h2 className="text-1">
                <label htmlFor='user-input-title' className="sr-only">Note Title</label>
                <input type="text" id="user-input-title" name="title" className="text-1" placeholder='Note Title' 
                    onChange={handleEdit} value={formValues.title}>                
                </input>
            </h2>
            <div className="note-summary">
                <p className="summary-category text-6"><IconTag /> Tags</p>
                <div>
                    <label htmlFor='user-input-tags' className="sr-only">Tags</label>
                    <input type="text" id="user-input-tags" name="tags" className="text-6" placeholder='Add tags here...' 
                        onChange={handleEdit} value={formValues.tags}>                            
                    </input>
                </div>
                <p className="summary-category text-6"><IconClock /> Last edited</p>
                <span className="note-date text-6">{new Date(note.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="note-content">
                <label htmlFor='user-input-content' className="sr-only">Note Content</label>
                <textarea id="user-input-content" name="content" placeholder='Start typing your note here...'
                    onChange={handleEdit} value={formValues.content}
                    >
                </textarea>
                 {/* {note.content.split('\n').map((line, index) => (
                    <p className="text-5" key={index}>{line || <br />}</p>
                    ))} */}
            </div>
            <div className="note-buttons">
                <button className="btn-main" type="submit" disabled={!noteEdited}>Save Note</button>
                <button className="btn-grey" type="button" disabled={!noteEdited} onClick={cancelChanches}>Cancel</button>
                </div>
        </div>

        <div className="sidebar delete-archive-buttons">
            {note.archived? 
            <button className="btn-icon-outline" type="button" onClick={() => handleArchiveNote(note.id, false)}><IconArchive />
                <span>Restore Note</span>
            </button>
            :
            <button className="btn-icon-outline" type="button" onClick={() => handleArchiveNote(note.id, true)}><IconArchive />
                <span>Archive Note</span>
            </button>
            }
            <button className="btn-icon-outline" type="button" onClick={() => setModalIsOpen(true)}><IconDelete /><span>Delete Note</span></button>
            {/* <button className="btn-icon-outline" type="button" onClick={() => handleDeleteNote(note.id)}><IconDelete /><span>Delete Note</span></button> */}
        </div>
    </form>
    </>
    )
}