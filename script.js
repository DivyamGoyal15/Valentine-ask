/**
 * 💖 VALENTINE WEBSITE — script.js
 * ─────────────────────────────────────────────
 * All runtime logic: DOM injection, animations,
 * floating hearts canvas, confetti, NO-button
 * avoidance, custom cursor, music toggle.
 *
 * Reads everything from CONFIG (config.js).
 * No hardcoded values in this file.
 * ─────────────────────────────────────────────
 */

'use strict';

/* ═══════════════════════════════════════════════
   1. WAIT FOR DOM
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

    applyTheme();
    injectNames();
    setupFloatingHearts();
    setupCustomCursor();
    setupProposalButtons();
    setupRestartButton();
    if (CONFIG.musicEnabled) setupMusic();

});


/* ═══════════════════════════════════════════════
   2. THEME — inject CSS variables from config
═══════════════════════════════════════════════ */
function applyTheme() {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', CONFIG.themeColor);
    root.style.setProperty('--color-primary-alt', CONFIG.themeColorAlt);
    root.style.setProperty('--bg-gradient', CONFIG.backgroundGradient);
    document.body.style.background = CONFIG.backgroundGradient;

    // Dynamic page title
    document.title = `💖 Will you be my Valentine, ${CONFIG.partnerName}?`;
}


/* ═══════════════════════════════════════════════
   3. NAME / TEXT INJECTION
═══════════════════════════════════════════════ */
function injectNames() {
    // Proposal screen
    document.getElementById('partnerNameDisplay').textContent = CONFIG.partnerName;
    document.getElementById('yourNameDisplay').textContent = CONFIG.yourName;

    // Custom message with placeholder replacement
    const msg = CONFIG.customMessage
        .replace(/{partnerName}/g, CONFIG.partnerName)
        .replace(/{yourName}/g, CONFIG.yourName);
    document.getElementById('customMessage').textContent = msg;

    // Celebration screen
    document.getElementById('celebPartnerName').textContent = CONFIG.partnerName;
    document.getElementById('celebYourName').textContent = CONFIG.yourName;
}


/* ═══════════════════════════════════════════════
   4. FLOATING HEARTS BACKGROUND CANVAS
═══════════════════════════════════════════════ */
function setupFloatingHearts() {
    const canvas = document.getElementById('heartsCanvas');
    const ctx = canvas.getContext('2d');

    let hearts = [];
    const heartEmojis = ['💖', '💗', '💓', '💕', '🩷', '✨', '🌸', '💝'];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 30,
            size: Math.random() * 18 + 10,      // 10–28 px
            speed: Math.random() * 0.6 + 0.3,   // slow drift
            drift: (Math.random() - 0.5) * 0.5, // horizontal sway
            opacity: Math.random() * 0.55 + 0.15,
            emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            sway: 0,
            swaySpeed: Math.random() * 0.02 + 0.01,
        };
    }

    function initHearts() {
        hearts = [];
        const count = Math.min(CONFIG.floatingHeartsCount, 60);
        for (let i = 0; i < count; i++) {
            const h = createHeart();
            // Spread initial positions across full height so screen isn't empty at start
            h.y = Math.random() * (canvas.height + 200) - 100;
            hearts.push(h);
        }
    }

    function drawHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(h => {
            ctx.save();
            ctx.globalAlpha = h.opacity;
            ctx.font = `${h.size}px serif`;
            ctx.fillText(h.emoji, h.x, h.y);
            ctx.restore();
        });
    }

    function updateHearts() {
        hearts.forEach((h, i) => {
            h.sway += h.swaySpeed;
            h.x += Math.sin(h.sway) * h.drift + h.drift * 0.2;
            h.y -= h.speed;

            // Reset when it floats off screen top
            if (h.y < -40) {
                hearts[i] = createHeart();
            }
        });
    }

    function loop() {
        updateHearts();
        drawHearts();
        requestAnimationFrame(loop);
    }

    resize();
    initHearts();
    loop();

    window.addEventListener('resize', () => {
        resize();
        initHearts();
    });
}


/* ═══════════════════════════════════════════════
   5. CUSTOM CURSOR + SPARKLE TRAIL
═══════════════════════════════════════════════ */
function setupCustomCursor() {
    const sparkle = document.getElementById('cursorSparkle');
    const trailColors = [
        CONFIG.themeColor,
        CONFIG.themeColorAlt,
        '#ffb3d1',
        '#ff85b3',
    ];
    let lastTrailTime = 0;

    document.addEventListener('mousemove', e => {
        // Move main cursor glow
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;

        // Spawn trail dots at throttled rate
        const now = Date.now();
        if (now - lastTrailTime < 40) return;
        lastTrailTime = now;

        const dot = document.createElement('div');
        dot.className = 'sparkle-dot';
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        dot.style.width = `${Math.random() * 5 + 3}px`;
        dot.style.height = dot.style.width;
        dot.style.background = trailColors[Math.floor(Math.random() * trailColors.length)];
        dot.style.opacity = '0.8';
        document.body.appendChild(dot);

        // Remove dot after animation ends
        dot.addEventListener('animationend', () => dot.remove());
    });

    document.addEventListener('mouseleave', () => {
        sparkle.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        sparkle.style.opacity = '0.7';
    });
}


