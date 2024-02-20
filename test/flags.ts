// Define flags
const FLAG_A = 1; // 0001
const FLAG_B = 2; // 0010
const FLAG_C = 4; // 0100
const FLAG_D = 8; // 1000

// Set flags
let flags = FLAG_A | FLAG_B; // 0011

// Check if a flag is set
let isFlagASet = (flags & FLAG_A) !== 0; // true
let isFlagBSet = (flags & FLAG_B) !== 0; // true
let isFlagCSet = (flags & FLAG_C) !== 0; // false

// Set another flag
flags |= FLAG_C; // 0111

// Unset a flag
flags &= ~FLAG_A; // 0110

// Toggle a flag
flags ^= FLAG_B; // 0100