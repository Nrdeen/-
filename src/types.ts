export type CategoryType = 'sheep' | 'goat';
export type SexType = 'm' | 'f' | 'y'; // m: male, f: female, y: young

export interface Palette {
  wool: string;
  shade: string;
  hi?: string;
  face: string;
  dk: string;
  horn: string;
  leg: string;
  nose?: string;
}

export interface Breeder {
  n: string; // name
  r: string; // region
  rt: number; // rating
  ads: number; // number of ads
  yrs: number; // years experience
  c: string; // avatar color
  d: string; // description
}

export interface Listing {
  id: number;
  t: string; // title
  cat: CategoryType;
  type: string; // breed: نعيمي, حري, نجدي, سواكني, ماعز
  sex: SexType;
  age: number; // months
  kg: number; // weight
  price: number; // in SAR
  reg: string; // region
  b: number; // breeder index
  pal: string; // palette key
  sk: number; // sky index
  v: number; // verified (1 or 0)
  fl: number;
  d: string; // description
  horns?: number;
  goat?: number;
  twin?: number;
  phone?: string;
  user?: number; // 1 if created by user
}

export interface PriceSeries {
  k: string; // breed name
  c: string; // CSS color variable
  v: number[]; // monthly prices
  kg: number;
}

export interface OccasionItem {
  t: string;
  d: string;
  f: {
    cat?: CategoryType;
    sex?: SexType;
    max?: string;
  };
  pal: string;
  bg: [string, string];
}

export interface BreedGuideItem {
  k: string;
  pal: string;
  sk: number;
  horns?: number;
  lead: string;
  m: [string, number][]; // [metricName, score 1-5]
  f: [string, string][]; // [label, value]
  tip: string;
}

export interface ArticleItem {
  t: string;
  tag: string;
  min: number;
  icon: string;
  bg: string;
  lead: string;
  body: [string, string][];
}