/* ═══════════════════════════════════════════════
   6. YES / NO BUTTONS
═══════════════════════════════════════════════ */
function setupProposalButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const noMessage = document.getElementById('noMessage');

    let noMsgIndex = 0;
    let noTryCount = 0;  // how many times the NO button has been dodged

    /* ── YES BUTTON ─────────────────────────────── */
    yesBtn.addEventListener('click', () => {
        triggerCelebration();
    });

    /* ── NO BUTTON: AVOIDANCE LOGIC ─────────────── */

    // On desktop: dodge on mouseover
    noBtn.addEventListener('mouseenter', () => {
        dodgeButton();
        showNoMessage();
    });

    // On mobile / for users who somehow click it: also dodge
    noBtn.addEventListener('click', e => {
        e.preventDefault();
        dodgeButton();
        showNoMessage();
    });

    /**
     * Moves the NO button to a random safe position on screen.
     * After a few dodges, the button slowly shrinks (playful escalation).
     */
    function dodgeButton() {
        noTryCount++;

        const margin = 24;
        const btnRect = noBtn.getBoundingClientRect();

        const maxX = window.innerWidth - btnRect.width - margin;
        const maxY = window.innerHeight - btnRect.height - margin;

        // Pick a random spot that is NOT near the current position (avoid teleporting in place)
        let newX, newY;
        let attempts = 0;
        do {
            newX = Math.random() * maxX + margin / 2;
            newY = Math.random() * maxY + margin / 2;
            attempts++;
        } while (
            attempts < 20 &&
            Math.abs(newX - btnRect.left) < 100 &&
            Math.abs(newY - btnRect.top) < 100
        );

        noBtn.classList.add('running');
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;

        // Playful scale-down after several tries
        if (noTryCount >= 5) {
            const scale = Math.max(0.55, 1 - (noTryCount - 4) * 0.07);
            noBtn.style.transform = `scale(${scale})`;
        }
    }

    function showNoMessage() {
        const messages = CONFIG.noButtonMessages;
        noMessage.textContent = messages[noMsgIndex % messages.length];
        noMsgIndex++;

        // Re-trigger animation by cloning the element trick
        noMessage.style.animation = 'none';
        // eslint-disable-next-line no-unused-expressions
        noMessage.offsetHeight; // force reflow
        noMessage.style.animation = '';
    }
}


/* ═══════════════════════════════════════════════
   7. CELEBRATION SEQUENCE
═══════════════════════════════════════════════ */
function triggerCelebration() {
    // Set random date location
    const locations = CONFIG.dateLocations;
    const picked = locations[Math.floor(Math.random() * locations.length)];
    document.getElementById('dateLocation').textContent = picked;

    // Screen transition
    const proposal = document.getElementById('screenProposal');
    const celebration = document.getElementById('screenCelebration');

    proposal.classList.add('exit');
    proposal.setAttribute('aria-hidden', 'true');

    setTimeout(() => {
        proposal.classList.remove('active', 'exit');
        celebration.classList.add('active');
        celebration.removeAttribute('aria-hidden');

        // Kick off confetti
        launchConfetti();
    }, 400);
}


/* ─── Confetti / Heart Burst ─────────────────── */
function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const emojis = ['💖', '💗', '💕', '✨', '🌸', '🎊', '💝', '💓'];
    const count = Math.min(CONFIG.celebrationParticleCount, 120);

    // Burst from center of screen
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
        const speed = Math.random() * 8 + 3;
        particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - (Math.random() * 4 + 2), // upward bias
            size: Math.random() * 16 + 10,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            alpha: 1,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.15,
            gravity: 0.22,
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            if (p.alpha <= 0) return;
            alive = true;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.99;
            p.rot += p.rotSpeed;
            p.alpha = Math.max(0, p.alpha - 0.008);

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.font = `${p.size}px serif`;
            ctx.fillText(p.emoji, -p.size / 2, p.size / 2);
            ctx.restore();
        });

        if (alive) requestAnimationFrame(drawConfetti);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawConfetti();
}


/* ═══════════════════════════════════════════════
   8. RESTART BUTTON
═══════════════════════════════════════════════ */
function setupRestartButton() {
    const restartBtn = document.getElementById('restartBtn');
    const proposal = document.getElementById('screenProposal');
    const celebration = document.getElementById('screenCelebration');

    restartBtn.addEventListener('click', () => {
        // Reset NO button position
        const noBtn = document.getElementById('noBtn');
        noBtn.classList.remove('running');
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.transform = '';

        // Clear NO message
        document.getElementById('noMessage').textContent = '';

        // Swap screens
        celebration.classList.add('exit');
        celebration.setAttribute('aria-hidden', 'true');

        setTimeout(() => {
            celebration.classList.remove('active', 'exit');
            proposal.classList.add('active');
            proposal.removeAttribute('aria-hidden');

            // Re-trigger entrance animation on card
            const card = proposal.querySelector('.card');
            card.classList.remove('entrance-anim');
            // eslint-disable-next-line no-unused-expressions
            card.offsetHeight;
            card.classList.add('entrance-anim');

            // Clear confetti canvas
            const confettiCanvas = document.getElementById('confettiCanvas');
            confettiCanvas.getContext('2d').clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }, 400);
    });
}


/* ═══════════════════════════════════════════════
   9. MUSIC TOGGLE
═══════════════════════════════════════════════ */
function setupMusic() {
    const btn = document.getElementById('musicToggle');
    btn.hidden = false;

    // Create audio element
    const audio = new Audio(CONFIG.musicFile);
    audio.loop = true;
    audio.volume = 0.4;

    let playing = false;

    btn.addEventListener('click', () => {
        if (playing) {
            audio.pause();
            btn.classList.remove('playing');
            btn.querySelector('.music-icon').textContent = '🔇';
            btn.setAttribute('aria-label', 'Play music');
        } else {
            audio.play().catch(() => {
                // Autoplay blocked — silently fail (user interaction required)
            });
            btn.classList.add('playing');
            btn.querySelector('.music-icon').textContent = '🎵';
            btn.setAttribute('aria-label', 'Pause music');
        }
        playing = !playing;
    });
}