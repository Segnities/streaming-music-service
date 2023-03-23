import React from 'react';

import {render} from "@testing-library/react";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

import playerSlice from "./store/reducers/player";
import firebaseUsersSlice from "./store/reducers/firebaseUsers";
import {shazamCoreApiV1, shazamCoreApiV2} from "./API/shazamCore";


const rootReducer = combineReducers({
    player: playerSlice.reducer,
    firebaseUsers: firebaseUsersSlice.reducer,
    [shazamCoreApiV1.reducerPath]: shazamCoreApiV1.reducer,
    [shazamCoreApiV2.reducerPath]: shazamCoreApiV2.reducer,
});
export function renderWithProviders(
    ui:JSX.Element,
    {
        preloadedState = {},
        store = configureStore({
            reducer: rootReducer,
            preloadedState
        }),
        ...renderOptions
    } = {}
){
    function Wrapper({children}) {
        return <Provider store={store}>{children}</Provider>
    }

    return {store, ...render(ui, { wrapper: Wrapper, ...renderOptions})}
}
