document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('GSAP or ScrollTrigger not loaded!');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const setupAnimations = (eventType = 'load') => {
    const box = document.querySelector('.box');
    const cardWrapper = document.querySelector('.card-wrapper');
    const card = document.querySelector('.card');

    const ts = () => new Date().toISOString().split('T')[1].replace('Z','');
    const log = (...args) => console.log(`[hero:${ts()}]`, ...args);
    const rect = (el) => el ? el.getBoundingClientRect() : null;

    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight; // Calculate box height for proportional vertical movement.
    const cardWidth = card.offsetWidth;
    const partialDistance = boxWidth / 2;
    const clearDistance = (boxWidth / 2) + (cardWidth / 2) + (boxWidth * 0.1);

    const animationScroll = window.innerHeight * 0.75; // The scroll distance for the main animation.
    const pauseScroll = window.innerHeight * 0.05; // The pause is now 5% of the viewport height.
    const slideOutScroll = window.innerHeight * 0.4; // Additional scroll for card slide-out while pinned
    const tiltScroll = window.innerHeight * 0.5; // Additional scroll for card tilt while pinned
    const finalPauseScroll = 0; // No extra pause after tilt; unpin immediately

    // Diagnostics: initial geometry
    const scene = document.querySelector('.scene');
    log('init', { eventType, vh: window.innerHeight, vw: window.innerWidth });
    log('scene rect', rect(scene));
    log('box rect', rect(box));

    // REMOVED: Problematic wheel event blocking that prevents normal scrolling
    // This was causing scroll locking between sections

    // --- A SINGLE timeline for the entire pinned sequence ---
    // Ensure no residual scroll inside the iframe on init
    window.scrollTo(0, 0);

    const pinnedTl = gsap.timeline({
      scrollTrigger: {
        id: 'heroPin',
        trigger: '.scene',
        pin: true,
        scrub: true,
        anticipatePin: 1,
        start: 'top top',
        pinSpacing: true, // preserve padding space
        end: `+=${animationScroll + pauseScroll + slideOutScroll + tiltScroll + finalPauseScroll}`,
        // Add better scroll handling
        onEnter: () => {
          log('Hero pin entered');
          // Ensure parent page can still scroll
          try { parent && parent.postMessage({ type: 'hero-pin-active' }, '*'); } catch (e) {}
        },
        onLeave: () => {
          log('Hero pin left');
          // Signal that hero is no longer pinned
          try { parent && parent.postMessage({ type: 'hero-pin-inactive' }, '*'); } catch (e) {}
        }
      }
    });

    // Fade scroll arrow on hero interaction requests
    let arrowFaded = false;
    const fadeArrow = () => {
      if (arrowFaded) return;
      arrowFaded = true;
      gsap.to('.scroll-hint', { opacity: 0, duration: 0.3 });
    };
    // Listen for parent request to hide arrow when next section becomes visible
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'hide-arrow') fadeArrow();
    });

    // REMOVED: Wheel blocking that was preventing normal scrolling
    pinnedTl.eventCallback('onComplete', () => {
      log('Hero animation complete');
      try { parent && parent.postMessage({ type: 'hero-complete' }, '*'); } catch (e) {}
    });

    // After creation, log ScrollTrigger details
    requestAnimationFrame(() => {
      const st = pinnedTl.scrollTrigger;
      if (st) {
        log('pinnedTl created', {
          start: st.start,
          end: st.end,
          pin: !!st.pin,
          pinSpacing: st.pinSpacing,
          progress: st.progress,
        });
      }
    });

    // Hook timeline updates for diagnostics and to request parent align while active
    let lastAlignMs = 0;
    pinnedTl.eventCallback('onUpdate', () => {
      const st = pinnedTl.scrollTrigger;
      if (st) {
        const now = Date.now();
        if (st.progress > 0 && st.progress < 1 && (now - lastAlignMs) > 150) {
          lastAlignMs = now;
          try { parent && parent.postMessage({ type: 'hero-align' }, '*'); } catch (e) {}
        }
        log('pinnedTl update', {
          scrollY: window.scrollY,
          progress: +st.progress.toFixed(3),
          direction: st.direction,
          start: st.start,
          end: st.end,
          boxY: gsap.getProperty(box, 'y'),
          cardRotZ: gsap.getProperty(card, 'rotationZ'),
        });
      }
    });

    // Global ST diagnostics
    ScrollTrigger.addEventListener('refreshInit', () => log('ST refreshInit'));
    ScrollTrigger.addEventListener('refresh', () => {
      const st = pinnedTl.scrollTrigger;
      log('ST refresh', { vh: window.innerHeight, vw: window.innerWidth, start: st && st.start, end: st && st.end });
      log('scene rect (refresh)', rect(scene));
      log('box rect (refresh)', rect(box));
    });

    // Set initial card position (no render jump)
    gsap.set('.card-wrapper', { x: 0, force3D: true });

    // Fit the pouch artwork to the card without distortion (pretend source was sideways)
    const fitPouchToCard = () => {
      const cardEl = document.querySelector('.card');
      const pouchEl = document.querySelector('.card .pouch');
      if (!cardEl || !pouchEl) return;
      const cardWidth = cardEl.clientWidth;
      const cardHeight = cardEl.clientHeight;
      // Pre-rotate size: width becomes card height, height becomes card width
      pouchEl.style.position = 'absolute';
      pouchEl.style.top = '50%';
      pouchEl.style.left = '50%';
      pouchEl.style.width = cardHeight + 'px';
      pouchEl.style.height = cardWidth + 'px';
      pouchEl.style.transformOrigin = 'center center';
      pouchEl.style.transform = 'translate(-50%, -50%) rotate(-90deg) scaleX(-1)';
      log('fitPouchToCard', { cardW: cardWidth, cardH: cardHeight });
    };
    fitPouchToCard();

    // Part 1: The Animation (box rotation only, card stays in place).
    // These tweens run first, taking up a duration equal to `animationScroll`.
    pinnedTl
      .to(box, { rotateY: -90, ease: 'power1.inOut', duration: animationScroll }, 0);

    // Part 2: The Pause.
    // This empty tween is added to the end of the timeline, creating the pause *after* the animation.
    pinnedTl.to({}, { duration: pauseScroll });

    // Part 3: Card slide-out (after side 2 is fully rotated)
    pinnedTl.fromTo(
      '.card-wrapper',
      { x: 0 },
      { x: `${clearDistance}px`, ease: 'power1.inOut', duration: slideOutScroll, immediateRender: false }
    );

    // Part 4: Card tilt only (no vertical movement while pinned)
    pinnedTl
      .to('.card', { rotationZ: 90, transformOrigin: '100% 50%', ease: 'power1.inOut', duration: tiltScroll })
      .add(fadeArrow);

    // Ensure card-wrapper is not rendered in slid-out state on initial refresh
    ScrollTrigger.addEventListener('refresh', () => {
      try {
        const st = pinnedTl.scrollTrigger;
        if (st && st.progress === 0) gsap.set('.card-wrapper', { x: 0 });
      } catch (_) {}
    });

    // Part 5: No final pause; proceed to unpin immediately
    if (finalPauseScroll > 0) pinnedTl.to({}, { duration: finalPauseScroll });

    // --- Timeline 2: Vertical Float Animation (unpinned) ---
    // This starts AFTER the card has fully tilted, allowing the box to scroll up.
    // Allow the card to rise at the same speed as before, but clamp once its bottom meets the box bottom.
    const cardLift = { y: 0 };
    let floatActive = false;
    let appliedCardY = 0;
    let clampMinY = 0; // negative: the most upward we allow the card to move

    const computeClampMinY = () => {
      // Measure how far the card's bottom sits below the box's bottom at float start
      const cardRect = card.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      const initialGap = Math.max(0, cardRect.bottom - boxRect.bottom);
      clampMinY = -initialGap; // card Y cannot go above this (more negative) value
      log('computeClampMinY', { initialGap, clampMinY });
    };

    // Build float timeline only if #content exists in this document (not in the isolated hero iframe)
    let floatTl;
    const contentEl = document.querySelector('#content');
    if (contentEl) {
      floatTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#content',
          start: 'top top', // Start only after the pin fully ends
          end: 'max',
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => { floatActive = true; appliedCardY = 0; computeClampMinY(); fadeArrow(); log('floatTl onEnter'); },
          onRefresh: () => { computeClampMinY(); log('floatTl onRefresh'); },
          onLeaveBack: () => { floatActive = false; appliedCardY = 0; log('floatTl onLeaveBack'); }
        }
      });
      floatTl
        .fromTo('.box', 
          { y: '-10vh', immediateRender: false }, // Start from where the pinned timeline left off
          { y: '-20vh', ease: 'none' } // Continue moving up linearly with scroll
        )
        .to(cardLift, {
          y: boxHeight * -0.5, // Same target speed/distance as before
          ease: 'none',
          onUpdate: () => {
            if (!floatActive) return;
            const cardRect = card.getBoundingClientRect();
            const boxRect = box.getBoundingClientRect();
            const liveGap = Math.max(0, cardRect.bottom - boxRect.bottom);
            const allowedMinY = appliedCardY - liveGap; // do not let the card move above the box bottom
            const yClamped = Math.max(cardLift.y, allowedMinY);
            if (yClamped !== appliedCardY) {
              appliedCardY = yClamped;
              gsap.set(cardWrapper, { y: appliedCardY });
              log('floatTl update', { scrollY: window.scrollY, cardLiftY: cardLift.y, yClamped, liveGap, boxY: gsap.getProperty(box, 'y') });
            }
          }
        }, 0);
    } else {
      log('no #content in this document; skipping floatTl');
    }
  };

  // --- Debounced Resize Handler ---
  let timeout;
  const debouncedResize = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      console.log('[hero] resize -> rebuilding animations');
      ScrollTrigger.getAll().forEach(t => t.kill());
      setupAnimations('resize');
    }, 250);
  };

  window.addEventListener('load', () => {
    setupAnimations('load');
    // Signal outer page that hero is ready and pinned
    try { parent && parent.postMessage({ type: 'hero-ready' }, '*'); } catch (e) {}
  });
  window.addEventListener('resize', debouncedResize);
});
  