import { ObjectId } from "mongodb";

export interface StockInfo {
  name: string;
  rank: number;
  age: number;
  color: string;
  png32: string;
  png64: string;
  webp32: string;
  webp64: string;
  exchanges: number;
  markets: number;
  pairs: number;
  categories: string[];
  allTimeHighUSD: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: any;
  links: Links;
  rate: number;
  volume: number;
  cap: number;
  liquidity: number;
  delta: Delta;
  code:string
}

export interface StockInfoEntity extends StockInfo {
   _id: string;
}

export interface Links {
  website: string;
  whitepaper: string;
  twitter: string;
  reddit: string;
  telegram: string;
  discord: string;
  medium: string;
  instagram: string;
  tiktok: any;
  youtube: string;
  linkedin: any;
  twitch: any;
  spotify: any;
  naver: any;
  wechat: any;
  soundcloud: any;
}

export interface Delta {
  hour: number;
  day: number;
  week: number;
  month: number;
  quarter: number;
  year: number;
}

export interface StockRequest {
  currency: string;
  code: string;
  meta: boolean;
}


export interface AllStocks {
  code: string
  rate: number
  volume: number
  cap: number
  delta: Delta
}