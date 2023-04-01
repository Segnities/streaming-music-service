import { screen } from "@testing-library/react";
import { describe, expect } from "vitest";

import App from "../App";

import { renderWithReduxToolkit } from "../utils-for-tests";

describe('<App/>', () => {
    test('loader', () => {
        renderWithReduxToolkit(<App />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
        screen.debug();
    });
});