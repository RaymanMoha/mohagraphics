import * as Hbnb from '../../public/projects/Hbnb/content';
import * as onspace from '../../public/projects/onspace/content';
import * as Amc from '../../public/projects/Amc/content';
import * as QuickHost from '../../public/projects/QuickHost/content';
import * as Yala from '../../public/projects/Yala/content';
import * as blossom from '../../public/projects/blossom/content';
import * as convolab from '../../public/projects/convolab/content';
import * as InsuranceWidget from '../../public/projects/InsuranceWidget/content';

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
  onspace: { ...onspace.content },
  Amc: { ...Amc.content },
  QuickHost: { ...QuickHost.content },
  Yala: { ...Yala.content },
  blossom: { ...blossom.content },
  convolab: { ...convolab.content },
  InsuranceWidget: { ...InsuranceWidget.content },
};

