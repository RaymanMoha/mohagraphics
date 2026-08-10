import { FiArrowLeft, FiArrowUpRight, FiLock, FiMapPin } from 'react-icons/fi';

import { Content } from '@/content/projects';
import Image from 'next/image';
import * as S from './styles';

export type RelatedProject = {
  id: string;
  title: string;
  role: string;
  type: string;
  image: string | null;
};

type Props = {
  id: string;
  productHtml: string;
  workHtml: string;
  outcomeHtml: string;
  project: Content;
  heroImageSrc: string | null;
  relatedProjects: RelatedProject[];
};

const cleanTool = (tool: string) => tool.replaceAll('_', ' ');

export const ProjectDetail = ({
  productHtml,
  workHtml,
  outcomeHtml,
  project,
  heroImageSrc,
  relatedProjects,
}: Props) => {
  const { title, description, role, details } = project;
  const tools = details.stack.split(' ').filter(Boolean).map(cleanTool);
  const isPrivate = details.code.trim().toLowerCase() === 'private';

  return (
    <S.Page>
      <S.Intro>
        <S.BackLink href="/#projects">
          <FiArrowLeft /> All projects
        </S.BackLink>

        <S.IntroGrid>
          <S.Summary>
            <S.Title>{title}</S.Title>
            <S.CoralRule />
            <S.Role>{role}</S.Role>
            <S.Type>{details.type}</S.Type>
            <S.Description>{description}</S.Description>
            <S.Actions>
              {details.live.trim() && (
                <S.PrimaryAction
                  href={details.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit live product <FiArrowUpRight />
                </S.PrimaryAction>
              )}
              {isPrivate ? (
                <S.PrivateLabel>
                  Private code <FiLock />
                </S.PrivateLabel>
              ) : details.code.trim() ? (
                <S.TextAction
                  href={details.code}
                  target="_blank"
                  rel="noreferrer"
                >
                  View code <FiArrowUpRight />
                </S.TextAction>
              ) : null}
            </S.Actions>
          </S.Summary>

          <S.Facts aria-label="Project details">
            <S.FactsLabel>Project details</S.FactsLabel>
            <S.Fact>
              <dt>Role</dt>
              <dd>{role}</dd>
            </S.Fact>
            <S.Fact>
              <dt>Type</dt>
              <dd>{details.type}</dd>
            </S.Fact>
            <S.Fact>
              <dt>Stack</dt>
              <dd>{tools.join(', ')}</dd>
            </S.Fact>
            <S.Fact>
              <dt>Live product</dt>
              <dd>
                <a href={details.live} target="_blank" rel="noreferrer">
                  Visit live product <FiArrowUpRight />
                </a>
              </dd>
            </S.Fact>
            <S.Fact>
              <dt>Code</dt>
              <dd>
                {isPrivate ? (
                  <span>
                    Private code <FiLock />
                  </span>
                ) : (
                  <a href={details.code}>View source</a>
                )}
              </dd>
            </S.Fact>
          </S.Facts>
        </S.IntroGrid>
      </S.Intro>

      {heroImageSrc && (
        <S.HeroMedia>
          <Image
            src={heroImageSrc}
            alt={`${title} product overview`}
            width={1600}
            height={860}
            sizes="(min-width: 1120px) 1120px, 92vw"
            priority
          />
        </S.HeroMedia>
      )}

      <S.Story>
        <S.StoryColumn>
          <S.StoryBlock>
            <S.Marker />
            <S.BlockLabel>The product</S.BlockLabel>
            <S.Markdown dangerouslySetInnerHTML={{ __html: productHtml }} />
          </S.StoryBlock>
          <S.StoryBlock>
            <S.Marker />
            <S.BlockLabel>What I worked on</S.BlockLabel>
            <S.Markdown dangerouslySetInnerHTML={{ __html: workHtml }} />
          </S.StoryBlock>
          <S.StoryBlock>
            <S.Marker />
            <S.BlockLabel>Outcome</S.BlockLabel>
            <S.Markdown dangerouslySetInnerHTML={{ __html: outcomeHtml }} />
          </S.StoryBlock>
        </S.StoryColumn>

        <S.SideFacts>
          <S.FactsLabel>Project details</S.FactsLabel>
          <S.Fact>
            <dt>Role</dt>
            <dd>{role}</dd>
          </S.Fact>
          <S.Fact>
            <dt>Type</dt>
            <dd>{details.type}</dd>
          </S.Fact>
          <S.Fact>
            <dt>Stack</dt>
            <dd>{tools.slice(0, 8).join(', ')}</dd>
          </S.Fact>
          <S.Fact>
            <dt>Live</dt>
            <dd>
              <a href={details.live} target="_blank" rel="noreferrer">
                Visit product <FiArrowUpRight />
              </a>
            </dd>
          </S.Fact>
        </S.SideFacts>
      </S.Story>

      {project.gallery?.length ? (
        <S.Gallery aria-labelledby="project-media-title">
          <S.GalleryHeading>
            <S.FactsLabel>Product media</S.FactsLabel>
            <h2 id="project-media-title">The product in the field.</h2>
          </S.GalleryHeading>
          <S.GalleryGrid>
            {project.gallery.map((item) => (
              <S.GalleryItem key={item.src}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 700px) 50vw, 92vw"
                />
                <figcaption>{item.caption}</figcaption>
              </S.GalleryItem>
            ))}
          </S.GalleryGrid>
        </S.Gallery>
      ) : null}

      <S.NextSection>
        <S.NextLabel>Next projects</S.NextLabel>
        {relatedProjects.map((item) => (
          <S.NextProject key={item.id} href={`/projects/${item.id}/`}>
            {item.image && (
              <Image
                src={item.image}
                alt={`${item.title} preview`}
                width={1600}
                height={670}
                sizes="(min-width: 1120px) 700px, 92vw"
              />
            )}
            <S.NextCopy>
              <small>{item.role}</small>
              <h2>{item.title.split(':')[0]}</h2>
              <p>{item.type}</p>
              <span>
                View project <FiArrowUpRight />
              </span>
            </S.NextCopy>
          </S.NextProject>
        ))}
      </S.NextSection>

      <S.ContactBand>
        <S.ContactMarker />
        <div>
          <h2>
            Have a product
            <br />
            worth shipping?
          </h2>
          <p>
            <FiMapPin /> Nairobi, Kenya <i /> Remote-friendly
          </p>
        </div>
        <S.ContactAction href="mailto:abdulmoharayman@gmail.com">
          Contact Mohammed <FiArrowUpRight />
        </S.ContactAction>
        <S.ContactGif
          src="/img/herogifo2.gif"
          alt="Animated collaboration illustration"
        />
      </S.ContactBand>
    </S.Page>
  );
};
