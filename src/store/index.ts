import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import { shazamCoreApiV1, shazamCoreApiV2 } from "../API/shazamCore";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import playerSlice from "./reducers/player";
import firebaseUsersSlice from "./reducers/firebaseUsers";

const rootReducer = combineReducers({
  player: playerSlice.reducer,
  firebaseUsers: firebaseUsersSlice.reducer,
  [shazamCoreApiV1.reducerPath]: shazamCoreApiV1.reducer,
  [shazamCoreApiV2.reducerPath]: shazamCoreApiV2.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shazamCoreApiV1.middleware)
      .concat(shazamCoreApiV2.middleware),
});
