import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import { addUser, getUserByUsername } from '@/lib/userStore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUser = getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    try {
      const hashedPassword = await hash(password, 10);
      addUser({ username, password: hashedPassword });
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
