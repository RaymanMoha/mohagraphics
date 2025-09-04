import { HighlightedWords } from '@/components/HighlightedWords';
import { SlidingButton } from '@/components/Landing/Buttons';
import { SEO } from '@/components/SEO';
import { 
  Hero, 
  Section, 
  Projects, 
  SectionTag, 
  Tags, 
  Header, 
  Paragraph,
  colors,
  HeroP
} from '@/styles/components';
import styled from 'styled-components';
import Link from 'next/link';

const BlogPage = () => {
  const blogPosts = [
    {
      category: "WEB DEVELOPMENT",
      title: "**How to Hire the Right Frontend Developer in 2025",
      excerpt: "Complete guide for startups and businesses looking to hire frontend developers. Learn what to look for, interview questions to ask, and red flags to avoid when building your development team.",
      keywords: ["Hire Frontend Developer", "React Developer", "Interview Questions", "Startup Team", "Remote Developer"],
      readTime: "8 min read",
      publishDate: "Sep 3, 2025",
      slug: "hire-frontend-developer-2025",
      featured: true
    },
    {
      category: "AI DEVELOPMENT",
      title: "**Adding AI Chat to Your Website: Complete Guide",
      excerpt: "Step-by-step tutorial on integrating AI chat assistants into your website. Boost user engagement and provide 24/7 customer support with modern AI technology.",
      keywords: ["AI Chat Integration", "Website Chatbot", "Customer Support AI", "User Engagement", "AI Development"],
      readTime: "12 min read",
      publishDate: "Sep 2, 2025",
      slug: "ai-chat-website-integration",
      featured: true
    },
    {
      category: "MOBILE DEVELOPMENT",
      title: "**React Native vs Flutter: Which to Choose in 2025",
      excerpt: "Comprehensive comparison of React Native and Flutter for mobile app development. Performance, cost, development time, and real-world case studies included.",
      keywords: ["React Native", "Flutter", "Mobile App Development", "Cross Platform", "App Performance"],
      readTime: "15 min read",
      publishDate: "Sep 1, 2025",
      slug: "react-native-vs-flutter-2025",
      featured: false
    },
    {
      category: "INTERVIEW PREP",
      title: "**React Interview Cheatsheet: Master Frontend Interviews",
      excerpt: "Complete React interview cheatsheet covering hooks, DOM, props, state management, lifecycle methods, and advanced concepts. Master React fundamentals for technical interviews at top tech companies.",
      keywords: ["React Interview", "Frontend Interview", "React Hooks", "JavaScript", "Technical Interview"],
      readTime: "10 min read",
      publishDate: "Dec 1, 2020",
      slug: "react-cheatsheet",
      featured: true
    },
    {
      category: "INTERVIEW PREP",
      title: "**JavaScript Cheatsheet: Essential Concepts for Developers",
      excerpt: "Complete JavaScript interview cheatsheet with code examples. Master ES6+, async programming, array methods, operators, and common interview questions. Essential guide for frontend developers.",
      keywords: ["JavaScript", "Interview Prep", "ES6", "Frontend Development", "Coding Interview"],
      readTime: "8 min read",
      publishDate: "Dec 10, 2020",
      slug: "javascript-cheatsheet",
      featured: false
    },
    {
      category: "CLOUD DEVELOPMENT",
      title: "**Put Your Resume on the Cloud: Complete AWS Guide",
      excerpt: "Build a cloud-native portfolio website using AWS services. Learn serverless architecture, continuous deployment, and modern web infrastructure. Complete guide to the Cloud Resume Challenge with real visitor analytics.",
      keywords: ["AWS", "Cloud Resume", "Serverless", "Portfolio", "Cloud Architecture"],
      readTime: "12 min read",
      publishDate: "Dec 19, 2020",
      slug: "cloud-resume",
      featured: false
    },
    {
      category: "DATA VISUALIZATION",
      title: "**Prof G: Sprinters Around The World",
      excerpt: "This past week many of us have spent a little too much time staring at maps. An electoral map shows division by default. I want to show you a map that shows quite the opposite.",
      keywords: ["Data Visualization", "Maps", "Prof G", "Community", "Global Collaboration"],
      readTime: "5 min read",
      publishDate: "Nov 9, 2020",
      slug: "prof-g-map",
      featured: false
    }
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 6);

  return (
    <>
      <SEO
        title="Developer Blog | Frontend Development | AI Integration | Mobile Apps - Mohammed Abdirahman"
        description="Expert insights on frontend development, AI integration, mobile app development, and startup tech strategy. Practical guides for hiring developers, building applications, and growing your tech business in 2025."
        lang="en"
        thumb="/img/mohammed.jpeg"
        keywords={[
          'frontend developer blog',
          'hire frontend developer',
          'AI chat integration',
          'React development guide',
          'mobile app development',
          'startup CTO advice',
          'freelance developer rates',
          'web development tutorials',
          'UI/UX best practices',
          'e-commerce development',
          'developer productivity',
          'technical co-founder',
          'React Native vs Flutter',
          'website performance optimization',
          'conversion rate optimization',
          'developer interview questions',
          'startup tech strategy',
          'remote developer hiring',
          'software development blog',
          'web development insights',
          'modern web technologies',
          'JavaScript frameworks',
          'TypeScript development',
          'Next.js tutorials',
          'developer career advice',
          'coding best practices',
          'software architecture',
          'API development',
          'database design',
          'cloud deployment',
          'DevOps practices'
        ]}
      />
      
      <ResponsiveSection>
        <Hero invert={false}>
          <HighlightedWords title={"**Developer Insights** & Tech Strategy"} />
        </Hero>
        <HeroP>
          Practical guides for building better applications, hiring the right developers, and making smart tech decisions. 
          Written by a frontend developer with real-world startup and enterprise experience.
        </HeroP>

        {/* Featured Articles */}
        <FeaturedSection>
          <SectionTitle>
            <HighlightedWords title={"**Featured** Articles"} />
          </SectionTitle>
          <FeaturedGrid>
            {featuredPosts.map((post, i) => (
              <FeaturedCard key={`featured-${i}`}>
                <SectionTag className="featured">{post.category}</SectionTag>
                <Header>
                  <HighlightedWords title={post.title} />
                </Header>
                <BlogMeta>
                  <span>{post.publishDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </BlogMeta>
                <Paragraph>{post.excerpt}</Paragraph>
                <Tags>
                  {post.keywords.slice(0, 3).map((keyword: string, i: number) => (
                    <li key={`keyword-${i}`}>{keyword}</li>
                  ))}
                </Tags>
                <BlogButton>
                  <SlidingButton buttonText="Read Full Article" link={`/blog/${post.slug}`} />
                </BlogButton>
              </FeaturedCard>
            ))}
          </FeaturedGrid>
        </FeaturedSection>

        {/* Recent Articles */}
        <BlogSection>
          <SectionTitle>
            <HighlightedWords title={"**Latest** Articles"} />
          </SectionTitle>
          <BlogGrid>
            {recentPosts.map((post, i) => {
              const { category, title, excerpt, keywords, readTime, publishDate, slug } = post;

              return (
                <BlogCard key={`blog-${i}`}>
                  <SectionTag className="category">{category}</SectionTag>
                  
                  <Header>
                    <HighlightedWords title={title} />
                  </Header>

                  <BlogMeta>
                    <span>{publishDate}</span>
                    <span>•</span>
                    <span>{readTime}</span>
                  </BlogMeta>

                  <Paragraph>{excerpt}</Paragraph>

                  <Tags>
                    {keywords.slice(0, 4).map((keyword: string, i: number) => (
                      <li key={`keyword-${i}`}>{keyword}</li>
                    ))}
                  </Tags>

                  <BlogButton>
                    <SlidingButton buttonText="Read More" link={`/blog/${slug}`} />
                  </BlogButton>
                </BlogCard>
              );
            })}
          </BlogGrid>
        </BlogSection>

        {/* Newsletter Signup */}
        <NewsletterSection>
          <NewsletterContent>
            <div style={{ textAlign: 'center', flex: '1', minWidth: '300px' }}>
              <Hero invert={false}>
                <HighlightedWords title={"Get **weekly** insights"} />
              </Hero>
              <HeroP style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Join 1,000+ developers and founders getting actionable tech insights every Tuesday. 
                No spam, just practical advice for building better applications.
              </HeroP>
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <SlidingButton buttonText="Subscribe to Newsletter" link="https://calendly.com/abdulmoharayman/30min" />
              </div>
            </div>
            <NewsletterGif
              src="img\herogifo2.gif"
              alt="Developer working animation"
            />
          </NewsletterContent>
        </NewsletterSection>
      </ResponsiveSection>
    </>
  );
};

// Styled Components
const ResponsiveSection = styled(Section)`
  padding: 0 clamp(1rem, 5vw, 2rem);
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  margin: 4rem 0 2rem 0;
  text-align: center;
  
  h1 {
    font-size: clamp(2.5rem, 5vw, 4rem) !important;
    line-height: 1.2 !important;
    margin: 0 !important;
    font-weight: 700 !important;
    letter-spacing: -0.02em !important;
  }
  
  @media (max-width: 768px) {
    margin: 2rem 0 1.5rem 0;
    
    h1 {
      font-size: clamp(2rem, 6vw, 3rem) !important;
      line-height: 1.3 !important;
    }
  }
  
  @media (max-width: 480px) {
    margin: 1.5rem 0 1rem 0;
    
    h1 {
      font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
      line-height: 1.3 !important;
    }
  }
  
  @media (max-width: 360px) {
    h1 {
      font-size: clamp(1.6rem, 8vw, 2rem) !important;
    }
  }
`;

const FeaturedSection = styled.div`
  margin: 4rem 0;
  
  @media (max-width: 768px) {
    margin: 2rem 0;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeaturedCard = styled.div`
  background: linear-gradient(135deg, ${colors.accent}08, ${colors.background}05);
  border: 2px solid ${colors.accent}20;
  border-radius: 15px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${colors.accent}40;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
  
  h1 {
    font-size: 1.6rem;
    margin: 1rem 0;
    line-height: 1.3;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.6;
    color: ${colors.grey};
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 10px;
    
    h1 {
      font-size: 1.3rem;
      margin: 0.8rem 0;
      line-height: 1.2;
    }
    
    p {
      font-size: 0.9rem;
      line-height: 1.5;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    
    h1 {
      font-size: 1.1rem;
      margin: 0.6rem 0;
      line-height: 1.2;
    }
    
    p {
      font-size: 0.85rem;
      line-height: 1.4;
    }
  }
`;

const BlogSection = styled.div`
  margin: 4rem 0;
  
  @media (max-width: 768px) {
    margin: 2rem 0;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  margin-bottom: 2rem;
  padding: 2rem;
  border-radius: 15px;
  background: linear-gradient(135deg, ${colors.background}02, ${colors.accent}02);
  border: 1px solid ${colors.accent}10;
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.08);
    border-color: ${colors.accent}20;
  }
  
  h1 {
    font-size: 1.4rem;
    margin: 1rem 0;
    line-height: 1.3;
  }
  
  p {
    font-size: 0.95rem;
    font-weight: 400;
    line-height: 1.6;
    color: ${colors.grey};
    margin: 1rem 0;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    
    h1 {
      font-size: 1.2rem;
      margin: 0.8rem 0;
      line-height: 1.2;
    }
    
    p {
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0.8rem 0;
    }
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    
    h1 {
      font-size: 1.1rem;
      margin: 0.6rem 0;
    }
    
    p {
      font-size: 0.85rem;
      margin: 0.6rem 0;
    }
  }
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${colors.faded};
  margin: 0.5rem 0 1rem 0;
  
  span {
    &:nth-child(2) {
      color: ${colors.accent};
    }
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const BlogButton = styled.div`
  margin-top: auto;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const NewsletterSection = styled.div`
  background: linear-gradient(135deg, ${colors.background}05, ${colors.accent}05);
  border-radius: 20px;
  border: 1px solid ${colors.accent}20;
  margin: 4rem 0;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    margin: 2rem 0;
    padding: 2rem 1rem;
    border-radius: 15px;
  }
`;

const NewsletterContent = styled.div`
  position: 'relative';
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const NewsletterGif = styled.img`
  width: 300px;
  height: 250px;
  z-index: 0;
  opacity: 0.9;
  border-radius: 10px;
  flex: 0 0 auto;
  
  @media (max-width: 768px) {
    width: 250px;
    height: 200px;
  }
  
  @media (max-width: 480px) {
    width: 200px;
    height: 150px;
  }
`;

export default BlogPage;
