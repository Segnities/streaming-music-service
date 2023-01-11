import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { shazamCoreApi } from "../API/shazamCore";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import playerSlice from "./reducers/player";

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer, //!
  },
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
