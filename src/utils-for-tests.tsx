
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import type { RenderOptions } from "@testing-library/react";

import { PreloadedState } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { MemoryRouter } from "react-router";
import { RootState, AppStore, setupStore } from "./store";
import { PropsWithChildren } from "react";

import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export function renderWithReduxToolkit(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {

    setupListeners(store.dispatch);

    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>
            {children}
        </Provider>
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function renderWithReactRouter(path: string = '/', component: JSX.Element) {
    return (
        <MemoryRouter initialEntries={[path]}>
            <AppRouter />
            {component}
        </MemoryRouter>

    )
}