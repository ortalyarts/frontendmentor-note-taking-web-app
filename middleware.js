// simplified function to change only color theme

// import { NextResponse } from 'next/server';

// export function middleware(request) {
//     const theme = request.cookies.get('theme')?.value;
//     // console.log('🌙 Middleware theme cookie:', theme); // <-- debug log
  
//     const response = NextResponse.next();
//     if (theme) {
//       response.headers.set('x-theme', theme);
//     }
//     return response;
//   }

//   export const config = {
//     matcher: ['/', '/(.*)'],
//   };

// set color / font theme cookies
import { NextResponse } from 'next/server';

export function middleware(request) {
  const theme = request.cookies.get('theme')?.value;
  const font = request.cookies.get('font')?.value;

  const response = NextResponse.next();

  if (theme) {
    response.headers.set('x-theme', theme);
  }

  if (font) {
    response.headers.set('x-font', font);
  }

  return response;
}