import { NextApiRequest, NextApiResponse } from 'next';

// Enhanced AI Chat with multiple providers
interface AIProvider {
  name: string;
  generateResponse: (prompt: string, history: any[]) => Promise<string>;
}

// Portfolio context with comprehensive information
const portfolioContext = {
  name: "Mohammed Abdirahman",
  title: "Full-Stack Developer & UI/UX Designer",
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Vue.js", "Angular"],
    backend: ["Node.js", "Python", "Express", "FastAPI", "GraphQL", "REST APIs"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    cloud: ["AWS", "Vercel", "Netlify", "Digital Ocean", "Docker"],
    design: ["Figma", "Adobe XD", "UI/UX Design", "Responsive Design"],
    tools: ["Git", "VS Code", "Webpack", "Vite", "Jest", "Cypress"]
  },
  experience: {
    years: "3+",
    highlights: [
      "Led development of 5+ production web applications",
      "Specialized in React ecosystem and modern JavaScript",
      "Experience with agile development and CI/CD",
      "Strong focus on performance optimization and accessibility"
    ]
  },
  projects: [
    {
      name: "Zuba BPL Platform",
      tech: ["React Native", "Flutter", "Node.js", "Firebase", "MongoDB"],
      description: "Comprehensive Botswana Premier League platform with fan engagement and steward management apps"
    },
    {
      name: "E-commerce Platform",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      description: "Full-stack e-commerce solution with payment integration"
    },
    {
      name: "Real-time Chat App",
      tech: ["Next.js", "WebSocket", "Redis", "PostgreSQL"],
      description: "Scalable chat application with real-time messaging"
    },
    {
      name: "Portfolio Websites",
      tech: ["React", "Gatsby", "Styled Components", "GraphQL"],
      description: "Multiple responsive portfolio sites for clients"
    }
  ],
  achievements: [
    "Improved application performance by 40% through optimization",
    "Built responsive designs that work across all devices",
    "Implemented automated testing reducing bugs by 60%"
  ]
};

// OpenAI provider (if available)
const openAIProvider: AIProvider = {
  name: "OpenAI",
  generateResponse: async (prompt: string, history: any[]) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: prompt },
          ...history.slice(-6),
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }
};

// Cohere provider (free tier available)
const cohereProvider: AIProvider = {
  name: "Cohere",
  generateResponse: async (prompt: string, history: any[]) => {
    const conversation = history.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    const fullPrompt = `${prompt}\n\nConversation:\n${conversation}\n\nAssistant:`;

    const response = await fetch('https://api.cohere.ai/v1/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'command-light',
        prompt: fullPrompt,
        max_tokens: 150,
        temperature: 0.7,
        stop_sequences: ['User:', 'Human:']
      }),
    });

    const data = await response.json();
    return data.generations[0]?.text?.trim() || '';
  }
};

