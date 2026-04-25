/**
 * PID Controller Logic
 * 
 * This module implements the core control logic for the closed-loop system.
 * Students need to implement the compute method with Proportional control and Saturation.
 */

class PIDController {
    constructor(kp, ki, kd, minOutput, maxOutput) {
        this.kp = kp || 0;
        this.ki = ki || 0;
        this.kd = kd || 0;
        this.minOutput = minOutput || -100;
        this.maxOutput = maxOutput || 100;
        
        this.prevError = 0;
        this.integral = 0;
    }

    /**
     * Compute the control output based on the error.
     * @param {number} error - The difference between setpoint and current value.
     * @returns {number} The control output.
     */
    compute(error) {
        // TODO: Implement P-control logic: output = error * Kp
        // TODO: Handle Saturation (clipping the output between minOutput and maxOutput)
        
        let output = 0;
        
        // Your code here...
        
        return output;
    }

    setKp(kp) {
        this.kp = kp;
    }
}

if (typeof module !== 'undefined') {
    module.exports = PIDController;
}
