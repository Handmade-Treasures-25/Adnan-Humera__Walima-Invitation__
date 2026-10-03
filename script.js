/**
 * MIDNIGHT CHAMPAGNE LUXURY — INTERACTIVE DIGITAL WEDDING INVITATION
 * Studio Quality Architecture & Micro-Interactions
 */

/* ==========================================================================
   1. EDITABLE CONFIGURATION
   ========================================================================== */
const WEDDING_CONFIG = {
  coupleNames: "Adnan & Humera",
  initials: "A H",
  brideParents: "Mr. & Mrs. Anwar Shaikh",
  groomParents: "Mr. & Mrs. Firoz khan",
  weddingDateDisplay: "18 OCTOBER 2026",
  venueName: "Jashn Banquet",
  venueCity: "Holy Cross High School, Kurla West, Mumbai",
  whatsappShareMessage: "You're invited to celebrate the Walima ceremony of Adnan & Humera. ✨",
  mapsUrl: "https://maps.google.com/?q=Holy+Cross+High+School+Kurla+West+Mumbai"
};

/* ==========================================================================
   2. GLOBAL STATE MANAGEMENT
   ========================================================================== */
let isMusicPlaying = false;
let scratchRevealed = false;
let burstTriggered = false;

/* ==========================================================================
   3. DOM ELEMENT REFERENCES
   ========================================================================== */
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

// Screens
const secDoors = document.getElementById('secDoors');
const secMonogram = document.getElementById('secMonogram');
const secLoading = document.getElementById('secLoading');
const storyContainer = document.getElementById('storyContainer');

// Buttons & Actions
const btnEnter = document.getElementById('btnEnter');
const doorLeft = document.getElementById('doorLeft');
const doorRight = document.getElementById('doorRight');
const doorContent = document.getElementById('doorContent');
const progressFill = document.getElementById('progressFill');
const progressSpark = document.getElementById('progressSpark');
const progressCounter = document.getElementById('progressCounter');

// Interactivity Targets
const ringsContainer = document.getElementById('ringsContainer');
const coupleQuote = document.getElementById('coupleQuote');
const ringHint = document.getElementById('ringHint');

const boxVisual = document.getElementById('boxVisual');
const btnUnlockBox = document.getElementById('btnUnlockBox');
const secretNote = document.getElementById('secretNote');

const scratchCanvas = document.getElementById('scratchCanvas');
const scratchPercent = document.getElementById('scratchPercent');
const btnWhatsappShare = document.getElementById('btnWhatsappShare');
const btnRevisit = document.getElementById('btnRevisit');

/* ==========================================================================
   4. INITIALIZATION & AMBIENT EFFECTS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initAmbientBokeh();
  setupScratchCanvas();
  setupIntersectionObserver();
  setupEventListeners();
  initCountdown(); // Countdown function initialized here
});

// Ambient Bokeh Floating Dust
function initAmbientBokeh() {
  const container = document.getElementById('bokehContainer');
  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'bokeh-sparkle';
    
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${6 + Math.random() * 6}s`;

    container.appendChild(particle);
  }
}

/* ==========================================================================
   5. AUDIO CONTROLLER
   ========================================================================== */
function toggleAudio() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.classList.remove('playing');
    isMusicPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
      isMusicPlaying = true;
    }).catch(() => {
      console.log("Audio autoplay prevented by browser policy.");
    });
  }
}

/* ==========================================================================
   6. CINEMATIC DOOR OPENING & SEQUENCE FLOW
   ========================================================================== */
function triggerDoorOpening() {
  // Start audio on first user interaction
  if (!isMusicPlaying) {
    toggleAudio();
  }

  // Animate Doors Out
  const doorsOverlay = document.querySelector('.doors-overlay');
  doorsOverlay.classList.add('open');

  setTimeout(() => {
    // Hide Doors Screen, Show Monogram Reveal
    secDoors.classList.remove('active');
    secMonogram.classList.add('active');

    // Hold Monogram Reveal for 2 Seconds, then go to Loader
    setTimeout(() => {
      secMonogram.classList.remove('active');
      secLoading.classList.add('active');
      runLuxuryLoadingSequence();
    }, 2200);

  }, 1600);
}

/* Loading Sequence Animation */
function runLuxuryLoadingSequence() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    progressFill.style.width = `${progress}%`;
    progressSpark.style.left = `${progress}%`;
    progressCounter.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        secLoading.classList.remove('active');
        storyContainer.classList.remove('hidden');
        // Trigger entrance animations for initial story section
        document.getElementById('secCouple').classList.add('visible');
      }, 400);
    }
  }, 25);
}

/* ==========================================================================
   7. INTERACTIVE STORY EXPERIENCES
   ========================================================================== */

// Updated Ring Tap Handler (Reveals Names + Quote + Rotation)
function handleRingsTap() {
  const coupleRevealBox = document.getElementById('coupleRevealBox');
  const ringsContainer = document.getElementById('ringsContainer');
  const ringHint = document.getElementById('ringHint');

  // Ring animation
  ringsContainer.classList.add('active');
  ringHint.textContent = "UNITED FOREVER";

  // Reveal Names & Quote with smooth animation
  if (coupleRevealBox) {
    coupleRevealBox.classList.remove('hidden');
  }
}

// (B) Secret Jewellery Box Unlock
function handleBoxUnlock() {
  boxVisual.classList.add('opened');
  btnUnlockBox.style.display = 'none';
  
  setTimeout(() => {
    secretNote.classList.remove('hidden');
  }, 500);
}

/* ==========================================================================
   8. MAIN SCRATCH CANVAS EXPERIENCE (DATE REVEAL AT 60%)
   ========================================================================== */
