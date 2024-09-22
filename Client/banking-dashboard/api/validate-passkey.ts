// pages/api/validate-passkey.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mock passkeys for testing
  const validPasskey = "123456"; // Change this as needed

  if (req.method === 'POST') {
    const { passkey } = req.body;

    if (passkey === validPasskey) {
      res.status(200).json({ valid: true });
    } else {
      res.status(400).json({ message: "Invalid Passkey. Please try again." });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
