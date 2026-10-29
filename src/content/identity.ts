export const siteUrl = 'https://www.mohagraphics.tech';
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

// Public identity shared by visible profile copy and structured data.
export const identity = {
  name: 'Mohammed Abdirahman',
  brand: 'Moha Graphics',
  role: 'Frontend & Mobile Developer',
  description: 'Nairobi-based frontend and mobile developer working with React, Next.js, React Native, and Flutter, alongside product UX, brand campaigns, and motion design.',
  email: 'abdulmoharayman@gmail.com',
  profiles: ['https://github.com/RaymanMoha', 'https://www.linkedin.com/in/mohammed-a-1a6b651bb'],
};

export const personSchema = {
  '@type': 'Person', '@id': personId,
  name: identity.name, alternateName: identity.brand,
  url: siteUrl, image: `${siteUrl}/img/mohammed.jpeg`,
  jobTitle: identity.role, description: identity.description,
  homeLocation: { '@type': 'Place', name: 'Nairobi, Kenya' },
  email: identity.email, sameAs: identity.profiles,
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'React Native', 'Flutter', 'Product UX', 'Brand campaigns', 'Motion graphics'],
};

export const websiteSchema = {
  '@type': 'WebSite', '@id': websiteId, url: siteUrl,
  name: identity.brand, alternateName: `${identity.name} Portfolio`,
  inLanguage: 'en', publisher: { '@id': personId },
};
