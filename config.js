/**
 * 💖 VALENTINE CONFIG FILE 💖
 * ─────────────────────────────────────────────
 * Everything you need to customize is RIGHT HERE.
 * No coding knowledge required — just change the values below!
 * ─────────────────────────────────────────────
 */

const CONFIG = {

    // ─── Names ─────────────────────────────────
    partnerName: "Hermione",        // 💌 Your partner's name
    yourName: "Harry",       // 💌 Your name

    // ─── Proposal Message ──────────────────────
    // Shown under the main question. Use {partnerName} and {yourName} as placeholders.
    customMessage: "Every moment with you feels like a fairytale. You make my world brighter, my laugh louder, and my heart fuller. 🌸",

    // ─── Date Locations ────────────────────────
    // One of these will be picked at random when they say YES!
    dateLocations: [
        "a candlelit dinner in Paris 🗼",
        "a cozy picnic under the stars 🌟",
        "a sunset stroll on the beach 🌅",
        "a cute little café downtown ☕",
        "a movie night under the open sky 🎬",
        "a hot air balloon ride 🎈",
    ],

    // ─── Theme Colors ──────────────────────────
    // Main accent color (used for buttons, glows, highlights)
    themeColor: "#ff6b9d",   // Pink-rose

    // Second accent color (used for gradients, secondary glows)
    themeColorAlt: "#ff9ec4",   // Soft pink

    // Page background gradient  (CSS gradient string)
    backgroundGradient: "linear-gradient(135deg, #fff0f5 0%, #ffe4ef 40%, #ffd6e8 100%)",

    // ─── Music ─────────────────────────────────
    musicEnabled: true,            // true = show music toggle button; false = hide it
    musicFile: "music.mp3",     // Path to your audio file (place it in the same folder)
    // 🎵 Tip: Drop any .mp3 into the project folder and update the filename above.
    //         Recommended: a soft lo-fi or piano piece (~2-3 min, looped automatically).

    // ─── Playful "No" Button Messages ──────────
    // These cycle through when the sneaky NO button is hovered / clicked.
    noButtonMessages: [
        "Think again 💭",
        "Are you sure? 🥺",
        "Pretty please? 🌸",
        "That can't be right… 😢",
        "Come on… 🥹",
        "My heart says otherwise 💔",
        "Nooo, try again! 😤",
        "One more chance? 🫶",
    ],

    // ─── Particle Count ────────────────────────
    // Number of floating hearts in the background (10–60 recommended)
    floatingHeartsCount: 28,

    // ─── Confetti Burst ────────────────────────
    // Number of confetti/heart particles on the YES celebration
    celebrationParticleCount: 80,

};