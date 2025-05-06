import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.js";

export async function POST(req) {
  const { title, content, userId, tags, archived } = await req.json();

  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
        tags,
        archived: false,
      },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}