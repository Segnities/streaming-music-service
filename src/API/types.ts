/*SONG TYPES*/

export interface SongRootObject {
  layout: string;
  type: string;
  key: string;
  title: string;
  subtitle: string;
  share: SongShare;
  images?: SongImages;
  hub: SongHub;
  artists?: Artist[];
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
  artists?: Artist[];
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

export interface Artist {
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


/*TRACK TYPES*/
interface TrackRootObject {
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
  artists: Artist[];
  alias: string;
  isrc: string;
  genres: TrackGenres;
  urlparams: TrackUrlparams;
  highlightsurls: TrackHighlightsurls;
  albumadamid: string;
  trackadamid: string;
  releasedate: string;
}

interface TrackHighlightsurls {}

interface TrackUrlparams {
  "{tracktitle}": string;
  "{trackartist}": string;
}

interface TrackGenres {
  primary: string;
}

interface TrackArtist {
  alias: string;
  id: string;
  adamid: string;
}

interface TrackSection {
  type: string;
  metapages?: TrackMetapage[];
  tabname: string;
  metadata?: TrackMetadatum[];
  text?: string[];
  footer?: string;
  beacondata?: TrackBeacondata2;
}

interface TrackBeacondata2 {
  lyricsid: string;
  providername: string;
  commontrackid: string;
}

interface TrackMetadatum {
  title: string;
  text: string;
}

interface TrackMetapage {
  image: string;
  caption: string;
}

interface TrackHub {
  type: string;
  image: string;
  actions: TrackAction[];
  options: TrackOption[];
  explicit: boolean;
  displayname: string;
}

interface TrackOption {
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

interface TrackBeacondata {
  type: string;
  providername: string;
}

interface TrackAction2 {
  name: string;
  type: string;
  uri: string;
}

interface TrackAction {
  name: string;
  type: string;
  id?: string;
  uri?: string;
}

interface TrackShare {
  subject: string;
  text: string;
  href: string;
  image: string;
  twitter: string;
  html: string;
  avatar: string;
  snapchat: string;
}

interface TrackImages {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}