import {screen} from "@testing-library/react";

import {test, expect, describe} from "vitest";
import AppTemplate from "./templates/AppTemplate";
import {renderWithProviders} from "./utils-for-tests";

import {MemoryRouter} from "react-router";

import Discover from "./pages/Discover";
import AroundYou from "./pages/AroundYou";
import TopArtists from "./pages/TopArtists";

describe('Integration with React Router AppRouter template', () => {
    test('Discover page', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <Discover/>
            </MemoryRouter>
        );
        const expectedId = await screen.findByTestId('discover-page');
        expect(expectedId).toBeInTheDocument();
    });

    test('Top Artists page', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/top-artists']}>
                <TopArtists/>
            </MemoryRouter>
        );
        const expectedId = screen.getByTestId('top-artists-page');
        expect(expectedId).toBeInTheDocument();
        screen.debug();
    });

    test('AroundYou page', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/around-you']}>
                <AroundYou />
            </MemoryRouter>
        );
        expect(screen.getByTestId('around-you-page')).toBeInTheDocument();

    });

    test('Not found page', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/asdcvzxc']}>
                <AppTemplate/>
            </MemoryRouter>
        );
        expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
});