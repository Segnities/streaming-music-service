import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithReduxToolkit, renderWithReactRouter } from "../../utils-for-tests";

import { waitFor } from "@testing-library/react";


import Discover from "../../pages/Discover";
import TopCharts from "../../pages/TopCharts";
import TopArtists from "../../pages/TopArtists";
import AroundYou from "../../pages/AroundYou";
import Artist from "../../pages/Artist";


describe('Testing Discover route', () => {
    test('Get Loader before data fetching', () => {
        renderWithReduxToolkit(renderWithReactRouter('/', <Discover />));
        expect(screen.queryByText(/loading/i)).toBeInTheDocument();
    });
    test('Get test-id after data was fetching', async () => {
        renderWithReduxToolkit(renderWithReactRouter('/', <Discover />));

        await waitFor(() => screen.getByTestId('discoverPage'));
        expect(screen.getByTestId('discoverPage')).toBeInTheDocument();
    })
});


describe('Testing TopCharts route', () => {
    test('Get Loader before data fetching', () => {
        renderWithReduxToolkit(renderWithReactRouter('/tasdd', <TopCharts />));

        expect(screen.queryByText(/loading/i)).toBeInTheDocument();
    });

    test('Get test-id after data was fetching', async () => {
        renderWithReduxToolkit(renderWithReactRouter('/top-charts', <TopCharts />));

        await waitFor(() => screen.getByTestId('top-charts-page'));
        expect(screen.getByTestId('top-charts-page')).toBeInTheDocument();
    });
});

describe('Testing TopArtists route', () => {
    test('Get Loader before data fetching', () => {
        renderWithReduxToolkit(renderWithReactRouter('/top-artists', <TopArtists />));

        expect(screen.queryByText(/loading/i)).toBeInTheDocument();

    });

    test('Get test-id after data was fetching', async () => {
        renderWithReduxToolkit(renderWithReactRouter('/top-artists', <TopArtists />));

        await waitFor(() => screen.getByTestId('top-artists-page'));
        expect(screen.getByTestId('top-artists-page')).toBeInTheDocument();

    })

});

describe('Testing AroundYou route', () => {
    test('Get Loader before data fetching', () => {
        renderWithReduxToolkit(renderWithReactRouter('/around-you', <AroundYou />));

        expect(screen.queryByText(/around you/i)).toBeInTheDocument();

    });

    test('Get test-id after data was fetching', async () => {
        renderWithReduxToolkit(renderWithReactRouter('/around-you', <AroundYou />));

        await waitFor(() => screen.getByTestId('around-you-page'));
        expect(screen.getByTestId('around-you-page')).toBeInTheDocument();
    });

});
/* 
describe('Testing Artist page', () => {
    renderWithReduxToolkit(renderWithReactRouter('/artist/136975', <Artist />));
    expect(screen.queryByText(/loading/i)).toBeInTheDocument();
}); */