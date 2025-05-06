import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// +++ NOT USED +++ - use handleUpdateNote in util.js instead - NO API needed

// Called when a PUT request is sent to /api/notes/[id]
export async function PUT(request, { params }) {
  const { id } = params
  const body = await request.json()
  const { title, content, tags } = body

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
        tags,
      },
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
// +++ NOT USED +++ - use handleArchiveNote in util.js instead - NO API needed
// Archive Note - Called when a PATCH request is sent to /api/notes/[id]
export async function PATCH(request, { params }) {
  const { id } = await params
  const { archived } = await request.json()

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { archived },
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    console.error('Error archiving note:', error)
    return NextResponse.json({ message: 'Failed to archive note' }, { status: 500 })
  }
}


