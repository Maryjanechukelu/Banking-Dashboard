// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key'; // Use environment variable

interface User {
  username: string;
}

const verifyToken = (token: string): User | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as User;
  } catch (err) {
    return null;
  }
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const currentUser = token ? verifyToken(token) : null;
  
  const { pathname } = request.nextUrl;

  // Allow everyone to access the landing page
  if (pathname === '/' || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // Redirect authenticated users to the dashboard if they try to access login or signup pages
  if (currentUser && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users trying to access the dashboard to the login page
  if (!currentUser && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Allow access to other pages
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
