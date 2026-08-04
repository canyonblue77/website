// Application State Tracking
const state = {
    controllerIndex: null,
    previousButtons: {},
    currentChord: 0,
    isChordActive: false,
    frameHistory: [],
    releaseTimeout: null,
    isFunctionMode: false // Mode Tracking (L_TRIG by itself toggles this flag)
};

// Tunable values
const AXIS_THRESHOLD = 0.5;
let buffer = 8; // Recommended max is 10
let decay_timeout = Math.round(buffer * 16.25);

// UI Element Cache
const ui = {
    status: document.getElementById('controller-status'),
    output: document.getElementById('output-box'),
    carousel: document.getElementById('prediction-carousel'),
    bitstring: document.getElementById('bitstring-display'),
    activeInputs: document.getElementById('active-inputs-display'),
    currentMatch: document.getElementById('current-match-display')
};

// Your exact sequential bit mapping array configuration from the reference table
const BIT_MAPPING = [
    { label: "L_STK_UP", bitValue: 1 << 0, type: "axis", axis: 1, direction: -1, stick: "left" },       // 1
    { label: "L_STK_RIGHT", bitValue: 1 << 1, type: "axis", axis: 0, direction: 1, stick: "left" },     // 2
    { label: "L_STK_DOWN", bitValue: 1 << 2, type: "axis", axis: 1, direction: 1, stick: "left" },      // 4
    { label: "L_STK_LEFT", bitValue: 1 << 3, type: "axis", axis: 0, direction: -1, stick: "left" },     // 8
    { label: "R_STK_UP", bitValue: 1 << 4, type: "axis", axis: 3, direction: -1, stick: "right" },      // 16
    { label: "R_STK_RIGHT", bitValue: 1 << 5, type: "axis", axis: 2, direction: 1, stick: "right" },    // 32
    { label: "R_STK_DOWN", bitValue: 1 << 6, type: "axis", axis: 3, direction: 1, stick: "right" },     // 64
    { label: "R_STK_LEFT", bitValue: 1 << 7, type: "axis", axis: 2, direction: -1, stick: "right" },    // 128

    { label: "Y", bitValue: 1 << 8, type: "button", gamepadIndex: 3 },                                  // 256
    { label: "B", bitValue: 1 << 9, type: "button", gamepadIndex: 1 },                                  // 512
    { label: "A", bitValue: 1 << 10, type: "button", gamepadIndex: 0 },                                 // 1024
    { label: "X", bitValue: 1 << 11, type: "button", gamepadIndex: 2 },                                 // 2048
    { label: "DPAD_UP", bitValue: 1 << 12, type: "button", gamepadIndex: 12 },                          // 4096
    { label: "DPAD_RIGHT", bitValue: 1 << 13, type: "button", gamepadIndex: 15 },                       // 8192
    { label: "DPAD_DOWN", bitValue: 1 << 14, type: "button", gamepadIndex: 13 },                        // 16384
    { label: "DPAD_LEFT", bitValue: 1 << 15, type: "button", gamepadIndex: 14 },                        // 32768
    { label: "L_BUMP", bitValue: 1 << 16, type: "button", gamepadIndex: 4 },                            // 65536
    { label: "R_BUMP", bitValue: 1 << 17, type: "button", gamepadIndex: 5 },                            // 131072
    { label: "L_TRIG", bitValue: 1 << 18, type: "button", gamepadIndex: 6 },                            // 262144
    { label: "R_TRIG", bitValue: 1 << 19, type: "button", gamepadIndex: 7 },                            // 524288
    { label: "L_STK_IN", bitValue: 1 << 20, type: "button", gamepadIndex: 10 },                         // 1048576
    { label: "R_STK_IN", bitValue: 1 << 21, type: "button", gamepadIndex: 11 },                         // 2097152
    { label: "START", bitValue: 1 << 22, type: "button", gamepadIndex: 8 },                             // 4194304
    { label: "MENU", bitValue: 1 << 23, type: "button", gamepadIndex: 9 }                               // 8388608
];

import { ALPHA_NUMERIC_MAP, FUNCTION_MAP } from './maps.js';

window.addEventListener("gamepadconnected", (e) => {
    ui.status.innerText = `Controller Connected: ${e.gamepad.id}`;
    state.controllerIndex = e.gamepad.index;
    runLoop();
});

window.addEventListener("gamepaddisconnected", (e) => {
    if (state.controllerIndex === e.gamepad.index) {
        ui.status.innerText = "Controller Disconnected.";
        state.controllerIndex = null;
        ui.bitstring.innerText = "000000000000000000000000";
        ui.activeInputs.innerText = "No inputs detected";
    }
});

function countActiveBits(number) {
    return (number.toString(2).match(/1/g) || []).length;
}

// Visual layout helper to map integer to 24-character telemetry layout
function formatBitstring(value) {
    return value.toString(2).padStart(24, '0');
}

