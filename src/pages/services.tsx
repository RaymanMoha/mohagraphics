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

const metrics = [
  { value: '5+', label: 'years shipping products' },
  { value: '15+', label: 'web and mobile builds' },
  { value: '24h', label: 'typical first reply' },
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
        structuredData={structuredData}
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

      <Page>
        <HeroSection>
          <HeroCopy>
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
          </HeroCopy>
          <HeroPanel aria-label="Service highlights">
            <ProfileImage src="/img/mohammed.jpeg" alt="Mohammed Abdirahman" />
            <PanelCard>
              <strong>Frontend, mobile, and product UI development</strong>
              <span>For startups that need the product to feel credible fast.</span>
            </PanelCard>
            <MetricGrid>
              {metrics.map((metric) => (
                <Metric key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </Metric>
              ))}
            </MetricGrid>
          </HeroPanel>
        </HeroSection>

        <Section>
          <SectionHeader>
            <span>Services</span>
            <h2>Built for teams that need momentum, not noise.</h2>
          </SectionHeader>
          <Cards>
            {services.map((service, index) => (
              <ServiceCard key={service.title}>
                <CardNumber>{String(index + 1).padStart(2, '0')}</CardNumber>
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
                <StepNumber>01</StepNumber>
                <strong>Audit or scope.</strong>
                <span>We define the buyer, the core flow, and what must ship first.</span>
              </li>
              <li>
                <StepNumber>02</StepNumber>
                <strong>Design and build.</strong>
                <span>
                  I turn the plan into responsive UI, clean components, and real
                  product screens.
                </span>
              </li>
              <li>
                <StepNumber>03</StepNumber>
                <strong>Launch and learn.</strong>
                <span>
                  We connect analytics, verify performance, and improve the page
                  around actual user behavior.
                </span>
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
  background:
    linear-gradient(180deg, ${colors.background} 0, ${colors.background} 610px, #f7f4ef 610px),
    #f7f4ef;
`;

const HeroSection = styled.section`
  display: grid;
  gap: 2rem;
  max-width: 1180px;
  margin: 0 auto;
  padding: 8.5rem 1.25rem 4rem;
  color: ${colors.white};

  h1 {
    max-width: 790px;
    margin: 0;
    font-size: 2.45rem;
    line-height: 1.04;
    letter-spacing: 0;
  }

  @media (min-width: 768px) {
    padding: 10rem 2rem 5rem;
    grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
    align-items: center;

    h1 {
      font-size: 4.35rem;
    }
  }
`;

const HeroCopy = styled.div`
  display: grid;
  gap: 1.25rem;
`;

const Lead = styled.p`
  max-width: 720px;
  margin: 0;
  color: #d7dde1;
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
  margin-top: 0.25rem;
`;

const PrimaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.9rem 1.25rem;
  border-radius: 6px;
  background: ${colors.accent};
  color: ${colors.white};
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 18px 35px rgba(255, 113, 91, 0.25);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 22px 45px rgba(255, 113, 91, 0.32);
  }
`;

const SecondaryCta = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.9rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: inherit;
  font-weight: 800;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  transition:
    border-color 180ms ease,
    background 180ms ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.65);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TrustLine = styled.p`
  margin: 0;
  color: #aeb8c0;
  font-size: 0.95rem;
`;

const HeroPanel = styled.aside`
  position: relative;
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03)),
    rgba(255, 255, 255, 0.05);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
`;

const ProfileImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
  filter: saturate(0.95) contrast(1.05);
`;

const PanelCard = styled.div`
  display: grid;
  gap: 0.4rem;
  padding: 1rem;
  border-left: 3px solid ${colors.accent};
  background: rgba(18, 30, 39, 0.68);

  strong {
    font-size: 1rem;
  }

  span {
    color: #d7dde1;
    line-height: 1.55;
  }
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem;
`;

const Metric = styled.div`
  display: grid;
  gap: 0.15rem;
  padding: 0.8rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);

  strong {
    color: ${colors.accent};
    font-size: 1.4rem;
    line-height: 1;
  }

  span {
    color: #d7dde1;
    font-size: 0.78rem;
    line-height: 1.35;
  }
`;

const Section = styled.section`
  max-width: 1180px;
  margin: 0 auto;
  padding: 4rem 1.25rem;

  @media (min-width: 768px) {
    padding: 5rem 2rem;
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
    letter-spacing: 0;
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
  position: relative;
  overflow: hidden;
  min-height: 280px;
  border: 1px solid rgba(18, 30, 39, 0.12);
  border-radius: 10px;
  padding: 1.35rem;
  background: #fffdf9;
  box-shadow: 0 24px 55px rgba(18, 30, 39, 0.08);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;

  &:before {
    content: '';
    position: absolute;
    right: -48px;
    top: -48px;
    width: 112px;
    height: 112px;
    border-radius: 999px;
    background: rgba(255, 113, 91, 0.12);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 32px 70px rgba(18, 30, 39, 0.14);
  }

  h3 {
    position: relative;
    margin: 2.4rem 0 0.75rem;
    font-size: 1.35rem;
    line-height: 1.2;
  }

  p {
    position: relative;
    color: #4f5962;
    line-height: 1.65;
  }

  small {
    position: relative;
    display: block;
    margin-top: 1rem;
    color: ${colors.background};
    font-weight: 800;
    line-height: 1.5;
  }
`;

const CardNumber = styled.span`
  position: absolute;
  left: 1.35rem;
  top: 1.25rem;
  color: ${colors.accent};
  font-size: 0.85rem;
  font-weight: 900;
`;

const Band = styled.section`
  background: ${colors.background};
  color: ${colors.white};
  padding: 4rem 1.25rem;

  > * {
    max-width: 1180px;
    margin-left: auto;
    margin-right: auto;
  }

  ${SectionHeader} h2 {
    color: ${colors.white};
  }

  @media (min-width: 768px) {
    padding: 5rem 2rem;
  }
`;

const OutcomeGrid = styled.ul`
  display: grid;
  gap: 0.75rem;
  padding: 0;
  list-style: none;

  li {
    border-top: 1px solid rgba(255, 255, 255, 0.18);
    padding: 1.2rem 0;
    line-height: 1.6;
    color: #d7dde1;
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
  padding: 0;
  list-style: none;

  li {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.35rem 1rem;
    padding: 1.2rem;
    border: 1px solid rgba(18, 30, 39, 0.12);
    border-radius: 10px;
    background: #fffdf9;
    line-height: 1.7;
  }

  strong,
  span {
    grid-column: 2;
  }

  span {
    color: #4f5962;
  }
`;

const StepNumber = styled.span`
  grid-row: 1 / span 2;
  grid-column: 1;
  color: ${colors.accent};
  font-weight: 900;
`;

const FaqList = styled.div`
  display: grid;
  gap: 1rem;
`;

const FaqItem = styled.article`
  border-top: 1px solid rgba(18, 30, 39, 0.14);
  padding: 1.25rem 0 0.25rem;

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
  max-width: 1180px;
  margin: 0 auto;
  padding: 1.25rem 1.25rem 5rem;

  &:before {
    content: '';
    display: block;
    height: 1px;
    margin-bottom: 3rem;
    background: rgba(18, 30, 39, 0.14);
  }

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
    padding: 2rem 2rem 6rem;

    h2 {
      font-size: 3rem;
    }
  }
`;