// Advanced fallback with context awareness
const getIntelligentFallback = (message: string, history: any[]): string => {
  const lowerMessage = message.toLowerCase();
  const context = portfolioContext;

  // Analyze conversation history for better context
  const recentTopics = history.slice(-3).map(msg => msg.content.toLowerCase()).join(' ');

  // Greetings with personality
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hello! 👋 I'm Mohammed's AI assistant with deep knowledge about his ${context.experience.years} years of development experience. I can discuss his expertise in ${context.skills.frontend.slice(0, 3).join(', ')}, his ${context.projects.length} major projects, or his technical achievements. What interests you most?`;
  }

  // Technical skills with detailed breakdown
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
    if (lowerMessage.includes('frontend') || recentTopics.includes('react')) {
      return `Mohammed's frontend expertise includes ${context.skills.frontend.join(', ')}. He's particularly strong in React ecosystem with ${context.experience.years} years of experience building production applications.`;
    }
    if (lowerMessage.includes('backend') || lowerMessage.includes('server')) {
      return `For backend development, Mohammed uses ${context.skills.backend.join(', ')}. He's built scalable APIs and worked with databases like ${context.skills.databases.slice(0, 3).join(', ')}.`;
    }
    return `Mohammed has a comprehensive tech stack: Frontend (${context.skills.frontend.slice(0, 3).join(', ')}), Backend (${context.skills.backend.slice(0, 3).join(', ')}), and Cloud (${context.skills.cloud.slice(0, 3).join(', ')}). Which area interests you?`;
  }

  // Project details with specific examples
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
    const randomProject = context.projects[Math.floor(Math.random() * context.projects.length)];
    return `Mohammed has built ${context.projects.length} major projects. For example, his ${randomProject.name} using ${randomProject.tech.join(', ')} - ${randomProject.description}. He's also ${context.achievements[0].toLowerCase()}. Want to hear about other projects?`;
  }

  // Experience with achievements
  if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
    return `Mohammed has ${context.experience.years} years of professional development experience. Key highlights: ${context.experience.highlights[0]}, and he's ${context.achievements[1].toLowerCase()}. He specializes in modern web technologies and performance optimization.`;
  }

  // Intelligent default with conversation awareness
  if (recentTopics.includes('react') || recentTopics.includes('frontend')) {
    return `Since we were discussing frontend tech, Mohammed is an expert React developer who's ${context.achievements[0].toLowerCase()}. He uses modern tools like ${context.skills.frontend.slice(0, 4).join(', ')}. Any specific questions about his React experience?`;
  }

  return `I'm Mohammed's intelligent AI assistant! I have detailed knowledge about his ${context.experience.years} years of experience, ${context.projects.length} major projects, and expertise across ${Object.keys(context.skills).length} technology areas. What would you like to explore? His technical skills, project examples, or professional achievements?`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Enhanced system prompt with detailed context
    const systemPrompt = `You are an intelligent AI assistant representing ${portfolioContext.name}, a ${portfolioContext.title} with ${portfolioContext.experience.years} years of experience.

COMPREHENSIVE PORTFOLIO DATA:
Frontend Skills: ${portfolioContext.skills.frontend.join(', ')}
Backend Skills: ${portfolioContext.skills.backend.join(', ')}
Databases: ${portfolioContext.skills.databases.join(', ')}
Cloud & DevOps: ${portfolioContext.skills.cloud.join(', ')}
Design: ${portfolioContext.skills.design.join(', ')}

EXPERIENCE: ${portfolioContext.experience.highlights.join('; ')}

MAJOR PROJECTS:
${portfolioContext.projects.map(p => `- ${p.name}: ${p.description} (${p.tech.join(', ')})`).join('\n')}

ACHIEVEMENTS: ${portfolioContext.achievements.join('; ')}

PERSONALITY: Be enthusiastic, knowledgeable, and helpful. Provide specific details and examples. Ask follow-up questions to keep conversation engaging.`;

    // Try available AI providers in order of preference
    const providers = [];

    if (process.env.OPENAI_API_KEY) providers.push(openAIProvider);
    if (process.env.COHERE_API_KEY) providers.push(cohereProvider);

    for (const provider of providers) {
      try {
        const aiResponse = await provider.generateResponse(systemPrompt, [
          ...conversationHistory.slice(-4),
          { role: 'user', content: message }
        ]);

        if (aiResponse && aiResponse.length > 10) {
          console.log(`Using ${provider.name} for response`);
          return res.status(200).json({ 
            message: aiResponse,
            provider: provider.name
          });
        }
      } catch (error) {
        console.log(`${provider.name} failed, trying next provider:`, error);
        continue;
      }
    }

    // Use intelligent fallback if all AI providers fail
    const fallbackResponse = getIntelligentFallback(message, conversationHistory);
    return res.status(200).json({ 
      message: fallbackResponse,
      provider: 'Intelligent Fallback'
    });

  } catch (error) {
    console.error('Advanced chat API error:', error);
    const fallbackResponse = getIntelligentFallback(req.body.message || '', req.body.conversationHistory || []);
    res.status(200).json({
      message: fallbackResponse,
      provider: 'Error Fallback'
    });
  }
}
