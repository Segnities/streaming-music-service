import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";

import { shazamCoreApiV1, shazamCoreApiV2 } from "../API/shazamCore";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import playerSlice from "./reducers/player";

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
    [shazamCoreApiV1.reducerPath]: shazamCoreApiV1.reducer, //!
    [shazamCoreApiV2.reducerPath]: shazamCoreApiV2.reducer,
  },
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shazamCoreApiV1.middleware)
      .concat(shazamCoreApiV2.middleware),
});
