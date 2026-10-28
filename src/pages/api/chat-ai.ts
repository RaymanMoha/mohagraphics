import { NextApiRequest, NextApiResponse } from 'next';
import { buildPortfolioPrompt, portfolioFallback } from '../../server/portfolioKnowledge';
import { requestPortfolioChat } from '../../server/groqChat';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { message, conversationHistory = [] } = req.body || {};
  if (typeof message !== 'string' || !message.trim() || message.length > 4000) {
    return res.status(400).json({ message: 'A message of 1–4000 characters is required' });
  }
  const history = (Array.isArray(conversationHistory) ? conversationHistory : [])
    .filter((item: any) => ['user', 'assistant'].includes(item?.role) && typeof item?.content === 'string')
    .slice(-4)
    .map((item: any) => ({ role: item.role as 'user' | 'assistant', content: item.content.slice(0, 800) }));
  try {
    if (process.env.GROQ_API_KEY) {
      const result = await requestPortfolioChat([
        { role: 'system', content: buildPortfolioPrompt(message, history) },
        ...history,
        { role: 'user', content: message },
      ]);
      if ('message' in result) return res.status(200).json({ ...result, mode: 'live' });
      return res.status(200).json({ message: portfolioFallback(message, result.unavailable), provider: 'Portfolio reference', mode: 'fallback' });
    }
  } catch {
    console.error('Portfolio chat could not generate a reply');
  }
  return res.status(200).json({ message: portfolioFallback(message), provider: 'Portfolio reference', mode: 'fallback' });
}
