export interface RootObject {
  layout: string;
  type: string;
  key: string;
  title: string;
  subtitle: string;
  share: Share;
  images?: Images;
  hub: Hub;
  artists?: Artist[];
  url: string;
  highlightsurls: Highlightsurls;
  properties: Highlightsurls;
}

export interface Highlightsurls {}

export interface Artist {
  alias: string;
  id: string;
  adamid: string;
}

export interface Hub {
  type: string;
  image: string;
  actions?: Action[];
  options: Option[];
  explicit: boolean;
  displayname: string;
}

export interface Option {
  caption: string;
  actions: Action2[];
  beacondata: Beacondata;
  image: string;
  type: string;
  listcaption: string;
  overflowimage: string;
  colouroverflowimage: boolean;
  providername: string;
}

export interface Beacondata {
  type: string;
  providername: string;
}

export interface Action2 {
  name: string;
  type: string;
  uri: string;
}

export interface Action {
  name: string;
  type: string;
  id?: string;
  uri?: string;
}

export interface Images {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}

export interface Share {
  subject: string;
  text: string;
  href: string;
  image?: string;
  twitter: string;
  html: string;
  avatar?: string;
  snapchat: string;
}

