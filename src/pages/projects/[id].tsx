import { ReonPortfolio } from '@/components/ReonPortfolio';
import { ProjectDetail, RelatedProject } from '@/components/ProjectDetail';
import { SEO } from '@/components/SEO';
import { Content, content as projectContent } from '@/content/projects';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

type PageProps = {
  id: string;
  productHtml: string;
  workHtml: string;
  outcomeHtml: string;
  project: Content;
  heroImageSrc: string | null;
  relatedProjects: RelatedProject[];
};

const sectionContent = (markdown: string, heading: string) => {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = markdown.match(
    new RegExp(`(?:^|\\n)#{1,2} ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n#{1,2} |$)`),
  );
  return match?.[1]?.trim() ?? '';
};

const limitBullets = (markdown: string, limit: number) => {
  let count = 0;
  return markdown
    .split('\n')
    .filter((line) => {
      if (!line.startsWith('- ')) return true;
      count += 1;
      return count <= limit;
    })
    .join('\n');
};

const renderMarkdown = async (markdown: string) =>
  (await remark().use(html).process(markdown)).toString();

const resolveImage = (id: string, raw?: string) => {
  if (!raw) return null;
  if (/^https?:\/\//.test(raw)) return raw;

  // Image URLs are declared in project metadata and served as static assets.
  // Avoid filesystem probes here: tracing a variable public path bundles all media.
  return raw.startsWith('/') ? raw : `/projects/${id}/${raw}`;
};

export const getStaticProps = (async ({ params }) => {
  const id = typeof params?.id === 'string' ? params.id : '';
  if (!(id in projectContent)) return { notFound: true };

  const project = projectContent[id as keyof typeof projectContent] as Content;
  const filePath = path.join(
    process.cwd(),
    'public',
    'projects',
    id,
    'overview.md',
  );
  const markdown = matter(fs.readFileSync(filePath, 'utf8')).content.replace(
    /^!\[[^\n]+\]\([^\n]+\)\s*/m,
    '',
  );
  const overview = sectionContent(markdown, 'Product Overview');
  const userNeed = sectionContent(markdown, 'User Need');
  const work =
    sectionContent(markdown, 'Engineering Focus') ||
    sectionContent(markdown, 'Product Experience');
  const outcome = sectionContent(markdown, 'Outcome');
  const [productHtml, workHtml, outcomeHtml] = await Promise.all([
    renderMarkdown([overview, userNeed].filter(Boolean).join('\n\n')),
    renderMarkdown(limitBullets(work, 4)),
    renderMarkdown(limitBullets(outcome, 3)),
  ]);

  const ids = Object.keys(projectContent);
  const reonSequence = ['ReonCapital', 'Zuba', 'ZubaSteward', 'ENEVA', 'ANSU', 'Sava', 'ReonDevHub'];
  const featuredSequence = ['Budj', 'Shambaboy', 'Sava'];
  const personalSequence = ['AppBase', 'Groundbase', 'Budj'];
  const sequence = reonSequence.includes(id)
    ? reonSequence
    : featuredSequence.includes(id)
    ? featuredSequence
    : personalSequence.includes(id)
      ? personalSequence
      : ids;
  const currentIndex = sequence.indexOf(id);
  const relatedProjects = [1, 2].map((offset) => {
    const relatedId = sequence[(currentIndex + offset) % sequence.length];
    const item = projectContent[
      relatedId as keyof typeof projectContent
    ] as Content;
    return {
      id: relatedId,
      title: item.title,
      role: item.role,
      type: item.details.type,
      image: resolveImage(relatedId, item.featuredImage),
    };
  });

  return {
    props: {
      id,
      productHtml,
      workHtml,
      outcomeHtml,
      project,
      heroImageSrc: resolveImage(id, project.featuredImage),
      relatedProjects,
    },
  };
}) satisfies GetStaticProps<PageProps>;

export const getStaticPaths = (async () => ({
  paths: Object.keys(projectContent).map((id) => ({ params: { id } })),
  fallback: false,
})) satisfies GetStaticPaths;

export default function ProjectPage(props: PageProps) {
  const { project, heroImageSrc } = props;

  return (
    <>
      <SEO
        title={project.title}
        thumb={heroImageSrc || '/img/logo.png'}
        description={project.seo || project.description}
        keywords={project.keywords}
        structuredData={{ '@type': 'CreativeWork',
          '@id': `https://www.mohagraphics.tech/projects/${props.id}#case-study`,
          name: `${project.title} — portfolio case study`,
          description: project.seo || project.description,
          url: `https://www.mohagraphics.tech/projects/${props.id}`,
          author: { '@id': 'https://www.mohagraphics.tech/#person' },
          citation: project.store?.url,
          about: project.store ? { '@type': 'SoftwareApplication', name: project.store.name,
            url: project.store.url, operatingSystem: 'Android',
            screenshot: project.store.screenshots.map((shot) => `https://www.mohagraphics.tech${shot.src}`) }
            : { '@type': 'Thing', name: project.title },
          keywords: project.keywords.join(', '), inLanguage: 'en' }}
        lang="en"
      />
      {props.id === 'ReonCapital' ? <ReonPortfolio /> : <ProjectDetail {...props} />}
    </>
  );
}
