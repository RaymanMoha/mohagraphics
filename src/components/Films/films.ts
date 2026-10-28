import additionalFilms from './additional-films.json';

export type Film = { slug: string; title: string; brand: string; duration: string; description: string; category: string; width?: number; height?: number };

const originalFilms = [
  { slug: 'bag-ya-makaratasi', title: 'Bag ya Makaratasi', brand: 'ShambaBoy', duration: '0:35', description: 'A farm story told through the weight of its paper records.' },
  { slug: 'farm-record-book', title: 'Kazi Ilifanyika Kweli?', brand: 'ShambaBoy', duration: '0:46', description: 'A scrapbook-style film about the people behind verified farm work.' },
  { slug: 'chama-ya-budj', title: 'Chama ya Budj', brand: 'Budj', duration: '0:41', description: 'A playful paper collage brings a Kenyan business story to life.' },
  { slug: 'a-season-on-the-farm', title: 'A Season on the Farm', brand: 'ShambaBoy', duration: '0:52', description: 'From a sweeping farm landscape to the evidence behind every row.' },
  { slug: 'kazi-inaonekana', title: 'Kazi Inaonekana', brand: 'ShambaBoy', duration: '1:12', description: 'A character-led journey from greenhouse work to everyday conversations.' },
  { slug: 'ushahidi', title: 'Ushahidi', brand: 'ShambaBoy', duration: '0:57', description: 'A typography-led film that lets evidence do the talking.' },
];


const nextFilmSlugs = ['budj-paying-with-budj', 'budj-same-meal-more-value', 'budj-another-visit', 'budj-cafe-moment'];
const orderedAdditions = [
  ...nextFilmSlugs.map((slug) => additionalFilms.find((film) => film.slug === slug)!).filter(Boolean),
  ...additionalFilms.filter((film) => !nextFilmSlugs.includes(film.slug)),
];
export const films: Film[] = [...originalFilms.map((film) => ({ ...film, category: ['farm-record-book', 'chama-ya-budj'].includes(film.slug) ? 'Animation' : 'Brand films' })), ...orderedAdditions];
export const featuredFilms = films.slice(0, 12);
