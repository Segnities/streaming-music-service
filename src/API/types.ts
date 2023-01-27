/*SONG TYPES*/



export interface SongRootObject {
  layout: string;
  type: string;
  key: string;
  title: string;
  attributes?: SongAttributes;
  subtitle: string;
  share: SongShare;
  images?: SongImages;
  hub: SongHub;
  artists?: SongArtist[];
  url: string;
  highlightsurls: SongHighlightsurls;
  properties: SongHighlightsurls;
}

export interface SongDetails {
  layout: string;
  type: string;
  key: string;
  title: string;
  subtitle: string;
  share: SongShare;
  images?: SongImages;
  sections: { types: string; metapages: {}[] }[];
  hub: SongHub;
  artists?: SongArtist[];
  url: string;
  highlightsurls: SongHighlightsurls;
  properties: SongHighlightsurls;
}

export interface SelectorPlayerState {
  player: {
    currentSongs: [];
    currentIndex: number;
    isActive: boolean;
    isPlaying: boolean;
    activeSong: SongRootObject;
  };
}

export interface SongHighlightsurls {}

export interface SongArtist {
  alias: string;
  id: string;
  adamid: string;
}

export interface SongHub {
  type: string;
  image: string;
  actions?: SongAction[];
  options: SongOption[];
  explicit: boolean;
  displayname: string;
}

export interface SongOption {
  caption: string;
  actions: SongAction2[];
  beacondata: SongBeacondata;
  image: string;
  type: string;
  listcaption: string;
  overflowimage: string;
  colouroverflowimage: boolean;
  providername: string;
}

export interface SongBeacondata {
  type: string;
  providername: string;
}

export interface SongAction2 {
  name: string;
  type: string;
  uri: string;
}

export interface SongAction {
  name: string;
  type: string;
  id?: string;
  uri?: string;
}

export interface SongImages {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}

export interface SongShare {
  subject: string;
  text: string;
  href: string;
  image?: string;
  twitter: string;
  html: string;
  avatar?: string;
  snapchat: string;
}

export interface SongAttributes {
  name: string;
  albumName: string;
  artwork: {
    url: string;
  };
}

/*TRACK TYPES*/
export interface TrackRootObject {
  layout: string;
  type: string;
  key: string;
  title: string;
  subtitle: string;
  images: TrackImages;
  share: TrackShare;
  hub: TrackHub;
  sections: TrackSection[];
  url: string;
  artists: TrackArtist[];
  alias: string;
  isrc: string;
  genres: TrackGenres;
  urlparams: TrackUrlparams;
  highlightsurls: TrackHighlightsurls;
  albumadamid: string;
  trackadamid: string;
  releasedate: string;
}

export interface TrackHighlightsurls {}

export interface TrackUrlparams {
  "{tracktitle}": string;
  "{trackartist}": string;
}

export interface TrackGenres {
  primary: string;
}

export interface TrackArtist {
  alias: string;
  id: string;
  adamid: string;
}

export interface TrackSection {
  type: string;
  metapages?: TrackMetapage[];
  tabname: string;
  metadata?: TrackMetadatum[];
  text?: string[];
  footer?: string;
  beacondata?: TrackBeacondata2;
}

export interface TrackBeacondata2 {
  lyricsid: string;
  providername: string;
  commontrackid: string;
}

export interface TrackMetadatum {
  title: string;
  text: string;
}

export interface TrackMetapage {
  image: string;
  caption: string;
}

export interface TrackHub {
  type: string;
  image: string;
  actions: TrackAction[];
  options: TrackOption[];
  explicit: boolean;
  displayname: string;
}

export interface TrackOption {
  caption: string;
  actions: TrackAction2[];
  beacondata: TrackBeacondata;
  image: string;
  type: string;
  listcaption: string;
  overflowimage: string;
  colouroverflowimage: boolean;
  providername: string;
}

export interface TrackBeacondata {
  type: string;
  providername: string;
}

export interface TrackAction2 {
  name: string;
  type: string;
  uri: string;
}

export interface TrackAction {
  name: string;
  type: string;
  id?: string;
  uri?: string;
}

export interface TrackShare {
  subject: string;
  text: string;
  href: string;
  image: string;
  twitter: string;
  html: string;
  avatar: string;
  snapchat: string;
}

export interface TrackImages {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}
