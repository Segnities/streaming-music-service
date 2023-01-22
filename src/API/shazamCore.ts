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

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
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
  }),
});

export const { useGetTopChartsQuery, useGetSongDetailsQuery, useGetRelatedSongsQuery } = shazamCoreApi;
