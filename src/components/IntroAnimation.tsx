import { useEffect } from 'react';
import { useAnimate, stagger } from 'framer-motion';

// ─── helpers ─────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

interface IntroAnimationProps {
  onComplete: () => void;
}

const WORDMARK = 'PATEL SAHIL';

// ─────────────────────────────────────────────────────────────────────────────
//  IntroAnimation
//
//  Sequence (≈ 3.9 s total):
//
//  0.10 s  – Logo fades + scales in at screen center
//  0.73 s  – Lockup slides LEFT  (name is hidden, so only logo appears to move)
//  1.28 s  – Divider extends + "PATEL SAHIL" stagger-fades in (right of logo)
//  2.13 s  – Light streak ignites from top-right
//  2.54 s  – Hold (logo + name + streak fully visible)
//  2.74 s  – Name fades out; logo + lockup fly UP to navbar top-left position
//  3.39 s  – Overlay fades (onComplete fires 0.3 s into fade → nav logo appears)
//
// ─────────────────────────────────────────────────────────────────────────────
export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let cancelled = false;
    document.body.style.overflow = 'hidden';

    const run = async () => {
      await sleep(100);
      if (cancelled) return;

      // ── Phase 1 · Logo materialises at screen centre ──────────────────
      //    Keyframe array: [start, overshoot, settle]
      await animate(
        '#i-logo',
        { opacity: [0, 1], scale: [0.72, 1.06, 1] },
        { duration: 0.55, ease: 'easeOut' },
      );
      if (cancelled) return;

      await sleep(80);

      // ── Phase 2 · Lockup stays centred ──────────────────────────────────
      //    No horizontal shift — the logo + name reveal in the centre.
      await sleep(150);
      if (cancelled) return;

      // ── Phase 3 · Divider + name stagger in ───────────────────────────
      animate('#i-divider', { opacity: [0, 1] }, { duration: 0.3 });
      animate(
        '.i-char',
        { opacity: [0, 1] },
        { duration: 0.28, delay: stagger(0.065, { startDelay: 0.06 }) },
      );
      await sleep(860); // covers the full stagger: 0.06 + 10×0.065 + 0.28 ≈ 0.99 s
      if (cancelled) return;

      // ── Phase 4 · Light streak ignites ────────────────────────────────
      animate('#i-s1', { opacity: [0, 1] }, { duration: 0.65, ease: 'easeOut' });
      animate('#i-s2', { opacity: [0, 1] }, { duration: 0.50, ease: 'easeOut' });
      animate('#i-s3', { opacity: [0, 1] }, { duration: 0.38, ease: 'easeOut' });
      await sleep(400);
      if (cancelled) return;

      // ── Hold ──────────────────────────────────────────────────────────
      await sleep(200);
      if (cancelled) return;

      // ── Phase 5 · Fly to navbar top-left ──────────────────────────────
      //    Dynamically measure the real navbar logo so the intro logo
      //    lands exactly on top of it — no hardcoded pixel guesses.
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const introLogoEl = scope.current?.querySelector('#i-logo') as HTMLElement;
      const introLogoRect = introLogoEl?.getBoundingClientRect();
      const navLogoEl = document.querySelector('#nav-logo') as HTMLElement;
      const navLogoRect = navLogoEl?.getBoundingClientRect();

      // Scale = navbar logo size / intro logo size
      const introLogoSize = introLogoRect?.width ?? 80;
      const navLogoSize   = navLogoRect?.width ?? 32;
      const scale = navLogoSize / introLogoSize;

      // Where the intro logo's centre currently is (screen coords)
      const introCX = introLogoRect
        ? introLogoRect.left + introLogoRect.width / 2
        : vw / 2;
      const introCY = introLogoRect
        ? introLogoRect.top + introLogoRect.height / 2
        : vh / 2;

      // Where the nav logo's centre is (screen coords)
      const navCX = navLogoRect
        ? navLogoRect.left + navLogoRect.width / 2
        : 42;
      const navCY = navLogoRect
        ? navLogoRect.top + navLogoRect.height / 2
        : 40;

      // The lockup's transform-origin is its own centre.
      // We need a translate that moves the intro logo centre → nav logo centre,
      // accounting for the fact that scaling happens around the lockup centre.
      const lockupEl = scope.current?.querySelector('#i-lockup') as HTMLElement;
      const lockupRect = lockupEl?.getBoundingClientRect();
      const lockupCX = lockupRect
        ? lockupRect.left + lockupRect.width / 2
        : vw / 2;
      const lockupCY = lockupRect
        ? lockupRect.top + lockupRect.height / 2
        : vh / 2;

      // Offset of the intro logo centre from the lockup centre (before scaling)
      const logoOffsetX = introCX - lockupCX;
      const logoOffsetY = introCY - lockupCY;

      // After scaling, the logo offset shrinks by `scale`.
      // new intro logo centre = lockupNewCentre + logoOffset × scale
      // We want: lockupNewCentre + logoOffset × scale = navCentre
      // ⟹ lockupNewCentre = navCentre − logoOffset × scale
      // ⟹ translate = lockupNewCentre − lockupCurrentCentre
      const targetX = (navCX - logoOffsetX * scale) - lockupCX;
      const targetY = (navCY - logoOffsetY * scale) - lockupCY;

      // Name + divider dissolve as everything rises
      animate('.i-char, #i-divider', { opacity: [1, 0] }, { duration: 0.40 });

      await animate(
        '#i-lockup',
        { x: targetX, y: targetY, scale },
        { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
      );
      if (cancelled) return;

      // ── Phase 6 · Overlay fades out ───────────────────────────────────
      // The intro logo is now sitting exactly on top of the navbar logo.
      // Show the navbar logo FIRST (it appears behind the still-opaque
      // overlay), then fade the overlay away — zero blink.
      document.body.style.overflow = '';
      onComplete();

      // Short delay so the navbar logo renders before the overlay dissolves
      await sleep(50);
      if (cancelled) return;

      await animate(scope.current, { opacity: [1, 0] }, { duration: 0.45, ease: 'easeOut' });
    };

    run().catch(console.error);

    return () => {
      cancelled = true;
      document.body.style.overflow = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* ── Light streak · layer 1 — wide diffuse beam ──────────────────── */}
      <div
        id="i-s1"
        aria-hidden="true"
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          opacity: 0,
          width: 700,
          height: 580,
          background:
            'conic-gradient(from 212deg at 100% 0%,' +
            '  transparent 0deg,' +
            '  rgba(255,255,255,0.09) 3.5deg,' +
            '  rgba(255,255,255,0.04) 8deg,' +
            '  transparent 16deg)',
          filter: 'blur(14px)',
        }}
      />
      {/* ── Light streak · layer 2 — mid glow ───────────────────────────── */}
      <div
        id="i-s2"
        aria-hidden="true"
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          opacity: 0,
          width: 430,
          height: 410,
          background:
            'linear-gradient(218deg,' +
            '  rgba(255,255,255,0.20) 0%,' +
            '  rgba(255,255,255,0.07) 28%,' +
            '  transparent 58%)',
          filter: 'blur(4px)',
        }}
      />
      {/* ── Light streak · layer 3 — sharp hot core ─────────────────────── */}
      <div
        id="i-s3"
        aria-hidden="true"
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          opacity: 0,
          width: 270,
          height: 250,
          background:
            'linear-gradient(222deg,' +
            '  rgba(255,255,255,0.30) 0%,' +
            '  rgba(255,255,255,0.11) 20%,' +
            '  transparent 50%)',
          filter: 'blur(1px)',
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          MAIN LOCKUP  ·  [logo]  |  [PATEL SAHIL]
          Centred by the flex container; Framer Motion moves it via x / y.
      ══════════════════════════════════════════════════════════════════ */}
      <div
        id="i-lockup"
        className="flex items-center"
        style={{ gap: 20, flexShrink: 0 }}
      >
        {/* ── Triangle logo mark ────────────────────────────────────────── */}
        {/*    mix-blend-mode:screen makes the black bg invisible on dark     */}
        <img
          id="i-logo"
          src="/logo.png"
          alt=""
          draggable={false}
          className="flex-shrink-0 select-none pointer-events-none"
          style={{
            width:        80,
            height:       80,
            objectFit:    'contain',
            mixBlendMode: 'screen',
            opacity:      0,
          }}
        />

        {/* ── Vertical divider ──────────────────────────────────────────── */}
        <div
          id="i-divider"
          aria-hidden="true"
          style={{
            width:           1,
            height:          50,
            backgroundColor: 'rgba(255,255,255,0.25)',
            flexShrink:      0,
            opacity:         0,
          }}
        />

        {/* ── PATEL SAHIL · letter-by-letter ───────────────────────────── */}
        <div
          aria-label={WORDMARK}
          className="flex items-baseline"
          style={{ flexShrink: 0 }}
        >
          {WORDMARK.split('').map((char, i) => (
            <span
              key={i}
              className="i-char inline-block text-white"
              style={{
                fontFamily:    "'Bebas Neue', sans-serif",
                fontSize:      'clamp(1.65rem, 3.8vw, 3.1rem)',
                letterSpacing: '0.08em',
                lineHeight:    1,
                opacity:       0,
                ...(char === ' ' ? { minWidth: '0.38em' } : {}),
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      {/* ── Subtle corner accent lines ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-7 left-7 pointer-events-none"
        style={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <div style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ width: 1,  height: 18, background: 'rgba(255,255,255,0.12)' }} />
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-7 right-7 pointer-events-none"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}
      >
        <div style={{ width: 18, height: 1, background: 'rgba(255,255,255,0.12)' }} />
        <div style={{ width: 1,  height: 18, alignSelf: 'flex-end', background: 'rgba(255,255,255,0.12)' }} />
      </div>
    </div>
  );
}