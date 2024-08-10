import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken, setTokenCookie } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Replace with your own user authentication logic
    if (username === 'test' && password === 'password') {
      const token = generateToken({ username });
      setTokenCookie(res, token);
      res.status(200).json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