function onChordReleased(finalIntegerChord) {
    // 1. LEFT TRIGGER MODE SWITCHING GATING
    if (finalIntegerChord === 262144) {
        state.isFunctionMode = !state.isFunctionMode;
        ui.status.innerText = `Mode Switched: ${state.isFunctionMode ? "FUNCTION MODE" : "ALPHA NUMERIC"}`;
        ui.status.style.color = state.isFunctionMode ? "#ffcc00" : "var(--xbox-green)";
        return;
    }

    // 2. CHORD LAYER MATCH EVALUATION
    const activeMap = state.isFunctionMode ? FUNCTION_MAP : ALPHA_NUMERIC_MAP;
    const match = activeMap ? activeMap[finalIntegerChord] : null;

    if (match) {
        if (match.type === "predict") {
            ui.output.innerText += `${match.value}`;
        } else if (match.type === "write") {
            ui.output.innerText += match.value;
        } else if (match.type === "command") {
            ui.output.innerText += `\n<${match.value}>\n`;
        }
    } else {
        // Trace logging for troubleshooting unassigned combinations
        let decodedLabels = [];
        BIT_MAPPING.forEach((bit) => {
            if ((finalIntegerChord & bit.bitValue) === bit.bitValue) {
                decodedLabels.push(bit.label);
            }
        });
        const labelsString = decodedLabels.length > 0 ? ` (${decodedLabels.join(' + ')})` : "";
        ui.output.innerText += `\n[Unmapped: ${finalIntegerChord}${labelsString}]\n`;
    }
}

function runLoop() {
    if (state.controllerIndex === null) return;

    const gamepads = navigator.getGamepads();
    const gp = gamepads[state.controllerIndex];

    if (!gp || !gp.axes || !gp.buttons) {
        requestAnimationFrame(runLoop);
        return;
    }

    let frameStateInteger = 0;
    let activeLabels = [];

    const leftStickDominantAxis = Math.abs(gp.axes[0] || 0) >= Math.abs(gp.axes[1]) ? 0 : 1;
    const rightStickDominantAxis = Math.abs(gp.axes[2] || 0) >= Math.abs(gp.axes[3]) ? 2 : 3;

    BIT_MAPPING.forEach((bit) => {
        let isActivated = false;

        if (bit.type === "axis") {
            const axisValue = gp.axes[bit.axis];
            if (axisValue !== undefined) {
                const activeDominantAxis = (bit.stick === "left") ? leftStickDominantAxis : rightStickDominantAxis;
                if (bit.axis === activeDominantAxis) {
                    if (bit.direction === 1 && axisValue > AXIS_THRESHOLD) isActivated = true;
                    if (bit.direction === -1 && axisValue < -AXIS_THRESHOLD) isActivated = true;
                }
            }
        } else if (bit.gamepadIndex !== undefined) {
            const btn = gp.buttons[bit.gamepadIndex];
            if (btn && btn.pressed) isActivated = true;
        }

        if (isActivated) {
            frameStateInteger |= bit.bitValue;
            activeLabels.push(`[${bit.label}]`);
        }
    });

    // --- TWO-STAGE WINDOW FILTER ENGINE ---
    const activeMap = state.isFunctionMode ? FUNCTION_MAP : ALPHA_NUMERIC_MAP;
    const currentMatch = activeMap[frameStateInteger] || null;

    if (frameStateInteger > 0) {
        if (state.releaseTimeout) {
            clearTimeout(state.releaseTimeout);
            state.releaseTimeout = null;
        }
        state.isChordActive = true;
        state.currentChord = frameStateInteger;

        state.frameHistory.push(frameStateInteger);

        // FIX: Replaced buffer_size with buffer variable
        if (state.frameHistory.length > buffer) {
            state.frameHistory.shift();
        }

        // Show live bit flags running in telemetry monitor
        ui.bitstring.innerText = formatBitstring(frameStateInteger);
        ui.bitstring.style.color = "var(--xbox-green)";
        ui.activeInputs.innerText = activeLabels.join(' ');
        ui.currentMatch.innerText = currentMatch ? currentMatch.value : "No match";
    } else {
        ui.currentMatch.innerText = "No active chord";
        if (state.isChordActive && !state.releaseTimeout) {
            state.releaseTimeout = setTimeout(() => {
                let targetChord = 0;
                let maxComplexity = 0;

                for (let i = 0; i < state.frameHistory.length; i++) {
                    const complexity = countActiveBits(state.frameHistory[i]);
                    if (complexity >= maxComplexity) {
                        maxComplexity = complexity;
                        targetChord = state.frameHistory[i];
                    }
                }

                if (targetChord > 0) {
                    onChordReleased(targetChord);
                }

                state.frameHistory = [];
                state.currentChord = 0;
                state.isChordActive = false;
                state.releaseTimeout = null;
            }, decay_timeout);
        }

        if (!state.isChordActive) {
            ui.bitstring.innerText = "000000000000000000000000";
            ui.bitstring.style.color = "var(--text-muted)";
            ui.activeInputs.innerText = "No inputs detected";
            ui.currentMatch.innerText = "No active chord";
        }
    }

    for (let i = 0; i < gp.buttons.length; i++) {
        state.previousButtons[i] = gp.buttons[i].pressed;
    }

    requestAnimationFrame(runLoop);

}