function setupScratchCanvas() {
  const ctx = scratchCanvas.getContext('2d');
  const width = scratchCanvas.width;
  const height = scratchCanvas.height;

  // Render Metallic Champagne Foil Coating
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#d4af37');
  grad.addColorStop(0.3, '#fceabb');
  grad.addColorStop(0.5, '#aa7c11');
  grad.addColorStop(0.8, '#fceabb');
  grad.addColorStop(1, '#5a4309');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Add Texture & Foil Text Instructions
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  for (let i = 0; i < 500; i++) {
    ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
  }

  ctx.font = '600 12px Manrope';
  ctx.fillStyle = '#222222';
  ctx.textAlign = 'center';
  ctx.fillText('SCRATCH WITH FINGER OR MOUSE', width / 2, height / 2 + 4);

  // Drawing States
  let isDrawing = false;

  function getBrushPos(x, y) {
    const rect = scratchCanvas.getBoundingClientRect();
    return {
      x: (x - rect.left) * (scratchCanvas.width / rect.width),
      y: (y - rect.top) * (scratchCanvas.height / rect.height)
    };
  }

  function scratch(x, y) {
    if (scratchRevealed) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    calculateScratchProgress();
  }

  // Mouse Events
  scratchCanvas.addEventListener('mousedown', (e) => { isDrawing = true; const pos = getBrushPos(e.clientX, e.clientY); scratch(pos.x, pos.y); });
  scratchCanvas.addEventListener('mousemove', (e) => { if (isDrawing) { const pos = getBrushPos(e.clientX, e.clientY); scratch(pos.x, pos.y); } });
  window.addEventListener('mouseup', () => { isDrawing = false; });

  // Touch Events (Mobile)
  scratchCanvas.addEventListener('touchstart', (e) => { isDrawing = true; const touch = e.touches[0]; const pos = getBrushPos(touch.clientX, touch.clientY); scratch(pos.x, pos.y); });
  scratchCanvas.addEventListener('touchmove', (e) => { if (isDrawing) { const touch = e.touches[0]; const pos = getBrushPos(touch.clientX, touch.clientY); scratch(pos.x, pos.y); e.preventDefault(); } });
  window.addEventListener('touchend', () => { isDrawing = false; });
}

// Calculate Scratched Area Percentage
function calculateScratchProgress() {
  if (scratchRevealed) return;

  const ctx = scratchCanvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
  const pixels = imgData.data;
  let transparentPixels = 0;

  for (let i = 3; i < pixels.length; i += 4) {
    if (pixels[i] === 0) {
      transparentPixels++;
    }
  }

  const percent = Math.round((transparentPixels / (pixels.length / 4)) * 100);
  scratchPercent.textContent = `${percent}%`;

  // STRICT RULE: At exactly 60%, trigger explosion and reveal permanently
  if (percent >= 60 && !burstTriggered) {
    burstTriggered = true;
    scratchRevealed = true;
    triggerGoldParticleBurst();
  }
}

/* ==========================================================================
   9. CINEMATIC CHAMPAGNE PARTICLE BURST (AT 60% SCRATCH)
   ========================================================================== */
function triggerGoldParticleBurst() {
  // Dissolve Canvas Layer
  scratchCanvas.style.transition = 'opacity 0.8s ease';
  scratchCanvas.style.opacity = '0';
  setTimeout(() => { scratchCanvas.style.display = 'none'; }, 800);

  scratchPercent.textContent = '100% — UNLOCKED';

  // Spawn Particle Canvas Explosion
  const burstCanvas = document.getElementById('burstCanvas');
  const ctx = burstCanvas.getContext('2d');
  burstCanvas.width = window.innerWidth;
  burstCanvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#fceabb', '#e5c158', '#c59b27', '#ffffff'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 2,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.015 + 0.008
    });
  }

  let animationFrame;
  function renderBurst() {
    ctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
    let activeParticles = 0;

    particles.forEach(p => {
      if (p.alpha > 0) {
        activeParticles++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Soft Gravity
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrame = requestAnimationFrame(renderBurst);
    } else {
      ctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  renderBurst();
}

/* ==========================================================================
   10. COUNTDOWN TIMER (18 OCT 2026, 8:00 PM)
   ========================================================================== */
function initCountdown() {
  const eventDate = new Date("2026-10-18T20:00:00").getTime();

  const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const daysEl = document.getElementById("daysCount");
    const hoursEl = document.getElementById("hoursCount");
    const minsEl = document.getElementById("minsCount");
    const secsEl = document.getElementById("secsCount");

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    if (distance < 0) {
      clearInterval(countdownTimer);
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minsEl.innerText = "00";
      secsEl.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minsEl.innerText = String(minutes).padStart(2, '0');
    secsEl.innerText = String(seconds).padStart(2, '0');
  }, 1000);
}

/* ==========================================================================
   11. SCROLL INTERSECTION OBSERVER
   ========================================================================== */
function setupIntersectionObserver() {
  const sections = document.querySelectorAll('.story-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.25
  });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   12. WHATSAPP & REVISIT HANDLERS
   ========================================================================== */
function shareOnWhatsApp() {
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(WEDDING_CONFIG.whatsappShareMessage)}`;
  window.open(url, '_blank');
}

function revisitInvitation() {
  // Smooth Scroll Back to Top of Story
  storyContainer.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/* ==========================================================================
   13. EVENT LISTENERS
   ========================================================================== */
function setupEventListeners() {
  musicToggle.addEventListener('click', toggleAudio);
  btnEnter.addEventListener('click', triggerDoorOpening);
  ringsContainer.addEventListener('click', handleRingsTap);
  btnUnlockBox.addEventListener('click', handleBoxUnlock);
  btnWhatsappShare.addEventListener('click', shareOnWhatsApp);
  btnRevisit.addEventListener('click', revisitInvitation);
}