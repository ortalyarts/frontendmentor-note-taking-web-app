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
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // is shown when note is saved

    const initialValues = {
        title: note.title,
        content: note.content,
        tags: note.tags,
      }
    const [formValues, setFormValues] = useState(initialValues)
    const [noteEdited, setNoteEdited] = useState(false);
    const [errors, setErrors] = useState({}); // form validation
    const [serverError, setServerError] = useState(''); // server error

    function handleEdit(e){
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }))
        setNoteEdited(true);
        setShowSuccessMessage(false);
        setServerError('');
    }
    function cancelChanches(){
        setFormValues(initialValues)
        setNoteEdited(false);
        setErrors({});
        setServerError('');
    }

    async function saveNote(event){
        event.preventDefault()     
        const formData = new FormData(event.currentTarget);

        // Form validation
        const title = formData.get('title')?.trim();
        const content = formData.get('content')?.trim();
        const tags = formData.get('tags')?.trim().toLowerCase();

        const validate = () => {
            let newErrors = {};
            if (!title) newErrors.title = "Title is required";
            if (!content) newErrors.content = "Content is required";
            if (!tags) newErrors.tags = "Enter at least one tag";
    
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        if (!validate()) {
          return;
        }
        const updatedNote = {
            title: formData.get('title'),
            content: formData.get('content'),
            tags: formData.get('tags'),
          };

        try{
            await handleUpdateNote(note.id, updatedNote);
            setNoteEdited(false);
            setShowSuccessMessage(true);
        } catch (error) {
            setServerError(error.message || 'Something went wrong');
        }
        // await handleUpdateNote(note.id, updatedNote);
        // setNoteEdited(false);

        // show success message
        // setShowSuccessMessage(true);
        // setTimeout(() => {
        // setShowSuccessMessage(false);
        // }, 5000);
    }

    return(
        <>
    <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal-holder'>
            <div className='modal-content'>
                <span className='icon-grey-bg'><IconDelete /></span>
                <div className='modal-text'>
                    <h2 className='text-3'>Delete Note</h2>
                    <p className='text-5' tabIndex={-1} autoFocus="true">Are you sure you want to permanently delete this note? This action cannot be undone.</p>
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
                <label htmlFor='user-input-title' >                                    
                    <input type="text" id="user-input-title" name="title" className={`text-1 ${errors.title ? "invalid-input" : ""}`} placeholder='Enter a title...' 
                        onChange={handleEdit} value={formValues.title}
                        autoFocus="true">                
                    </input>
                    <span className="sr-only">Title</span>
                    {errors.title && <span aria-live="polite" className="error-text">{errors.title}</span>}                    
                </label>
            </h2>
            <div className="note-summary">
                <p className="summary-category text-6"><IconTag /> Tags</p>
                <div>
                    <label htmlFor='user-input-tags' >
                        <input type="text" id="user-input-tags" name="tags" className={`text-6 ${errors.tags ? "invalid-input" : ""}`} placeholder='Add tags separated by commas (e.g. Work, Planning)' 
                            onChange={handleEdit} value={formValues.tags}>                            
                        </input>
                        <span className="sr-only">Tags</span>
                        {errors.tags && <span aria-live="polite" className="error-text">{errors.tags}</span>}
                    </label>
                </div>
                <p className="summary-category text-6"><IconClock /> Last edited</p>
                <span className="note-date text-6">{new Date(note.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
            <div className="note-content">
                <label htmlFor='user-input-content'>
                    <textarea id="user-input-content" name="content" placeholder='Start typing your note here...'
                        className={`${errors.content ? "invalid-input" : ""}`}
                        onChange={handleEdit} value={formValues.content}
                        >
                    </textarea>
                    <span className="sr-only">Note content</span>
                    {errors.content && <span aria-live="polite" className="error-text">{errors.content}</span>}
                </label>
            </div>
            <div className="note-buttons">
                <button className="btn-main" type="submit" disabled={!noteEdited}>Save Note</button>
                <button className="btn-grey" type="button" disabled={!noteEdited} onClick={cancelChanches}>Cancel</button>
                {showSuccessMessage && (
                    <div className="success-message rounded-corners">
                        <p className='text-4' aria-live="assertive">Note saved successfully!</p>
                    </div>
                )}
            </div>
        </div>

        <div className="sidebar delete-archive-buttons">
            {note.archived? 
            <button className="btn-icon-outline" type="button" onClick={() => handleArchiveNote(note.id, false)}><IconArchive />
                <span className='btn-text'>Restore Note</span>
            </button>
            :
            <button className="btn-icon-outline" type="button" onClick={() => handleArchiveNote(note.id, true)}><IconArchive />
                <span className='btn-text'>Archive Note</span>
            </button>
            }
            <button className="btn-icon-outline" type="button" onClick={() => setModalIsOpen(true)}><IconDelete />
                <span className='btn-text'>Delete Note</span>
            </button>
        </div>
    </form>
    </>
    )
}