/**
 * Loop Stability & Safety Auto-Grading Test
 * 
 * This test simulates real-world scenarios like vision loss to verify
 * that the system remains stable and safe.
 */

const PIDController = require('../src/pid_logic');
const SafetyGuard = require('../src/safety_guard');

describe('Auto-Grading: Loop Stability & Safety', () => {
    
    test('Failsafe: System should stop if target is lost for too long', () => {
        const safety = new SafetyGuard(5); // 5 frames timeout
        let stopCommandSent = false;

        // Mock the emergency stop
        safety.sendEmergencyStop = () => {
            stopCommandSent = true;
        };

        // Simulate 4 lost frames - should NOT stop yet
        for (let i = 0; i < 4; i++) {
            safety.update(false);
        }
        expect(stopCommandSent).toBe(false);

        // Simulate 6th lost frame - SHOULD stop
        safety.update(false);
        safety.update(false);
        expect(stopCommandSent).toBe(true);
    });

    test('Recovery: System should resume when target reappears', () => {
        const safety = new SafetyGuard(5);
        safety.isSystemHalted = true; // Start in halted state
        
        const isSafe = safety.update(true); // Target found
        expect(isSafe).toBe(true);
        expect(safety.isSystemHalted).toBe(false);
    });

    test('Control Stability: Output should not explode with large errors', () => {
        const controller = new PIDController(10, 0, 0, -100, 100);
        const output = controller.compute(1000); // Massive error
        
        // Output must be capped at 100
        expect(output).toBeLessThanOrEqual(100);
        expect(output).toBeGreaterThan(0);
    });
});
