import { NextResponse } from 'next/server';

export function DELETE(req, {params}) {
    return NextResponse.json({
        message: `Delete user with id ${params.userAuth}`,
    });
}