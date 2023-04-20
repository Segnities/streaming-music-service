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
    genreListId: "";
    activeSong: SongRootObject;
  };
}

export interface SongHighlightsurls { }

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

export interface TrackHighlightsurls { }

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

/*Artist Details*/
export interface MainArtistDetails {
  data: MainDatum[];

}

export interface MainDatum {
  id: string;
  type: Type;
  href: string;
  avatar: string;
  attributes: PurpleAttributes;
  relationships: Relationships;
  views: DatumViews;
  meta: PurpleMeta;
}

export interface PurpleAttributes {
  bornOrFormed: string;
  genreNames: string[];
  editorialArtwork: PurpleEditorialArtwork;
  origin: string;
  name: Name;
  artwork: Artwork;
  url: string;
  artistBio: string;
}

export interface Artwork {
  width: number;
  url: string;
  height: number;
  textColor3: string;
  textColor2: string;
  textColor4: string;
  textColor1: string;
  bgColor: string;
  hasP3: boolean;
  textGradient?: string[];
}

export interface PurpleEditorialArtwork {
  originalFlowcaseBrick?: Artwork;
  storeFlowcase?: Artwork;
  subscriptionHero?: Artwork;
  bannerUber?: Artwork;
}

export enum Name {
  ArianaGrandeMileyCyrusLanaDelRey = "Ariana Grande, Miley Cyrus & Lana Del Rey",
  MileyCyrus = "Miley Cyrus",
}

export interface PurpleMeta {
  views: MetaViews;
}

export interface MetaViews {
  order: string[];
}

export interface Relationships {
  albums: Albums;
}

export interface Albums {
  href: string;
  next?: string;
  data: AlbumsDatum[];
}

export interface AlbumsDatum {
  id: string;
  type: Type;
  href: string;
  attributes?: FluffyAttributes;
}

export interface FluffyAttributes {
  copyright?: string;
  genreNames?: string[];
  releaseDate?: Date;
  isMasteredForItunes?: boolean;
  upc?: string;
  artwork: Artwork;
  url: string;
  playParams: PlayParams;
  recordLabel?: RecordLabel;
  isCompilation?: boolean;
  trackCount?: number;
  isPrerelease?: boolean;
  audioTraits?: AudioTrait[];
  editorialArtwork: FluffyEditorialArtwork;
  isSingle?: boolean;
  name: string;
  contentRating?: string;
  artistName?: Name;
  editorialNotes?: EditorialNotes;
  isComplete?: boolean;
  curatorName?: string;
  lastModifiedDate?: Date;
  isChart?: boolean;
  description?: Description;
  playlistType?: string;
  durationInMillis?: number;
  isrc?: string;
  has4K?: boolean;
  hasHDR?: boolean;
  previews?: Preview[];
  albumName?: string;
  trackNumber?: number;
}

export enum AudioTrait {
  Atmos = "atmos",
  Lossless = "lossless",
  LossyStereo = "lossy-stereo",
  Spatial = "spatial",
}

export interface Description {
  standard: string;
  short?: string;
}

export interface FluffyEditorialArtwork {
  storeFlowcase?: Artwork;
  subscriptionHero?: Artwork;
  staticDetailSquare?: Artwork;
  staticDetailTall?: Artwork;
  subscriptionCover?: Artwork;
  originalFlowcaseBrick?: Artwork;
}

export interface EditorialNotes {
  standard: string;
  short?: string;
  name?: string;
}

export interface PlayParams {
  id: string;
  kind: Kind;
  versionHash?: string;
}

export enum Kind {
  Album = "album",
  MusicVideo = "musicVideo",
  Playlist = "playlist",
  Song = "song",
}

export interface Preview {
  url: string;
  hlsUrl?: string;
  artwork?: Artwork;
}

export enum RecordLabel {
  Columbia = "Columbia",
  HollywoodRecords = "Hollywood Records",
  RCARecordsLabel = "RCA Records Label",
}

export enum Type {
  Albums = "albums",
  Artists = "artists",
  MusicVideos = "music-videos",
  Playlists = "playlists",
  Songs = "songs",
}

export interface DatumViews {
  "featured-albums": FeaturedAlbums;
  playlists: FeaturedAlbums;
  "similar-artists": FeaturedAlbums;
  "top-music-videos": FeaturedAlbums;
  "full-albums": FeaturedAlbums;
  "latest-release": FeaturedAlbums;
  "top-songs": FeaturedAlbums;
}

export interface FeaturedAlbums {
  href: string;
  attributes: FeaturedAlbumsAttributes;
  data: FeaturedAlbumsDatum[];
  next?: string;
}

export interface FeaturedAlbumsAttributes {
  title: string;
}

export interface FeaturedAlbumsDatum {
  id: string;
  type: Type;
  href: string;
  attributes: TentacledAttributes;
  relationships?: Relationships;
  meta?: FluffyMeta;
}

export interface TentacledAttributes {
  copyright?: string;
  genreNames?: string[];
  releaseDate?: Date;
  isMasteredForItunes?: boolean;
  upc?: string;
  artwork: Artwork;
  url: string;
  playParams?: PlayParams;
  recordLabel?: RecordLabel;
  isCompilation?: boolean;
  trackCount?: number;
  isPrerelease?: boolean;
  audioTraits?: AudioTrait[];
  editorialArtwork: TentacledEditorialArtwork;
  isSingle?: boolean;
  name: string;
  contentRating?: string;
  artistName?: Name;
  editorialNotes?: EditorialNotes;
  isComplete?: boolean;
  curatorName?: string;
  lastModifiedDate?: Date;
  isChart?: boolean;
  description?: Description;
  playlistType?: string;
  bornOrFormed?: string;
  origin?: string;
  artistBio?: string;
  durationInMillis?: number;
  isrc?: string;
  has4K?: boolean;
  hasHDR?: boolean;
  previews?: Preview[];
  albumName?: string;
  trackNumber?: number;
  hasTimeSyncedLyrics?: boolean;
  isVocalAttenuationAllowed?: boolean;
  audioLocale?: AudioLocale;
  composerName?: string;
  discNumber?: number;
  isAppleDigitalMaster?: boolean;
  hasLyrics?: boolean;
}

export enum AudioLocale {
  EnUS = "en-US",
}

export interface TentacledEditorialArtwork {
  storeFlowcase?: Artwork;
  subscriptionHero?: Artwork;
  staticDetailSquare?: Artwork;
  staticDetailTall?: Artwork;
  subscriptionCover?: Artwork;
  originalFlowcaseBrick?: Artwork;
  bannerUber?: Artwork;
}

export interface FluffyMeta {
  formerIds: string[];
}
/*Geo Ipify */
export interface GeoIpifyCountry {
  data: {
    ip: string;
    location: {
      country: string;
      region: string;
      timezone: string;
    };
    as: {
      asn: number;
      name: string;
      route: string;
      domain: string;
      type: string;
    };
    isp: string;
  };
}



export interface YoutubeTrackData {
  caption: string;
  image: YoutubeImagesData,
  actions: YoutubeActionsData[];
}

export interface YoutubeImagesData {
  dimensions: {
    width: number;
    height: number;
  },
  url: string;
}

export interface YoutubeActionsData {
  name: string;
  type: string;
  share: {
    subject: string;
    text: string;
    href: string;
    image: string;
    twitter: string;
    html: string;
    avatar: string;
    snapchat: string;
  };
  uri: string;
}