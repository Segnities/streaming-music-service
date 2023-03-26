
import { render } from "@testing-library/react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import playerSlice from "./store/reducers/player";
import firebaseUsersSlice, { setFirebaseUsers } from "./store/reducers/firebaseUsers";
import { shazamCoreApiV1, shazamCoreApiV2 } from "./API/shazamCore";

import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const rootReducer = combineReducers({
    player: playerSlice.reducer,
    firebaseUsers: firebaseUsersSlice.reducer,
    [shazamCoreApiV1.reducerPath]: shazamCoreApiV1.reducer,
    [shazamCoreApiV2.reducerPath]: shazamCoreApiV2.reducer,
});

export function renderWithProviders(
    ui: JSX.Element,
    {
        preloadedState = {},
        store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
                getDefaultMiddleware().concat(shazamCoreApiV1.middleware).concat(shazamCoreApiV2.middleware),
            preloadedState
        }),
        ...renderOptions
    } = {}
) {

    setupListeners(store.dispatch);

    function Wrapper({ children }) {
        return <Provider store={store}>
            {children}
        </Provider>
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
