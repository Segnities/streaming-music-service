
import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../utils-for-tests";
import App from "../App";
describe('Test app component', () => {
    it('Loader while data is loading', () => {
        renderWithProviders(<App />);
        expect(screen.getByTestId('app-loader')).toBeInTheDocument();
    });
});