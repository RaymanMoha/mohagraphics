import { NextApiRequest, NextApiResponse } from 'next';

// Portfolio context for AI
const portfolioPrompt = `Write naturally like a human. Use minimal bold formatting and clean structure.

You are Mohammed Abdirahman's intelligent AI assistant with comprehensive knowledge of his portfolio, skills, and experience.

ABOUT MOHAMMED:
- Frontend + Mobile Engineer with 5+ years professional experience
- Based in Nairobi, Kenya; open to remote and Kenya-based roles
- Builds web and mobile products with React, React Native, and Flutter
- Focused on performance, accessibility, and clean UI/UX delivery

TECHNICAL SKILLS:
Frontend: React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
Mobile: Flutter, Dart, React Native
Backend: Node.js, Python, REST APIs
Databases: PostgreSQL, MySQL, MongoDB, Firebase
Cloud: Vercel, Netlify, GCP, Docker

MAJOR PROJECTS:
- Budj merchant onboarding experience
- Reon Capital developer hub
- ENEVA utility manager
- Zuba Botswana Premier League apps
- OnSpace platform
- Conversation Lab website

HIGHLIGHTS:
- Delivered multi-platform products across web and mobile
- Translated Figma designs into responsive, accessible interfaces
- Comfortable collaborating across product, design, and engineering

CONTACT:
Phone: +254799722501
Website: https://www.mohagraphics.tech
Email: abdulmoharayman@gmail.com

Write conversational responses. Use simple bullet points when needed. Keep responses concise and engaging. End with a natural question.`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
        
        const cleanHistory = conversationHistory
          .slice(-4)
          .map((msg: any) => ({
            role: msg.role,
            content: msg.content
          }));

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [
              { role: 'system', content: portfolioPrompt },
              ...cleanHistory,
              { role: 'user', content: message }
            ],
            max_tokens: 350,
            temperature: 0.4,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Groq Success!');
          return res.status(200).json({ 
            message: data.choices[0]?.message?.content,
            provider: 'Groq (llama-3.1-8b-instant)',
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

    // Smart fallback responses
    const lowerMessage = message.toLowerCase();
    let smartResponse = '';

    if (lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
      smartResponse = `Hi! I'm Mohammed's AI assistant. He's a frontend and mobile engineer based in Nairobi with 5+ years of experience. What would you like to know about his work?`;
    } else if (lowerMessage.includes('skills') || lowerMessage.includes('tech')) {
      smartResponse = `Mohammed's main skills include:
• React & Next.js (frontend)
• Flutter, Dart & React Native (mobile apps)
• Node.js & Python (supporting backend)

He focuses on fast, accessible UI and clean, maintainable code. Which technology interests you?`;
    } else if (lowerMessage.includes('projects') || lowerMessage.includes('work')) {
      smartResponse = `Mohammed's recent projects:
• Budj - merchant onboarding flow
• ENEVA - utility management platform
• Zuba - Botswana Premier League apps
• Reon Capital Dev Hub

Built with modern web and mobile stacks. Want details on any specific project?`;
    } else {
      smartResponse = `I can tell you about Mohammed's frontend and mobile experience, his projects, or his technical skills. What would you like to know?`;
    }

    return res.status(200).json({ 
      message: smartResponse,
      provider: 'Smart Fallback System',
      debug: 'Add API key for enhanced responses'
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return res.status(200).json({ 
      message: "I'm Mohammed's AI assistant! I can tell you about his Flutter expertise, React development, and project experience. What would you like to know?",
      provider: 'Basic Fallback',
      error: String(error)
    });
  }
}
