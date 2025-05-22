'use client'

import { useState } from 'react';
import { redirect } from 'next/navigation';
import Link from "next/link";

import { handleCreateNote } from '@/lib/util.js';

import IconClock from "./UI/iconClock";
import IconTag from "./UI/iconTag";
import Modal from "@/components/UI/modal";

export default function NewNote({userId}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const initialValues = {
        title: "",
        content: "",
        tags: "",
      }
    const [formValues, setFormValues] = useState(initialValues);
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
        setErrors({});
        setServerError('');
    }
    function cancelChanches(){
        setFormValues(initialValues)
        setNoteEdited(false);
        setErrors({});
    }

    async function saveNote(event){
        event.preventDefault();
        setServerError(''); // reset before new attempt  
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
            title: title,
            content: content,
            tags: tags,
            userId: userId,
            archived: false
          };

        if(validate()){
            try{
                await handleCreateNote(updatedNote);
                setNoteEdited(false);
                handleOpenModal();
            } catch (error) {
                setServerError(error.message || 'Something went wrong');
            }
        }
    }
    function handleCloseModal() {
        setModalIsOpen(false);
        setFormValues(initialValues);
        redirect('/user');
    }
    function handleOpenModal() {
        setModalIsOpen(true);
    }
    return(
    <>
    <Modal open={modalIsOpen} onClose={handleCloseModal}>
        <div className="modal-holder note-saved"> 
            <button type='button' className='close-modal' aria-label="Close modal" onClick={handleCloseModal}>
                <span className="icon-fill" aria-hidden="true">
                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M12.657.843a1.5 1.5 0 010 2.121L9.12 6.5l3.536 3.536a1.5 1.5 0 11-2.121 2.12L7 8.622l-3.536 3.536a1.5 1.5 0 11-2.12-2.121L4.877 6.5 1.343 2.964A1.5 1.5 0 113.464.844L7 4.377 10.536.843a1.5 1.5 0 012.12 0z" fillRule="evenodd"/></svg>
                </span>
            </button>     
            <div className='modal-text'>       
                <h2 className="text-3" aria-live="assertive">Note saved successfully!</h2>
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
                <span className="note-date text-6">Not yet saved</span>
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
                {serverError && (
                    <div className="message-server-error rounded-corners">
                        <p className='text-4' aria-live="assertive">Note couldn't be saved - {serverError} </p>
                    </div>
                )}
            </div>
        </div>

        <div className="sidebar delete-archive-buttons">
 
        </div>
    </form>
    </>
    )
}