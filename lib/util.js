'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';

// Select all the notes of the user by userId
export async function getServerSideProps(userId) {
    const notes = await prisma.note.findMany({where: { userId }})  // Direct Prisma call

    return {
      notes 
    }
  }

  // Select the note
export async function getNote(id) {
  const note = await prisma.note.findUnique({where: { id }})  // Direct Prisma call
  if (!note) {
    throw new Error('Note not found')
  }
  return {
    note 
  }
}

// Update note
// export async function handleUpdateNote(id, updatedData) {
//   // Validate the input data
//   // +++++++++++ //

//   const response = await fetch(`/api/notes/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(updatedData),
//   })

//   if (!response.ok) {
//     console.error('Failed to update note')
//     return
//   }

//   const updatedNote = await response.json()
//   console.log('Note updated!', updatedNote)
// }

// Create note
export async function handleCreateNote(noteData) {
  const tempData = {
    "title":"Title",
    "content": "Some text",
    "userId":"dbd9532e-9f89-4f17-bd5d-8d37947c045d",
    "tags":"Cooking",
    "archived": false
  }
  try {
    // Optionally validate the input data here
    //if (!noteData.title || !noteData.content) throw new Error('Missing fields')

    const newNote = await prisma.note.create({
      data: tempData,
    })

    // Revalidate any path that might show this new note
    revalidatePath('/user') // or your actual route

    console.log('Note created!', newNote)
    return newNote
  } catch (error) {
    console.error('Failed to create note:', error)
    throw error
  }
}

// Update note
export async function handleUpdateNote(id, updatedData) {
  try {
    // Optionally validate the input data here
    if (!updatedData.title || !updatedData.content) throw new Error('Missing fields')

    const updatedNote = await prisma.note.update({
      where: { id },
      data: updatedData,
    })

    revalidatePath(`/user/${id}`) 

    console.log('Note updated!', updatedNote)
    return updatedNote
  } catch (error) {
    console.error('Failed to update note:', error)
    throw error
  }
}

// Archive note
// The option when used with api/notes/[id] route:
  // export async function handleArchiveNote(noteId, archived) {
  //     const response = await fetch(`/api/notes/${noteId}`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ archived }),
  //     })
    
  //     if (!response.ok) {
  //       console.error('Failed to update archive status')
  //       return
  //     }
    
  //     const updatedNote = await response.json()
      
  // }

// Archive note
export async function handleArchiveNote(noteId, archived) {
  try {
    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: { archived },
    })

    // Revalidate UI if needed (replace with your actual path)
    revalidatePath(`/user/$${noteId}`);
    return updatedNote
  } catch (err) {
    console.error('Failed to archive note:', err)
    throw err
  }
}

// Delete note
export async function handleDeleteNote(noteId) {
  try {
    const deletedNote = await prisma.note.delete({
      where: { id: noteId },
    })

    // Revalidate UI if needed (replace with your actual path)
    revalidatePath('/user');
    redirect('/user');
    return deletedNote
  } catch (err) {
    console.error('Failed to delete note:', err)
    throw err
  }
}