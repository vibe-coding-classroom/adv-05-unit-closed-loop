/**
 * Safety Guard Module
 * 
 * Implements Failsafe mechanisms to prevent "blind driving" when vision is lost.
 */

class SafetyGuard {
    constructor(timeoutFrames = 10) {
        this.timeoutFrames = timeoutFrames;
        this.framesSinceLastTarget = 0;
        this.isSystemHalted = false;
    }

    /**
     * Update the frame counter and check for safety violations.
     * @param {boolean} targetDetected - Whether the target was seen in the current frame.
     * @returns {boolean} True if system is safe, false if failsafe triggered.
     */
    update(targetDetected) {
        if (targetDetected) {
            this.framesSinceLastTarget = 0;
            if (this.isSystemHalted) {
                console.log("Target regained. System recovering...");
                this.isSystemHalted = false;
            }
        } else {
            this.framesSinceLastTarget++;
        }

        // Implement "Vision Loss" detection logic.
        // If framesSinceLastTarget exceeds timeoutFrames, trigger failsafe.
        if (this.framesSinceLastTarget >= this.timeoutFrames) {
            this.triggerFailsafe();
            return false;
        }

        return true;
    }

    triggerFailsafe() {
        if (!this.isSystemHalted) {
            console.warn("CRITICAL: Vision lost! Triggering Emergency Stop.");
            this.sendEmergencyStop();
            this.isSystemHalted = true;
        }
    }

    sendEmergencyStop() {
        // Mock function to represent sending a stop command to the hardware
        console.log("Sending command: { steer: 0, throttle: 0 }");
    }
}

if (typeof module !== 'undefined') {
    module.exports = SafetyGuard;
}
