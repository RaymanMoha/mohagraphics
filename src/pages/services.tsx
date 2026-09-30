import { SEO } from '@/components/SEO';
import { colors } from '@/styles/components';
import Link from 'next/link';
import styled from 'styled-components';

const services = [
  {
    title: 'Startup MVP builds',
    body: 'Launch investor-ready web and mobile products with clean onboarding, payments, dashboards, and analytics foundations.',
    proof: 'React, Next.js, React Native, Flutter, TypeScript',
  },
  {
    title: 'Product redesigns',
    body: 'Turn slow or confusing interfaces into polished flows that help users complete the action you need from them.',
    proof: 'UX audits, responsive UI, design systems, accessibility',
  },
  {
    title: 'Conversion websites',
    body: 'Build a fast portfolio, SaaS, service, or product site with clear positioning, SEO basics, and lead capture.',
    proof: 'Landing pages, case studies, SEO, analytics, Vercel',
  },
];

const outcomes = [
  'A focused offer and page structure built around real buyer intent',
  'Mobile-first UI that loads quickly and makes contact obvious',
  'Production code that is easy to maintain after launch',
  'Analytics events for calls, emails, bookings, and key CTAs',
];

const faqs = [
  {
    q: 'Can you take over an existing project?',
    a: 'Yes. I usually start with a quick audit, then fix the highest-impact issues before adding new features.',
  },
  {
    q: 'Do you work with non-technical founders?',
    a: 'Yes. I can help shape the scope, define the first release, and translate the product idea into a build plan.',
  },
  {
    q: 'Where are you based?',
    a: 'I am based in Nairobi, Kenya and work with local and remote clients.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Moha Graphics',
  url: 'https://www.mohagraphics.tech/services',
  image: 'https://www.mohagraphics.tech/img/mohammed.jpeg',
  description:
    'Frontend and mobile development services for startups and growing teams that need React, Next.js, React Native, Flutter, UX, and conversion-focused websites.',
  areaServed: ['Kenya', 'Africa', 'Remote'],
  founder: {
    '@type': 'Person',
    name: 'Mohammed Abdirahman',
    jobTitle: 'Frontend and Mobile Engineer',
  },
  serviceType: [
    'Frontend development',
    'Mobile app development',
    'Website redesign',
    'MVP development',
    'Conversion optimization',
  ],
  email: 'abdulmoharayman@gmail.com',
  telephone: '+254799722501',
};

const Services = () => {
  return (
    <>
      <SEO
        title="Hire a Frontend & Mobile Developer in Kenya | Moha Graphics"
        description="Hire Mohammed Abdirahman for React, Next.js, React Native, Flutter, product redesigns, MVP builds, and conversion-focused websites for startups and growing teams."
        lang="en"
        thumb="/img/mohammed.jpeg"
        canonical="https://www.mohagraphics.tech/services"
        keywords={[
          'hire frontend developer kenya',
          'react developer kenya',
          'next.js developer',
          'react native developer',
          'flutter developer',
          'mobile app developer kenya',
          'startup mvp developer',
          'website redesign kenya',
          'conversion website developer',
          'nairobi software developer',
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Page>
        <HeroSection>
          <Eyebrow>Frontend, mobile, and product UI development</Eyebrow>
          <h1>Launch a sharper product and turn more visitors into clients.</h1>
          <Lead>
            I help founders, agencies, and growing teams ship polished web and
            mobile experiences with React, Next.js, React Native, and Flutter.
          </Lead>
          <Actions>
            <PrimaryCta href="https://calendly.com/abdulmoharayman/30min">
              Book a project call
            </PrimaryCta>
            <SecondaryCta href="mailto:abdulmoharayman@gmail.com">
              Email the brief
            </SecondaryCta>
          </Actions>
          <TrustLine>
            Nairobi-based, remote-friendly, available for MVPs, redesigns, and
            long-term product work.
          </TrustLine>
        </HeroSection>

        <Section>
          <SectionHeader>
            <span>Services</span>
            <h2>Built for teams that need momentum, not noise.</h2>
          </SectionHeader>
          <Cards>
            {services.map((service) => (
              <ServiceCard key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <small>{service.proof}</small>
              </ServiceCard>
            ))}
          </Cards>
        </Section>

        <Band>
          <SectionHeader>
            <span>What improves</span>
            <h2>Practical outcomes that help buyers say yes.</h2>
          </SectionHeader>
          <OutcomeGrid>
            {outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </OutcomeGrid>
        </Band>

        <Section>
          <Split>
            <div>
              <SectionHeader>
                <span>Process</span>
                <h2>A clear path from idea to shipped product.</h2>
              </SectionHeader>
            </div>
            <Steps>
              <li>
                <strong>Audit or scope.</strong>
                We define the buyer, the core flow, and what must ship first.
              </li>
              <li>
                <strong>Design and build.</strong>
                I turn the plan into responsive UI, clean components, and real
                product screens.
              </li>
              <li>
                <strong>Launch and learn.</strong>
                We connect analytics, verify performance, and improve the page
                around actual user behavior.
              </li>
            </Steps>
          </Split>
        </Section>

        <Section>
          <SectionHeader>
            <span>FAQ</span>
            <h2>Quick answers before we talk.</h2>
          </SectionHeader>
          <FaqList>
            {faqs.map((faq) => (
              <FaqItem key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </FaqItem>
            ))}
          </FaqList>
        </Section>

        <FinalCta>
          <h2>Have a product, app, or website that needs to win trust?</h2>
          <p>
            Send the goal, current link, and timeline. I will reply with the
            clearest next step.
          </p>
          <Actions>
            <PrimaryCta href="https://calendly.com/abdulmoharayman/30min">
              Book a call
            </PrimaryCta>
            <SecondaryCta href="/#projects">See project proof</SecondaryCta>
          </Actions>
        </FinalCta>
      </Page>
    </>
  );
};

export default Services;

const Page = styled.main`
  color: ${colors.background};
  background: ${colors.white};
`;

const HeroSection = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 8rem 1.25rem 4rem;

  h1 {
    max-width: 850px;
    margin: 0.5rem 0 1rem;
    font-size: 2.4rem;
    line-height: 1.08;
  }

  @media (min-width: 768px) {
    padding: 10rem 2rem 5rem;

    h1 {
      font-size: 4.4rem;
    }
  }
`;

const Eyebrow = styled.p`
  margin: 0;
  color: ${colors.accent};
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
`;

const Lead = styled.p`
  max-width: 720px;
  margin: 0;
  color: #3f4850;
  font-size: 1.1rem;
  line-height: 1.7;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.5rem;
`;

const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.85rem 1.2rem;
  border-radius: 6px;
  background: ${colors.accent};
  color: ${colors.white};
  font-weight: 800;
  text-decoration: none;
`;

const SecondaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.85rem 1.2rem;
  border: 1px solid ${colors.background};
  border-radius: 6px;
  color: ${colors.background};
  font-weight: 800;
  text-decoration: none;
`;

const TrustLine = styled.p`
  margin: 1.25rem 0 0;
  color: #59636c;
  font-size: 0.95rem;
`;

const Section = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 1.25rem;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const SectionHeader = styled.div`
  max-width: 680px;

  span {
    color: ${colors.accent};
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
  }

  h2 {
    margin: 0.35rem 0 1.5rem;
    font-size: 1.8rem;
    line-height: 1.16;
  }

  @media (min-width: 768px) {
    h2 {
      font-size: 2.6rem;
    }
  }
`;

const Cards = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 780px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ServiceCard = styled.article`
  border: 1px solid #d9dde1;
  border-radius: 8px;
  padding: 1.25rem;

  h3 {
    margin: 0 0 0.75rem;
    font-size: 1.25rem;
  }

  p {
    color: #4f5962;
    line-height: 1.65;
  }

  small {
    color: ${colors.background};
    font-weight: 800;
  }
`;

const Band = styled.section`
  background: ${colors.background};
  color: ${colors.white};
  padding: 3rem 1.25rem;

  > * {
    max-width: 1120px;
    margin-left: auto;
    margin-right: auto;
  }

  ${SectionHeader} h2 {
    color: ${colors.white};
  }

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const OutcomeGrid = styled.ul`
  display: grid;
  gap: 0.75rem;
  padding: 0;
  list-style: none;

  li {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: 1rem 0;
    line-height: 1.6;
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 2rem;
  }
`;

const Split = styled.div`
  display: grid;
  gap: 1.5rem;

  @media (min-width: 860px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;

const Steps = styled.ol`
  display: grid;
  gap: 1rem;
  margin: 0;
  padding-left: 1.25rem;

  li {
    line-height: 1.7;
  }
`;

const FaqList = styled.div`
  display: grid;
  gap: 1rem;
`;

const FaqItem = styled.article`
  border-top: 1px solid #d9dde1;
  padding-top: 1rem;

  h3 {
    margin: 0 0 0.35rem;
  }

  p {
    margin: 0;
    color: #4f5962;
    line-height: 1.65;
  }
`;

const FinalCta = styled.section`
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 1.25rem 5rem;

  h2 {
    max-width: 760px;
    margin: 0 0 0.75rem;
    font-size: 2rem;
    line-height: 1.18;
  }

  p {
    max-width: 640px;
    color: #4f5962;
    line-height: 1.65;
  }

  @media (min-width: 768px) {
    padding: 4rem 2rem 6rem;

    h2 {
      font-size: 3rem;
    }
  }
`;
