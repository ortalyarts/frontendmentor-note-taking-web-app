
import { NextRequest, NextResponse } from "next/server";

const data = [];

export function GET(){
    return NextResponse.json({data});
}
export async function POST(req){
    const body = await req.json();
    console.log(body);
    return NextResponse.json({body});
}
// export async function POST(req){
//     const body = await req.json();
//     const headers = req.headers.get("auth");
//     console.log(headers);
//     data.push(body)
//     return NextResponse.json({body});
// }
// export function PUT(){
//     return new NextResponse("put");
// }
// export function DELETE(){
//     return new NextResponse("delete");
// }
