import { test, describe } from "vitest";
import { getTime } from "../../utils/getTime";

describe('Testing getTime util', () => {
    test('Always string', () => {
        expectTypeOf(getTime(100)).toEqualTypeOf<string>();
    });
    test('Must convert 100s to 1:40', () => {
        expect(getTime(100)).toBe('1:40')
    });
    test('Must contain : (semicolon)', () => {
        expect(getTime(100)).toMatch(/:/i);
    });
    test('Must have 0 in seconds if seconds less than 9', () => {
        expect(getTime(1)).toBe('0:01')
    })
})