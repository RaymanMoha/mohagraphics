import { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face with your API key (get free key from https://huggingface.co/settings/tokens)
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Enhanced portfolio context data - customize this with your actual information
const portfolioContext = {
  name: "Mohammed Abdirahman",
  title: "Full-Stack Developer & UI/UX Designer",
  skills: [
    "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", 
    "UI/UX Design", "Tailwind CSS", "Styled Components", "GraphQL", 
    "MongoDB", "PostgreSQL", "AWS", "Docker"
  ],
  experience: [
    "3+ years of full-stack development",
    "Specialized in modern web applications",
    "Experience with cloud deployment and DevOps",
    "Strong background in responsive design"
  ],
  projects: [
    "Zuba BPL platform with React Native and real-time features",
    "Insurance widget platform with React and TypeScript",
    "E-commerce platforms with React and Node.js",
    "Real-time chat applications",
    "Portfolio websites and landing pages",
    "Mobile-responsive web applications",
    "Database-driven applications"
  ],
  education: "Computer Science background with focus on software engineering",
  location: "Available for remote work worldwide",
  specialization: "Creating modern, scalable web applications with excellent user experience",
  interests: ["Web3 development", "AI/ML integration", "Performance optimization"],
  contact: "Available through portfolio contact form or professional networks"
};

// Enhanced fallback responses with intelligent question analysis
const getFallbackResponse = (message: string, conversationHistory: any[] = []): string => {
  const lowerMessage = message.toLowerCase();
  const context = portfolioContext;

  // Advanced question analysis for complex queries
  if (lowerMessage.includes('approach') || lowerMessage.includes('how would')) {
    if (lowerMessage.includes('e-commerce') || lowerMessage.includes('ecommerce') || lowerMessage.includes('shop')) {
      return `Mohammed would approach an e-commerce platform systematically: 1) **Frontend**: React/Next.js for fast, SEO-friendly pages 2) **Backend**: Node.js with Express for APIs, PostgreSQL for transactions 3) **Payments**: Stripe integration for secure payments 4) **Scalability**: Redis caching, CDN for images, microservices architecture 5) **Performance**: Code splitting, lazy loading, optimized images. His experience with similar projects shows he prioritizes user experience and performance optimization.`;
    }
    
    if (lowerMessage.includes('scalable') || lowerMessage.includes('scale')) {
      return `Mohammed's approach to scalable applications: 1) **Architecture**: Microservices with Docker containers 2) **Database**: PostgreSQL with read replicas, Redis caching 3) **Frontend**: React with code splitting and lazy loading 4) **API**: GraphQL for efficient data fetching 5) **Infrastructure**: AWS/Vercel with auto-scaling 6) **Monitoring**: Performance tracking and error logging. His portfolio shows applications handling thousands of users efficiently.`;
    }
    
    if (lowerMessage.includes('performance') || lowerMessage.includes('optimize')) {
      return `Mohammed's performance optimization strategy: 1) **Code**: Tree shaking, code splitting, lazy loading 2) **Images**: WebP format, responsive images, CDN 3) **Caching**: Redis for data, browser caching for assets 4) **Database**: Query optimization, indexing, connection pooling 5) **Monitoring**: Lighthouse audits, Core Web Vitals tracking. He's achieved 40% performance improvements in past projects.`;
    }
  }

  // Technical comparison questions
  if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('versus')) {
    if (lowerMessage.includes('frontend') && lowerMessage.includes('backend')) {
      return `Mohammed's skillset comparison: **Frontend (Strong)**: ${context.skills.slice(0, 4).join(', ')} - 3+ years React experience, responsive design expert. **Backend (Solid)**: Node.js, Python, database design - builds scalable APIs and handles complex data flows. He's stronger on frontend but very capable full-stack, with experience in ${context.projects.length} production applications combining both.`;
    }
  }

  // What makes different questions
  if (lowerMessage.includes('different') || lowerMessage.includes('unique') || lowerMessage.includes('special')) {
    return `What sets Mohammed apart: 1) **Performance Focus**: Consistently improves app performance by 30-40% 2) **Full-Stack Expertise**: Strong in both frontend (React ecosystem) and backend (Node.js/Python) 3) **Design Sense**: UI/UX skills make his apps both functional and beautiful 4) **Modern Stack**: Uses latest technologies like Next.js, TypeScript, GraphQL 5) **Problem Solver**: ${context.experience[0]} with complex web applications. He combines technical skill with design thinking.`;
  }

  // Project-specific questions
  if (lowerMessage.includes('project') && (lowerMessage.includes('example') || lowerMessage.includes('built') || lowerMessage.includes('work'))) {
    return `Mohammed's notable projects include: **E-commerce Platform** (React, Node.js, Stripe integration) serving 1000+ customers, **Real-time Chat App** (WebSocket, Redis) with instant messaging, **Portfolio Sites** (Gatsby, GraphQL) with 90+ performance scores. Each project showcases different skills: payment processing, real-time features, performance optimization. Check his portfolio for live demos and code examples.`;
  }

  // Technology-specific deep dives
  if (lowerMessage.includes('react') && (lowerMessage.includes('experience') || lowerMessage.includes('skill'))) {
    return `Mohammed's React expertise spans 3+ years: **Core**: Hooks, Context, Redux for state management **Advanced**: Server-side rendering with Next.js, TypeScript integration **Performance**: Code splitting, memoization, lazy loading **Testing**: Jest, React Testing Library **Styling**: Styled Components, Tailwind CSS **Projects**: Built 5+ production React apps with modern patterns and best practices.`;
  }

  if (lowerMessage.includes('typescript') || lowerMessage.includes('ts')) {
    return `Mohammed uses TypeScript extensively: **Benefits**: Catches 60% of bugs before runtime, better IDE support **Experience**: 2+ years in production apps **Advanced Features**: Generics, utility types, strict mode **Integration**: React components, Node.js backends, API typing **Projects**: All recent projects use TypeScript for better code quality and developer experience.`;
  }

  // Simple greetings with more personality
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! 👋 I'm Mohammed's intelligent AI assistant. I can discuss his ${context.experience} in detail - like how he'd build scalable systems, his React expertise, performance optimization techniques, or specific project examples. What interests you most about his work?`;
  }

  // Default intelligent response
  return `Great question! I can provide detailed insights about Mohammed's approach to: **Technical Architecture** (how he builds scalable systems), **Technology Stack** (React, Next.js, Node.js expertise), **Project Examples** (e-commerce, chat apps, portfolios), **Performance Optimization** (40% improvements achieved), or **Problem-Solving** approach. What specific aspect would you like to explore?`;
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

    // If no API key is provided, use fallback
    if (!process.env.HUGGINGFACE_API_KEY) {
      const fallbackResponse = getFallbackResponse(message, conversationHistory);
      return res.status(200).json({ message: fallbackResponse });
    }

    // Build intelligent conversation context
    const systemPrompt = `You are an intelligent AI assistant representing ${portfolioContext.name}, a ${portfolioContext.title}.

ABOUT MOHAMMED:
- Skills: ${portfolioContext.skills.join(', ')}
- Experience: ${portfolioContext.experience.join('; ')}
- Projects: ${portfolioContext.projects.join('; ')}
- Education: ${portfolioContext.education}
- Specialization: ${portfolioContext.specialization}
- Location: ${portfolioContext.location}
- Interests: ${portfolioContext.interests.join(', ')}
- Contact: ${portfolioContext.contact}

INSTRUCTIONS:
- Be helpful, professional, and engaging
- Provide specific details about Mohammed's skills and experience
- If asked about projects, mention specific technologies used
- For technical questions, provide detailed explanations
- If asked about availability, mention he's open to opportunities
- Keep responses concise but informative (2-3 sentences max)
- If asked about non-portfolio topics, politely redirect to professional topics`;

    try {
      // Try Hugging Face API first
      const response = await hf.chatCompletion({
        model: "microsoft/DialoGPT-medium",
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory.slice(-4), // Keep last 4 messages for context
          { role: "user", content: message }
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      let aiResponse = response.choices[0]?.message?.content?.trim();

      // Clean up response
      if (!aiResponse || aiResponse.length < 10) {
        throw new Error('No valid response from AI');
      }

      return res.status(200).json({ message: aiResponse });

    } catch (aiError) {
      console.log('AI API failed, using fallback:', aiError);
      // Use fallback if AI API fails
      const fallbackResponse = getFallbackResponse(message, conversationHistory);
      return res.status(200).json({ message: fallbackResponse });
    }

  } catch (error) {
    console.error('Chat API error:', error);
    const errorResponse = getFallbackResponse(req.body.message || '', req.body.conversationHistory || []);
    res.status(200).json({ message: errorResponse });
  }
}
