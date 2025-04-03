import * as Hbnb from '../../public/projects/Hbnb/content';
import * as Onspace from '../../public/projects/Onspace/content';
import * as Amc from '../../public/projects/Amc/content';
import * as QuickHost from '../../public/projects/QuickHost/content';
import * as Yala from '../../public/projects/Yala/content';
import * as blossom from '../../public/projects/blossom/content';
import * as convolab from '../../public/projects/convolab/content';

export type Content = {
  title: string;
  featuredImage: string;
  description: string;
  seo?: string;
  details: {
    type: string;
    stack: string;
    code: string;
    live: string;
  };
  keywords: string[];
  role: string;
};

export const content = {
  Hbnb: { ...Hbnb.content },
  Onspace: { ...Onspace.content },
  Amc: { ...Amc.content },
  QuickHost: { ...QuickHost.content },
  Yala: { ...Yala.content },
  blossom: { ...blossom.content },
  convolab: { ...convolab.content },
};
