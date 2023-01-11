import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* try {
  const response = await fetch(
    "https://shazam-core.p.rapidapi.com/v1/charts/world",
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "e60eb95ad5msh3b2acc1834b3709p1474b2jsnf25468328f98",
        "X-Rapid-Host": "shazam-core.p.rapidapi.com",
      },
    }
  );

  if (response.ok) {
    const result = await response.json();
    console.log(result);
  }
} catch (err) {
  console.error(err);
} */

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "e60eb95ad5msh3b2acc1834b3709p1474b2jsnf25468328f98"
      );
      headers.set("X-Rapid-Host", "shazam-core.p.rapidapi.com");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/world" }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;
