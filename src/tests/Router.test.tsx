import { describe, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import Discover from "../pages/Discover";
import { renderWithReactRouter, renderWithReduxToolkit } from "../utils-for-tests";

describe('Routes', () => {

    test('Discover', async () => {
        renderWithReduxToolkit(renderWithReactRouter('/', <Discover />));
        const text = screen.queryByText(/Loading songs/i);
        const pageId = screen.queryByTestId('discoverPage');
        
        expect(text).toBeInTheDocument();

        await waitFor(() => expect(pageId).toBeInTheDocument());

        screen.debug();

    });

})