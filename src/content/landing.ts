import { content as projectData } from './projects';

export const landingPage = {
  title: 'Landing page title from local markdown',
  internal: true,
  mainpitch: {
    title: 'Hi, I’m Mohammed | **Frontend** **Engineer**',
    subtitle:
      'I love exploring and creating 🚀 whether it’s crafting intuitive user interfaces 🎨 or diving into the latest frontend technologies 💻. As a lifelong learner 📚, I’m always experimenting with new ways to build responsive, high-performance web applications ⚡ that feel effortless to use.',
    buttonText: 'Book a call',
  },
  bio: {
    title: 'My **Skills**',
    image: 'landingImage.jpg',
    features: [
      {
        header: 'I love building stuff 📱',
        body: 'Ever since I started tinkering with computers and crafting my first webpages, Ive been hooked on technology. My journey has taken me from playful experiments to building dynamic, scalable applications, and every project fuels my passion for innovative digital experiences.',
      },
    ],
  },
  projects: [
    {
      body: 'I built a comprehensive insurance quote calculator and onboarding platform using React and TypeScript. The application features a multi-step onboarding flow, PWA capabilities, Redux state management, and iframe integration for seamless embedding. With modern UI/UX design and responsive architecture, it streamlines the insurance application process.',
      image: 'insurance-widget.png',
      buttonText: 'View project',
      link: '/projects/InsuranceWidget/',
      ...projectData.InsuranceWidget,
      title: 'Insurance Widget',
    },
    {
      body: 'I transformed detailed Figma designs into a responsive, user-friendly platform for both web and mobile. The site features integrated core functionalities—like dynamic form creation, team chat, and data visualization',
      image: 'onspace.png',
      buttonText: 'View project',
      link: '/projects/onspace/',
      ...projectData.onspace,
    },
    {
      body: 'I developed a modern, responsive website using Next.js and Tailwind CSS, ensuring a seamless user experience. The platform integrates Sanity CMS for dynamic content management and is optimized for performance and scalability with Vercel deployment.',
      image: 'convolab.png',
      buttonText: 'View project',
      link: '/projects/convolab',
      ...projectData.convolab,
      title: 'Conversation Lab',
    },
    {
      body: 'I created the website to precisely mirror the look and feel of the Flutter mobile app. By closely aligning the design elements, color schemes, I ensured a consistent, seamless user experience across platforms. This approach not only reinforced the brand identity but also made the transition between mobile and web effortless for users, creating a cohesive and engaging digital presence.',
      image: 'yalapay.jpeg',
      buttonText: 'View project',
      link: '/projects/Yala',
      ...projectData.Yala,
      title: 'Yala Pay',
    },
    {
      body: 'I helped with build the AMC Group Africa website using WordPress, ensuring a seamless and engaging user experience. The site not only showcases the range of courses offered but also integrates targeted marketing campaigns designed to boost enrollment and drive engagement. Through strategically crafted landing pages and dynamic content, the website effectively connects prospective students with the educational opportunities available, reinforcing the brand',
      image: 'amc.png',
      buttonText: 'View project',
      link: '/projects/Amc/',
      ...projectData.Amc,
      title: 'Amc Group Africa',
    },

    {
      body: 'The goal was to simplify the hosting process for both beginners and professionals. To achieve this, we revamped the homepage with a clean, modern design that immediately communicates the core services: domain registration, web hosting, and cloud solutions.',
      image: 'quickhost.jpg',
      buttonText: 'View project',
      link: '/projects/QuickHost/',
      ...projectData.QuickHost,
      title: 'Quick Host',
    },
    {
      body: 'I worked on building a user-friendly platform for Blossom Insurance, ensuring seamless access to a variety of insurance services. The site includes detailed information about different plans—such as Group Life, Personal Accident, and Medical Insurance—while offering tools for quotes and consultations. With a focus on trust and transparency, the website helps individuals, SMEs, and corporates easily navigate their insurance needs.',
      image: 'blossom-logo.png',
      buttonText: 'View project',
      link: '/projects/blossom/',
      ...projectData.blossom,
      title: 'Blossom Insurance',
    },
    {
      body: 'hbnb is a full-stack clone of the web application AirBnB. This clone was built in four iterative phases. This version includes completion of Phase 1, Phase 2, Phase 3 plus Phase 4 (Final version!), which involves loading objects from the client-side using our custom RESTful API and jQuery.',
      image: 'hbnb.png',
      buttonText: 'View project',
      link: '/projects/Hbnb/',
      ...projectData.Hbnb,
      title: 'Hbnb',
    },
  ],

  contact: {
    title: "Let's have a **chat**",
    buttonText: 'Get in touch',
  },
};

