// pages/api/reindex-algolia.ts

import { NextApiRequest, NextApiResponse } from 'next';

import uploadToAlgolia from "../data/toAlgolia";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Webhook received from DatoCMS:', req.body);

      // Call Algolia upload function to update the index
      await uploadToAlgolia();

      res.status(200).json({ message: 'Algolia index updated successfully' });
    } catch (error) {
      console.error('Error updating Algolia index:', error);
      res.status(500).json({ error: 'Failed to update Algolia index' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
