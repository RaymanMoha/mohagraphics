import { NextApiRequest, NextApiResponse } from 'next';
import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face with your API key (get free key from https://huggingface.co/settings/tokens)
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Enhanced portfolio context data - customize this with your actual information
const portfolioContext = {
  name: "Mohammed Abdirahman",
  title: "Frontend & Mobile Engineer",
  skills: [
    "React", "Next.js", "TypeScript", "JavaScript", "React Native", "Flutter",
    "Dart", "HTML", "CSS", "Tailwind CSS", "Styled Components", "Node.js",
    "Python", "REST APIs", "MongoDB", "PostgreSQL", "Firebase", "Docker"
  ],
  experience: [
    "5+ years building frontend and mobile applications",
    "Specialized in React, React Native, and Flutter",
    "Strong background in responsive design and accessibility",
    "Collaborative across product, design, and engineering"
  ],
  projects: [
    "Budj merchant onboarding experience",
    "Reon Capital developer hub",
    "ENEVA utility manager",
    "Zuba Botswana Premier League apps",
    "OnSpace platform",
    "Conversation Lab website",
    "Yala Pay website"
  ],
  education: "ALX software engineering program",
  location: "Nairobi, Kenya (open to remote and Kenya-based roles)",
  specialization: "Building fast, accessible web and mobile experiences",
  interests: ["Performance optimization", "Design systems", "Developer experience"],
  contact: "Email: abdulmoharayman@gmail.com · Phone: +254799722501"
};

// Enhanced fallback responses with intelligent question analysis
const getFallbackResponse = (message: string, conversationHistory: any[] = []): string => {
  const lowerMessage = message.toLowerCase();
  const context = portfolioContext;

  // Advanced question analysis for complex queries
  if (lowerMessage.includes('approach') || lowerMessage.includes('how would')) {
    if (lowerMessage.includes('e-commerce') || lowerMessage.includes('ecommerce') || lowerMessage.includes('shop')) {
      return `Mohammed would approach an e-commerce platform systematically: 1) **Frontend**: React/Next.js for fast, SEO-friendly pages 2) **Backend**: Node.js with Express for APIs, PostgreSQL for transactions 3) **Payments**: Stripe integration for secure checkout 4) **Scalability**: caching and CDN for assets 5) **Performance**: code splitting, lazy loading, optimized images. He prioritizes user experience and performance in every step.`;
    }
    
    if (lowerMessage.includes('scalable') || lowerMessage.includes('scale')) {
      return `Mohammed's approach to scalable applications: 1) **Architecture**: clear service boundaries and containerization 2) **Database**: PostgreSQL with indexing and caching 3) **Frontend**: React with code splitting and lazy loading 4) **API**: efficient REST or GraphQL 5) **Infrastructure**: Vercel/GCP with autoscaling 6) **Monitoring**: performance tracking and error logging. He focuses on reliability and smooth user experience.`;
    }
    
    if (lowerMessage.includes('performance') || lowerMessage.includes('optimize')) {
      return `Mohammed's performance optimization strategy: 1) **Code**: tree shaking, code splitting, lazy loading 2) **Images**: WebP/AVIF, responsive images, CDN 3) **Caching**: browser caching and API caching 4) **Database**: query optimization and indexing 5) **Monitoring**: Lighthouse audits and Core Web Vitals tracking.`;
    }
  }

  // Technical comparison questions
  if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('versus')) {
    if (lowerMessage.includes('frontend') && lowerMessage.includes('backend')) {
      return `Mohammed's skillset comparison: **Frontend (Strong)**: ${context.skills.slice(0, 4).join(', ')} with 5+ years building interfaces. **Backend (Supporting)**: Node.js, Python, database design for API work. He's strongest in frontend and mobile, with experience across ${context.projects.length} production projects.`;
    }
  }

  // What makes different questions
  if (lowerMessage.includes('different') || lowerMessage.includes('unique') || lowerMessage.includes('special')) {
    return `What sets Mohammed apart: 1) **Performance Focus**: Optimizes UX and loading speed 2) **Frontend & Mobile Depth**: React, React Native, and Flutter expertise 3) **Design Sense**: UI/UX skills make his apps both functional and clean 4) **Modern Stack**: Next.js, TypeScript, modern tooling 5) **Problem Solver**: ${context.experience[0]}. He combines technical skill with design thinking.`;
  }

  // Project-specific questions
  if (lowerMessage.includes('project') && (lowerMessage.includes('example') || lowerMessage.includes('built') || lowerMessage.includes('work'))) {
    return `Mohammed's notable projects include: **Budj** (merchant onboarding), **ENEVA** (utility manager), **Zuba** (BPL apps), and **Reon Capital Dev Hub**. Each project showcases frontend and mobile delivery, clean UI, and solid UX. Check his portfolio for live demos and details.`;
  }

  // Technology-specific deep dives
  if (lowerMessage.includes('react') && (lowerMessage.includes('experience') || lowerMessage.includes('skill'))) {
    return `Mohammed's React expertise spans 5+ years: **Core**: Hooks, Context, state management **Advanced**: Next.js, TypeScript integration **Performance**: code splitting, memoization, lazy loading **Testing**: React Testing Library **Styling**: Styled Components, Tailwind CSS **Projects**: Multiple production React apps with modern patterns.`;
  }

  if (lowerMessage.includes('typescript') || lowerMessage.includes('ts')) {
    return `Mohammed uses TypeScript extensively: **Benefits**: fewer runtime bugs, stronger IDE support **Experience**: multiple years in production apps **Advanced Features**: Generics, utility types, strict mode **Integration**: React components, APIs, shared types.`;
  }

  // Simple greetings with more personality
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! 👋 I'm Mohammed's AI assistant. I can discuss his ${context.experience[0]} in detail, his React/Flutter experience, or specific project examples. What interests you most about his work?`;
  }

  // Default intelligent response
  return `Great question! I can provide insights about Mohammed's approach to: **Technical Architecture**, **Technology Stack** (React, React Native, Flutter), **Project Examples** (Budj, ENEVA, Zuba), or **Performance Optimization**. What specific aspect would you like to explore?`;
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
