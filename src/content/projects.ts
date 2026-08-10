import * as Hbnb from '../../public/projects/Hbnb/content';
import * as onspace from '../../public/projects/onspace/content';
import * as Amc from '../../public/projects/Amc/content';
import * as QuickHost from '../../public/projects/QuickHost/content';
import * as Yala from '../../public/projects/Yala/content';
import * as blossom from '../../public/projects/blossom/content';
import * as convolab from '../../public/projects/convolab/content';
import * as Zuba from '../../public/projects/Zuba/content';
import * as ENEVA from '../../public/projects/ENEVA/content';
import * as Sava from '../../public/projects/Sava/content';
import * as Budj from '../../public/projects/Budj/content';
import * as ReonDevHub from '../../public/projects/ReonDevHub/content';
import * as Shambaboy from '../../public/projects/Shambaboy/content';
import * as AppBase from '../../public/projects/AppBase/content';
import * as Groundbase from '../../public/projects/Groundbase/content';

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
  gallery?: Array<{
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  }>;
};

export const content = {
  Budj: { ...Budj.content },
  ReonDevHub: { ...ReonDevHub.content },
  Shambaboy: { ...Shambaboy.content },
  AppBase: { ...AppBase.content },
  Groundbase: { ...Groundbase.content },
  Zuba: { ...Zuba.content },
  ENEVA: { ...ENEVA.content },
  Sava: { ...Sava.content },
  Hbnb: { ...Hbnb.content },
  onspace: { ...onspace.content },
  Amc: { ...Amc.content },
  QuickHost: { ...QuickHost.content },
  Yala: { ...Yala.content },
  blossom: { ...blossom.content },
  convolab: { ...convolab.content },
};
