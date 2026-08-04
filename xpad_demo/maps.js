
export const ALPHA_NUMERIC_MAP = {
    // -------------------------------------------------------------
    // ROW 1: L_STK_UP (1)
    // -------------------------------------------------------------
    17:    { type: "predict", value: "(?:p)" },       // + R_STK_UP (16)
    33:    { type: "predict", value: "(?:g)" },       // + R_STK_RIGHT (32)
    65:    { type: "predict", value: "(?:y)" },       // + R_STK_DOWN (64)
    129:   { type: "predict", value: "(?:b)" },       // + R_STK_LEFT (128)
    1:     { type: "predict", value: "(?:a)" },       // + NULL Column
    257:   { type: "command", value: "PredUp" },      // + Y (256)
    513:   { type: "command", value: "ReplPred" },    // + B (512)
    1025:  { type: "command", value: "PredDwn" },     // + A (1024)
    2049:  { type: "command", value: "PredClr" },     // + X (2048)

    // -------------------------------------------------------------
    // ROW 2: L_STK_RIGHT (2)
    // -------------------------------------------------------------
    18:    { type: "predict", value: "(?:j|z)" },     // + R_STK_UP (16)
    34:    { type: "predict", value: "(?:c)" },       // + R_STK_RIGHT (32)
    66:    { type: "predict", value: "(?:d)" },       // + R_STK_DOWN (64)
    130:   { type: "predict", value: "(?:h)" },       // + R_STK_LEFT (128)
    2:     { type: "predict", value: "(?:t)" },       // + NULL Column
    258:   { type: "write",   value: "!" },           // + Y (256)
    514:   { type: "write",   value: "." },           // + B (512)
    1026:  { type: "write",   value: "," },           // + A (1024)
    2050:  { type: "write",   value: "?" },           // + X (2048)

    // -------------------------------------------------------------
    // ROW 3: L_STK_DOWN (4)
    // -------------------------------------------------------------
    20:    { type: "predict", value: "(?:l|q)" },     // + R_STK_UP (16)
    36:    { type: "predict", value: "(?:u)" },       // + R_STK_RIGHT (32)
    68:    { type: "predict", value: "(?:m)" },       // + R_STK_DOWN (64)
    132:   { type: "predict", value: "(?:f)" },       // + R_STK_LEFT (128)
    4:     { type: "predict", value: "(?:o)" },       // + NULL Column
    260:   { type: "write",   value: "]" },           // + Y (256)
    516:   { type: "write",   value: ")" },           // + B (512)
    1028:  { type: "write",   value: '"' },           // + A (1024)
    2052:  { type: "write",   value: "(" },           // + X (2048)

    // -------------------------------------------------------------
    // ROW 4: L_STK_LEFT (8)
    // -------------------------------------------------------------
    24:    { type: "predict", value: "(?:w)" },       // + R_STK_UP (16)
    40:    { type: "predict", value: "(?:k)" },       // + R_STK_RIGHT (32)
    72:    { type: "predict", value: "(?:x)" },       // + R_STK_DOWN (64)
    136:   { type: "predict", value: "(?:v)" },       // + R_STK_LEFT (128)
    8:     { type: "predict", value: "(?:r)" },       // + NULL Column
    264:   { type: "write",   value: "$" },           // + Y (256)
    520:   { type: "write",   value: "@" },           // + B (512)
    1032:  { type: "write",   value: "#" },           // + A (1024)
    2056:  { type: "command", value: "DEL" },         // + X (2048)

    // -------------------------------------------------------------
    // ROW 5: NULL Row (0 Primary Stick Active)
    // -------------------------------------------------------------
    16:    { type: "predict", value: "(?:s)" },       // Just R_STK_UP
    32:    { type: "predict", value: "(?:e)" },       // Just R_STK_RIGHT
    64:    { type: "predict", value: "(?:i)" },       // Just R_STK_DOWN
    128:   { type: "predict", value: "(?:n)" },       // Just R_STK_LEFT
    256:   { type: "command", value: "TAB" },         // Just Y
    512:   { type: "command", value: "SPACE" },       // Just B
    1024:  { type: "command", value: "ENTER" },       // Just A
    2048:  { type: "command", value: "BKSPC" },       // Just X

    // -------------------------------------------------------------
    // ROW 6: DPAD_UP (4096)
    // -------------------------------------------------------------
    4112:  { type: "write",   value: "1" },           // + R_STK_UP (16)
    4128:  { type: "write",   value: "2" },           // + R_STK_RIGHT (32)
    4160:  { type: "write",   value: "3" },           // + R_STK_DOWN (64)
    4224:  { type: "write",   value: "4" },           // + R_STK_LEFT (128)
    4096:  { type: "command", value: "ARROW_UP" },    // + NULL Column
    4352:  { type: "write",   value: ";" },           // + Y (256)
    4608:  { type: "write",   value: ">" },           // + B (512)
    5120:  { type: "write",   value: ":" },           // + A (1024)
    6144:  { type: "write",   value: "<" },           // + X (2048)

    // -------------------------------------------------------------
    // ROW 7: DPAD_RIGHT (8192)
    // -------------------------------------------------------------
    8208:  { type: "write",   value: "5" },           // + R_STK_UP (16)
    8224:  { type: "write",   value: "6" },           // + R_STK_RIGHT (32)
    8256:  { type: "write",   value: "7" },           // + R_STK_DOWN (64)
    8320:  { type: "write",   value: "8" },           // + R_STK_LEFT (128)
    8192:  { type: "command", value: "ARROW_RIGHT" }, // + NULL Column
    8448:  { type: "write",   value: "=" },           // + Y (256)
    8704:  { type: "write",   value: "]" },           // + B (512)
    9216:  { type: "write",   value: "&" },           // + A (1024)
    10240: { type: "write",   value: "[" },           // + X (2048)

    // -------------------------------------------------------------
    // ROW 8: DPAD_DOWN (16384)
    // -------------------------------------------------------------
    16400: { type: "write",   value: "9" },          // + R_STK_UP (16)
    16416: { type: "write",   value: "%" },          // + R_STK_RIGHT (32)
    16448: { type: "write",   value: "0" },          // + R_STK_DOWN (64)
    16512: { type: "write",   value: "-" },          // + R_STK_LEFT (128)
    16384: { type: "command", value: "ARROW_DOWN" }, // + NULL Column
    16640: { type: "write",   value: "~" },          // + Y (256)
    16896: { type: "write",   value: "}" },          // + B (512)
    17408: { type: "write",   value: "_" },          // + A (1024)
    18432: { type: "write",   value: "{" },          // + X (2048)

    // -------------------------------------------------------------
    // ROW 9: DPAD_LEFT (32768)
    // -------------------------------------------------------------
    32784: { type: "write",   value: "*" },          // + R_STK_UP (16)
    32800: { type: "write",   value: "+" },          // + R_STK_RIGHT (32)
    32832: { type: "write",   value: "." },          // + R_STK_DOWN (64)
    32896: { type: "write",   value: "-" },          // + R_STK_LEFT (128)
    32768: { type: "command", value: "ARROW_LEFT" }, // + NULL Column
    33024: { type: "write",   value: "|" },          // + Y (256)
    33280: { type: "write",   value: "\\" },         // + B (512)
    33792: { type: "write",   value: "^" },          // + A (1024)
    34816: { type: "write",   value: "/" },          // + X (2048)

    // -------------------------------------------------------------
    // ROW 10: R_TRIG (524288)
    // -------------------------------------------------------------
    524288: { type: "command", value: 'PredSlct' } // Column 5 (NULL Stick Active)
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

export const FUNCTION_MAP = {
    // -------------------------------------------------------------
    // ROW 1: L_STK_UP (1)
    // -------------------------------------------------------------
    17:    { type: "command", value: "UpcW" },       // + R_STK_UP (16)
    33:    { type: "command", value: "UpcP" },       // + R_STK_RIGHT (32)
    65:    { type: "command", value: "UpcA" },       // + R_STK_DOWN (64)
    129:   { type: "command", value: "UpcS" },       // + R_STK_LEFT (128)
    1:     { type: "command", value: "noop" },       // + NULL Column
    257:   { type: "command", value: "noop" },       // + Y (256)
    513:   { type: "command", value: "noop" },       // + B (512)
    1025:  { type: "command", value: "noop" },       // + A (1024)
    2049:  { type: "command", value: "noop" },       // + X (2048)

    // -------------------------------------------------------------
    // ROW 2: L_STK_RIGHT (2)
    // -------------------------------------------------------------
    18:    { type: "command", value: "SlctAll" },    // + R_STK_UP (16)
    34:    { type: "command", value: "SlctLn" },     // + R_STK_RIGHT (32)
    66:    { type: "command", value: "noop" },       // + R_STK_DOWN (64)
    130:   { type: "command", value: "noop" },       // + R_STK_LEFT (128)
    2:     { type: "command", value: "noop" },       // + NULL Column
    258:   { type: "command", value: "noop" },       // + Y (256)
    514:   { type: "command", value: "noop" },       // + B (512)
    1026:  { type: "command", value: "noop" },       // + A (1024)
    2050:  { type: "command", value: "noop" },       // + X (2048)

    // -------------------------------------------------------------
    // ROW 3: L_STK_DOWN (4)
    // -------------------------------------------------------------
    20:    { type: "command", value: "Save" },       // + R_STK_UP (16)
    36:    { type: "command", value: "Find" },       // + R_STK_RIGHT (32)
    68:    { type: "command", value: "noop" },       // + R_STK_DOWN (64)
    132:   { type: "command", value: "noop" },       // + R_STK_LEFT (128)
    4:     { type: "command", value: "noop" },       // + NULL Column
    260:   { type: "command", value: "noop" },       // + Y (256)
    516:   { type: "command", value: "noop" },       // + B (512)
    1028:  { type: "command", value: "noop" },       // + A (1024)
    2052:  { type: "command", value: "noop" },       // + X (2048)

    // -------------------------------------------------------------
    // ROW 4: L_STK_LEFT (8)
    // -------------------------------------------------------------
    24:    { type: "command", value: "PRTSCR" },     // + R_STK_UP (16)
    40:    { type: "command", value: "Calc" },       // + R_STK_RIGHT (32)
    72:    { type: "command", value: "INS" },        // + R_STK_DOWN (64)
    136:   { type: "command", value: "BRK" },        // + R_STK_LEFT (128)
    8:     { type: "command", value: "noop" },       // + NULL Column
    264:   { type: "command", value: "noop" },       // + Y (256)
    520:   { type: "command", value: "noop" },       // + B (512)
    1032:  { type: "command", value: "noop" },       // + A (1024)
    2056:  { type: "command", value: "noop" },       // + X (2048)

    // -------------------------------------------------------------
    // ROW 5: NULL Row (0 Primary Stick Active)
    // -------------------------------------------------------------
    16:    { type: "command", value: "PGUP" },       // Just R_STK_UP
    32:    { type: "command", value: "END" },        // Just R_STK_RIGHT
    64:    { type: "command", value: "PGDN" },       // Just R_STK_DOWN
    128:   { type: "command", value: "HOME" },       // Just R_STK_LEFT
    0:     { type: "command", value: "noop" },       // Pure NULL (No input)
    256:   { type: "command", value: "Cut" },        // Just Y
    512:   { type: "command", value: "Paste" },      // Just B
    1024:  { type: "command", value: "Copy" },       // Just A
    2048:  { type: "command", value: "Undo" },       // Just X

    // -------------------------------------------------------------
    // ROW 6: DPAD_UP (4096)
    // -------------------------------------------------------------
    4112:  { type: "command", value: "ESC" },        // + R_STK_UP (16)
    4128:  { type: "command", value: "ALTTAB" },     // + R_STK_RIGHT (32)
    4160:  { type: "command", value: "WIN" },        // + R_STK_DOWN (64)
    4224:  { type: "command", value: "SHFTAB" },     // + R_STK_LEFT (128)
    4096:  { type: "command", value: "SWFwd" },      // + NULL Column
    4352:  { type: "command", value: "F1" },         // + Y (256)
    4608:  { type: "command", value: "F2" },         // + B (512)
    5120:  { type: "command", value: "F3" },         // + A (1024)
    6144:  { type: "command", value: "F4" },         // + X (2048)

    // -------------------------------------------------------------
    // ROW 7: DPAD_RIGHT (8192)
    // -------------------------------------------------------------
    8208:  { type: "command", value: "S_CTRL" },     // + R_STK_UP (16)
    8224:  { type: "command", value: "noop" },       // + R_STK_RIGHT (32)
    8256:  { type: "command", value: "CTRL" },       // + R_STK_DOWN (64)
    8320:  { type: "command", value: "noop" },       // + R_STK_LEFT (128)
    8192:  { type: "command", value: "WFwd" },       // + NULL Column
    8448:  { type: "command", value: "F5" },         // + Y (256)
    8704:  { type: "command", value: "F6" },         // + B (512)
    9216:  { type: "command", value: "F7" },         // + A (1024)
    10240: { type: "command", value: "F8" },         // + X (2048)

    // -------------------------------------------------------------
    // ROW 8: DPAD_DOWN (16384)
    // -------------------------------------------------------------
    16400: { type: "command", value: "S_SHFT" },     // + R_STK_UP (16)
    16416: { type: "command", value: "noop" },       // + R_STK_RIGHT (32)
    16448: { type: "command", value: "SHFT" },       // + R_STK_DOWN (64)
    16512: { type: "command", value: "noop" },       // + R_STK_LEFT (128)
    16384: { type: "command", value: "SWBck" },      // + NULL Column
    16640: { type: "command", value: "F9" },         // + Y (256)
    16896: { type: "command", value: "F10" },        // + B (512)
    17408: { type: "command", value: "F11" },        // + A (1024)
    18432: { type: "command", value: "F12" },        // + X (2048)

    // -------------------------------------------------------------
    // ROW 9: DPAD_LEFT (32768)
    // -------------------------------------------------------------
    32784: { type: "command", value: "S_ALT" },      // + R_STK_UP (16)
    32800: { type: "command", value: "noop" },       // + R_STK_RIGHT (32)
    32832: { type: "command", value: "ALT" },        // + R_STK_DOWN (64)
    32896: { type: "command", value: "noop" },       // + R_STK_LEFT (128)
    32768: { type: "command", value: "WBck" },       // + NULL Column
    33024: { type: "command", value: "F13" },        // + Y (256)
    33280: { type: "command", value: "F14" },        // + B (512)
    33792: { type: "command", value: "F15" },        // + A (1024)
    34816: { type: "command", value: "F16" }         // + X (2048)
};
