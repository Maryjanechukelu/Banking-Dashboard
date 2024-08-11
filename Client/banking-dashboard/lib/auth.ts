// lib/auth.ts
import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';

const SECRET_KEY = process.env.SECRET_KEY || 'default-secret-key'; // Use environment variable

interface User {
  email: string;
}

export const generateToken = (user: User): string => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
};

export const verifyToken = (token: string): User | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as User;
  } catch (err) {
    return null;
  }
};

export const setTokenCookie = (res: any, token: string) => {
  const cookie = serialize('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    maxAge: 3600, // 1 hour
    path: '/',
  });
  res.setHeader('Set-Cookie', cookie);
};

export const parseCookies = (req: any) => {
  return parse(req.headers.cookie || '');
};
