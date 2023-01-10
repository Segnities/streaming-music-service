import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import player from "./reducers/player";

import { shazamCoreApi } from "../API/shazamCore";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const store = configureStore({
  reducer: {
    player,
    [shazamCoreApi.reducer.toString()]: shazamCoreApi.reducer, //!
  },
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
