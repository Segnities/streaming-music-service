import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/*1-st source - Shazam Core
  baseUrl: https://shazam-core.p.rapidapi.com/v1
  headers: 
  1. "X-RapidAPI-Key": "e60eb95ad5msh3b2acc1834b3709p1474b2jsnf25468328f98",
  2. "X-Rapid-Host": "shazam-core.p.rapidapi.com" 

*/

/*2-nd source - Shazam Core
  baseUrl: https://shazam-core.p.rapidapi.com/v1
  headers: 
  1. "X-RapidAPI-Key": "2cd15f9448msh8174a3963edb8c4p178072jsnc67906815ff5",
  2. "X-Rapid-Host": "shazam-core.p.rapidapi.com" 
*/

export const shazamCoreApiV1 = createApi({
  reducerPath: "shazamCoreApiV1",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "2cd15f9448msh8174a3963edb8c4p178072jsnc67906815ff5"
      );
      headers.set("X-Rapid-Host", "shazam-core.p.rapidapi.com");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/world" }),
    getSongDetails: builder.query({
      query: (songid) => `/tracks/details?track_id=${songid}`,
    }),
    getRelatedSongs: builder.query({
      query: (songid) => `/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistid) => `/artists/details?artist_id=${artistid}`,
    }),
  }),
});

export const shazamCoreApiV2 = createApi({
  reducerPath: "shazamCoreApiV2",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v2",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "2cd15f9448msh8174a3963edb8c4p178072jsnc67906815ff5"
      );
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");

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
} = shazamCoreApiV1;

export const { useGetArtistsDetailsQuery } = shazamCoreApiV2;
