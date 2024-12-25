import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust the import path to your Prisma instance

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;

  if (req.method !== 'GET') {
    
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!uid || typeof uid !== 'string') {
    return res.status(400).json({ error: 'Invalid UID' });
  }

  try {
    // Fetch user from the database using the uid
    const user = await prisma.user.findUnique({
      where: {
        uid,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
