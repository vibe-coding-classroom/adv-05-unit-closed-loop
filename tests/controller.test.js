/**
 * Automated Stability and Linearity Tests
 * 
 * Verifies that the control output is proportional to the error and
 * correctly clipped by the saturation limits.
 */

const PIDController = require('../src/pid_logic');

describe('PIDController Stability & Linearity', () => {
    let controller;

    beforeEach(() => {
        // Initialize with Kp = 2.0, Saturation at [-100, 100]
        controller = new PIDController(2.0, 0, 0, -100, 100);
    });

    test('Linear Output: Output should be error * Kp', () => {
        const error = 10;
        const expectedOutput = 20; // 10 * 2.0
        expect(controller.compute(error)).toBe(expectedOutput);
    });

    test('Positive Saturation: Output should not exceed maxOutput', () => {
        const error = 100; // 100 * 2.0 = 200, should be clipped to 100
        expect(controller.compute(error)).toBe(100);
    });

    test('Negative Saturation: Output should not be below minOutput', () => {
        const error = -100; // -100 * 2.0 = -200, should be clipped to -100
        expect(controller.compute(error)).toBe(-100);
    });

    test('Zero Error: Output should be zero', () => {
        expect(controller.compute(0)).toBe(0);
    });
});
