import { NextApiRequest, NextApiResponse } from 'next';

import { buildPortfolioPrompt, portfolioFallback } from '../../server/portfolioKnowledge';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (typeof message !== 'string' || !message.trim() || message.length > 4000) {
      return res.status(400).json({ message: 'A message of 1–4000 characters is required' });
    }

    console.log('=== AI Chat Debug ===');
    console.log('Groq API Key exists:', !!process.env.GROQ_API_KEY);

    // Try Groq API first
    if (process.env.GROQ_API_KEY) {
      try {
        console.log('Trying Groq API...');

        const model = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';
        const cleanHistory = (Array.isArray(conversationHistory) ? conversationHistory : [])
          .filter((msg: any) => ['user', 'assistant'].includes(msg?.role) && typeof msg?.content === 'string')
          .slice(-4)
          .map((msg: any) => ({
            role: msg.role,
            content: msg.content.slice(0, 800)
          }));

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: 'system', content: buildPortfolioPrompt(message, cleanHistory) },
              ...cleanHistory,
              { role: 'user', content: message }
            ],
            max_tokens: 700,
            temperature: 0.2,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Groq Success!');
          return res.status(200).json({ 
            message: data.choices[0]?.message?.content,
            provider: `Groq (${model})`,
            debug: 'Real AI Working!'
          });
        } else {
          console.log('Groq Error:', response.status);
        }
      } catch (error) {
        console.log('Groq failed:', error);
      }
    }

    console.log('Using smart fallback');

    return res.status(200).json({ message: portfolioFallback(message), provider: 'Portfolio reference', mode: 'fallback' });

  } catch (error) {
    console.error('Chat API error:', error);

    return res.status(200).json({
      message: portfolioFallback(''),
      provider: 'Portfolio reference',
      mode: 'fallback'
    });
  }
}
