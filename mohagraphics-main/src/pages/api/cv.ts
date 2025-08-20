import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'public', 'files', 'cv.pdf');
  
  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=Mohammed-Abdirahman-CV.pdf');
    
    res.send(fileBuffer);
  } catch (error) {
    res.status(404).json({ message: 'CV file not found' });
  }
}
