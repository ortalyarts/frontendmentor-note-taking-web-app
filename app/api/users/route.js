import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";

// import { prisma } from "@/lib/prisma.js";

// export async function POST(req) {
//   const { email, name } = await req.json();

//   try {
//     const user = await prisma.user.create({
//       data: {
//         email,
//         name,
//       },
//     });
//     return NextResponse.json(user, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }