
import {describe, expect, test} from "vitest";
import {screen} from "@testing-library/react";

import {renderWithProviders} from "./utils-for-tests";
import App from "./App";
describe('Simple tests', ()=> {
    test('1 + 1 = 2', ()=> {
        expect(1 + 1).toBe(2);
    });
    test('Test after creating tests util', ()=> {
        renderWithProviders(<App/>);
        expect(screen.getByTestId('app-loader')).toBeInTheDocument();
    })
})