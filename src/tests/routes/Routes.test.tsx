import { describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithReduxToolkit, renderWithReactRouter } from "../../utils-for-tests";

import { waitFor } from "@testing-library/react";
import Discover from "../../pages/Discover";

describe('Test', () => {

    test('Discover page', async () => {
        renderWithReduxToolkit(renderWithReactRouter('/', <Discover />))

        expect(screen.queryByText(/loading/i)).toBeInTheDocument();
        screen.debug();

        await waitFor(() => screen.getByTestId('discoverPage'));
        expect(screen.getByTestId('discoverPage')).toBeInTheDocument();
        screen.debug();
    });
})