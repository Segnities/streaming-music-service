import { screen } from "@testing-library/react";

import { test, expect, describe } from "vitest";
import AppTemplate from "../templates/AppTemplate";
import { renderWithProviders } from "../utils-for-tests";

import { MemoryRouter } from "react-router";

import TopArtists from "../pages/TopArtists";

import AppRouter from "../templates/AppTemplate";
import Discover from "../pages/Discover";


describe('Testing both templates', () => {
    test('Template container', async () => {
        renderWithProviders(<MemoryRouter initialEntries={['/']}>
            <AppRouter />
        </MemoryRouter>
        );
        expect(await screen.findByTestId('template-id')).toBeInTheDocument();
    })
})

describe('Integration with React Router AppRouter template', () => {
    test('Discover page by id', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/']}>
                <AppRouter />
            </MemoryRouter>
        )
        const expectedId = await screen.findByTestId('discoverPage');

        expect(expectedId).toBeInTheDocument();


    })

    test('Top Artists page by id', async () => {
            renderWithProviders(
            <MemoryRouter initialEntries={['/top-charts']}>
                <AppRouter/>
            </MemoryRouter>
            )
        const expectedId = await screen.findByTestId('top-charts-page');

        expect(expectedId).toBeInTheDocument();
     })
        


    test('Loader of Top Artists page', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/top-artists']}>
                <TopArtists />
            </MemoryRouter>
        );
        expect(await screen.queryByText(/Loading/i)).toBeInTheDocument();
    });

    test('Around You page by id', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/around-you']}>
                <AppRouter />
            </MemoryRouter>
        );
        expect(screen.getByTestId('around-you-page')).toBeInTheDocument();

    });

    test('Not found page by id', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={['/asdcvzxc']}>
                <AppTemplate />
            </MemoryRouter>
        );
        expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
});