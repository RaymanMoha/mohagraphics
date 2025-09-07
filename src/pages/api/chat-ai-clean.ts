import { NextApiRequest, NextApiResponse } from 'next';

// Portfolio context for AI
const portfolioPrompt = `Write naturally like a human. Use minimal bold formatting and clean structure.

You are Mohammed Abdirahman's intelligent AI assistant with comprehensive knowledge of his portfolio, skills, and experience.

ABOUT MOHAMMED:
- Full-Stack Developer with 3+ years professional experience
- Flutter Mobile Engineer at Reon Capital (Feb 2025-Present)  
- Built ENEVA utility platform and Zuba sports apps
- Expert in React, Next.js, Flutter, TypeScript
- Available for remote work worldwide

TECHNICAL SKILLS:
Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
Mobile: Flutter, Dart (Expert level - 3+ years production experience)
Backend: Node.js, Python, Flask, Laravel, GraphQL, REST APIs
Databases: PostgreSQL, MySQL, MongoDB, Firebase
Cloud: Digital Ocean, Fly.io, GCP, Vercel, Netlify, Docker

MAJOR PROJECTS:
- ENEVA utility management platform (Reon Capital)
- Zuba Botswana Premier League apps (Fan App & Steward App)
- ENCOFLOW e-commerce (1M+ transactions monthly, 99.9% uptime)
- OnSpace platform (15% bug reduction, performance optimization)

ACHIEVEMENTS:
- Published multiple apps on Google Play Store
- 99.9% uptime on major e-commerce platforms
- 30-40% performance improvements across projects
- 1M+ transactions handled monthly

CONTACT:
Phone: +254-799-722-501
Website: https://www.mohagraphics.tech
Email: abdulmoharayman@gmail.com

Write conversational responses. Use simple bullet points when needed. Keep responses concise and engaging. End with a natural question.`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    console.log('=== AI Chat Debug ===');
    console.log('Message:', message);
    console.log('Groq API Key exists:', !!process.env.GROQ_API_KEY);

    // Try Groq API first
    if (process.env.GROQ_API_KEY) {
      try {
        console.log('Trying Groq API...');

        const cleanHistory = conversationHistory.slice(-4).map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        }));

        const response = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'llama-3.1-8b-instant',
              messages: [
                { role: 'system', content: portfolioPrompt },
                ...cleanHistory,
                { role: 'user', content: message },
              ],
              max_tokens: 350,
              temperature: 0.4,
            }),
          },
        );

        if (response.ok) {
          const data = await response.json();
          console.log('Groq Success!');
          return res.status(200).json({
            message: data.choices[0]?.message?.content,
            provider: 'Groq (llama-3.1-8b-instant)',
            debug: 'Real AI Working!',
          });
        } else {
          console.log('Groq Error:', response.status);
        }
      } catch (error) {
        console.log('Groq failed:', error);
      }
    }

    console.log('Using smart fallback');

    // Smart fallback responses
    const lowerMessage = message.toLowerCase();
    let smartResponse = '';

    if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      smartResponse = `Hi! I'm Mohammed's AI assistant. He's a Flutter engineer at Reon Capital working on apps like ENEVA and Zuba. What would you like to know about his experience?`;
    } else if (
      lowerMessage.includes('skills') ||
      lowerMessage.includes('tech')
    ) {
      smartResponse = `Mohammed's main skills include:
• React & Next.js (frontend)
• Flutter & Dart (mobile apps)
• Node.js & Python (backend)

He's published apps on Google Play and achieved 99.9% uptime on e-commerce platforms. Which technology interests you?`;
    } else if (
      lowerMessage.includes('projects') ||
      lowerMessage.includes('work')
    ) {
      smartResponse = `Mohammed's recent projects:
• ENEVA - utility management platform
• Zuba sports apps - Botswana Premier League
• ENCOFLOW - e-commerce handling 1M+ transactions

All built with Flutter and modern web technologies. Want details on any specific project?`;
    } else {
      smartResponse = `I can tell you about Mohammed's Flutter development experience, his work at Reon Capital, or his technical skills. He's built multiple mobile apps and web platforms. What interests you most?`;
    }

    return res.status(200).json({
      message: smartResponse,
      provider: 'Smart Fallback System',
      debug: 'Add API key for enhanced responses',
    });
  } catch (error) {
    console.error('Chat API error:', error);

    return res.status(200).json({
      message:
        "I'm Mohammed's AI assistant! I can tell you about his Flutter expertise, React development, and project experience. What would you like to know?",
      provider: 'Basic Fallback',
      error: String(error),
    });
  }
}
