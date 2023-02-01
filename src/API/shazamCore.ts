import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const RAPID_HOST: string = "shazam-core.p.rapidapi.com";
const ACTIVE_RAPID_KEY: string =
  "6a60bf0562msh30807a648877b34p16c807jsn43ead18ffe1f";

/*1-st source - Shazam Core
  headers: 
  1. "X-RapidAPI-Key": "e60eb95ad5msh3b2acc1834b3709p1474b2jsnf25468328f98",
  2. "X-Rapid-Host": "shazam-core.p.rapidapi.com" 

*/

/*2-nd source - Shazam Core
  headers: 
  1. "X-RapidAPI-Key": "2cd15f9448msh8174a3963edb8c4p178072jsnc67906815ff5",
  2. "X-Rapid-Host": "shazam-core.p.rapidapi.com" 
*/

/*3-rd source - Shazam Core
  headers: 
  1. "X-RapidAPI-Key": "6a60bf0562msh30807a648877b34p16c807jsn43ead18ffe1f",
  2. "X-Rapid-Host": "shazam-core.p.rapidapi.com'" 

*/

export const shazamCoreApiV1 = createApi({
  reducerPath: "shazamCoreApiV1",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", ACTIVE_RAPID_KEY);
      headers.set("X-Rapid-Host", RAPID_HOST);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/world" }),
    getSongsByGenre: builder.query({
      query: (genreCode) => `/charts/genre-world?genre_code=${genreCode}`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `/tracks/details?track_id=${songid}`,
    }),
    getRelatedSongs: builder.query({
      query: (songid) => `/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistid) => `/artists/details?artist_id=${artistid}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchQuery) =>
        `/search/multi?query=${searchQuery}&search_type=SONGS_ARTISTS`,
    }),
  }),
});

export const shazamCoreApiV2 = createApi({
  reducerPath: "shazamCoreApiV2",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v2",
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", ACTIVE_RAPID_KEY);
      headers.set("X-RapidAPI-Host", RAPID_HOST);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArtistsDetails: builder.query({
      query: (artistid) => `/artists/details?artist_id=${artistid}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApiV1;

export const { useGetArtistsDetailsQuery } = shazamCoreApiV2;
