/**
 * =============================================================================
 * MOTEUR MOTION & PARALLAX AU SCROLL — propulsé par Motion (Framer Motion v14)
 * =============================================================================
 * 1. Guard global `prefers-reduced-motion` (avec écoute dynamique des changements OS).
 * 2. Entrées au scroll via `IntersectionObserver` natif (`transform`, `opacity`, `clip-path`).
 * 3. Compteurs animés (`[data-count]`) déclenchés une fois à l'entrée.
 * 4. Parallax au scroll propulsé par `scroll()` + `animate()` de Motion :
 *    - Accélération matérielle native (`ScrollTimeline` / WAAPI compositor)
 *    - Zéro pinning, zéro blocage du scroll, zéro conflit avec les transitions CSS
 *    - Scènes dédiées au portfolio :
 *      · Hero : split typographique horizontal + profondeur 3D Web/Mobile + métriques
 *      · À propos : fenêtre architecturale portrait (glide + léger zoom) + éventail jalons
 *      · Projets : filigrane éditorial lent + perspective projet phare + colonnes magazine
 *      · Compétences : contre-glissement doux des blocs
 *      · Parcours : tracé vertical `scaleY` + illumination jalons + années flottantes + diptyque
 *      · Contact : remontée douce qui se pose à exactement 0px au centrage
 * 5. Smooth scroll Lenis (desktop wheel) + accordéon WAAPI interruptible.
 */
import { animate, scroll } from 'motion';
import Lenis from 'lenis';

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
const ACCORDION_OPEN_MS = 260;
const ACCORDION_CLOSE_MS = 190;

export interface MotionController {
  isReduced: () => boolean;
  scrollToTarget: (target: string | number | HTMLElement) => void;
  setScrollLocked: (locked: boolean) => void;
  animateAccordion: (panel: HTMLElement, inner: HTMLElement | null, open: boolean) => void;
  refresh: () => void;
}

export function initMotion(): MotionController {
  window.__revealReady = true;

  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqDesktop = window.matchMedia('(min-width: 860px)');
  let reduced = mqReduce.matches;
  let lenis: Lenis | null = null;
  let lenisRaf = 0;
  let scrollCleanups: VoidFunction[] = [];

  /* ---------- 1. Ouverture Hero sur le compositor CSS ---------- */
  if (reduced) {
    document.documentElement.classList.add('is-loaded');
  } else {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('is-loaded');
      });
    });
  }

  /* ---------- 2. Entrées au scroll — IntersectionObserver natif ---------- */
  const scrollTargets = document.querySelectorAll<HTMLElement>(
    '[data-reveal], [data-rule-draw], [data-wipe-scroll]'
  );
  const revealAllNow = () => {
    scrollTargets.forEach((el) => el.setAttribute('data-in', 'true'));
  };

  if (reduced || !('IntersectionObserver' in window)) {
    revealAllNow();
  } else {
    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-in', 'true');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -48px 0px', threshold: 0.08 }
    );
    scrollTargets.forEach((el) => io.observe(el));
  }

  /* ---------- 3. Compteurs animés (chiffres clés) ---------- */
  const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  const setFinalCounter = (el: HTMLElement) => {
    const target = el.dataset.count ?? '0';
    const suffix = el.dataset.suffix ?? '';
    el.textContent = `${target}${suffix}`;
  };

  if (reduced || !('IntersectionObserver' in window)) {
    counters.forEach(setFinalCounter);
  } else if (counters.length > 0) {
    const animateCounter = (el: HTMLElement) => {
      const target = Number(el.dataset.count ?? '0');
      const suffix = el.dataset.suffix ?? '';
      const duration = 760;
      const start = performance.now();

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const current = Math.round(eased * target);
        el.textContent = `${current}${t === 1 ? suffix : ''}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animateCounter(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.35 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  }

  /* ---------- 4. Parallax au scroll propulsé par Motion (Framer Motion) ---------- */
  const teardownParallax = () => {
    scrollCleanups.forEach((stop) => {
      try {
        stop();
      } catch {
        /* ignore cleanup race */
      }
    });
    scrollCleanups = [];

    document.querySelectorAll<HTMLElement>('[data-motion-parallax]').forEach((el) => {
      el.style.transform = '';
      el.style.opacity = '';
    });

    const lineFill = document.querySelector<HTMLElement>('[data-timeline-fill]');
    if (lineFill) lineFill.style.transform = '';
    document.querySelectorAll<HTMLElement>('[data-timeline-node]').forEach((n) => n.classList.add('is-reached'));
  };

  const bindMotionScroll = (
    el: HTMLElement,
    keyframes: Record<string, string[] | number[]>,
    target: Element,
    offset: ['start start' | 'start end' | 'center center', 'end start' | 'end end' | 'center center' | 'center 68%']
  ) => {
    const anim = animate(el, keyframes, { ease: 'linear' });
    const stop = scroll(anim, { target, offset });
    scrollCleanups.push(() => {
      stop();
      anim.cancel();
    });
  };

  const setupParallax = () => {
    teardownParallax();
    if (reduced) return;

    const isDesktop = mqDesktop.matches;

    /* --- A. Timeline verticale des expériences (Desktop & Mobile) --- */
    const timeline = document.querySelector<HTMLElement>('[data-timeline-scene]');
    const lineFill = timeline?.querySelector<HTMLElement>('[data-timeline-fill]');
    const nodes = Array.from(timeline?.querySelectorAll<HTMLElement>('[data-timeline-node]') ?? []);

    if (timeline && lineFill && nodes.length > 0) {
      const stopTimeline = scroll(
        (progress) => {
          const p = Math.max(0.02, Math.min(1, progress));
          lineFill.style.transform = `scaleY(${p.toFixed(4)})`;

          nodes.forEach((node, idx) => {
            const threshold = nodes.length > 1 ? idx / (nodes.length - 0.55) : 0;
            node.classList.toggle('is-reached', progress >= threshold - 0.04);
          });
        },
        { target: timeline, offset: ['start 72%', 'end 68%'] }
      );
      scrollCleanups.push(stopTimeline);
    }

    /* --- B. Fenêtre portrait À propos (ancrée en haut : tête jamais rognée) --- */
    document.querySelectorAll<HTMLElement>('[data-motion-parallax="about-media"]').forEach((el) => {
      const target = el.closest('figure') ?? el.closest('section') ?? el;
      const scaleStart = isDesktop ? 1.1 : 1.06;
      const shiftEnd = isDesktop ? -2.5 : -1.5;
      bindMotionScroll(
        el,
        {
          transform: [
            `translate3d(0, 0%, 0) scale(${scaleStart})`,
            `translate3d(0, ${shiftEnd}%, 0) scale(1.02)`,
          ],
        },
        target,
        ['start end', 'end start']
      );
    });

    /* --- C. Filigrane éditorial lent dans Projets (Desktop & Mobile) --- */
    document.querySelectorAll<HTMLElement>('[data-motion-parallax="watermark"]').forEach((el) => {
      const target = el.closest('section') ?? el;
      const shift = isDesktop ? 120 : 50;
      bindMotionScroll(
        el,
        {
          transform: [`translate3d(0, -${shift}px, 0)`, `translate3d(0, ${shift}px, 0)`],
        },
        target,
        ['start end', 'end start']
      );
    });

    /* --- D. Scènes multi-plans riches (Desktop ≥ 860px : jamais d'encombrement mobile) --- */
    if (!isDesktop) return;

    document.querySelectorAll<HTMLElement>('[data-motion-parallax]').forEach((el) => {
      const kind = el.dataset.motionParallax;
      const section = el.closest('section') ?? el;

      switch (kind) {
        /* 1. HERO — Split typographique horizontal + profondeur 3D Web/Mobile */
        case 'hero-left':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 0px, 0)', 'translate3d(-44px, 0px, 0)'] },
            section,
            ['start start', 'end start']
          );
          break;

        case 'hero-right':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 0px, 0)', 'translate3d(44px, 0px, 0)'] },
            section,
            ['start start', 'end start']
          );
          break;

        case 'hero-web':
          bindMotionScroll(
            el,
            {
              transform: [
                'perspective(1100px) rotateX(0deg) translate3d(0px, 0px, 0) scale(1)',
                'perspective(1100px) rotateX(5deg) translate3d(0px, -28px, 0) scale(0.985)',
              ],
            },
            section,
            ['start start', 'end start']
          );
          break;

        case 'hero-phone':
          bindMotionScroll(
            el,
            {
              transform: [
                'translate3d(0px, 0px, 0) rotate(0deg)',
                'translate3d(0px, -78px, 0) rotate(-3deg)',
              ],
            },
            section,
            ['start start', 'end start']
          );
          break;

        case 'hero-metrics':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 16px, 0)', 'translate3d(0px, -16px, 0)'] },
            section,
            ['start end', 'end start']
          );
          break;

        /* 2. À PROPOS — Contre-glissement texte + éventail des 3 jalons */
        case 'about-copy':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 28px, 0)', 'translate3d(0px, -24px, 0)'] },
            section,
            ['start end', 'end start']
          );
          break;

        case 'milestone': {
          const depth = Number(el.dataset.parallaxDepth ?? '0');
          const offset = 10 + depth * 10;
          bindMotionScroll(
            el,
            { transform: [`translate3d(0px, ${offset}px, 0)`, `translate3d(0px, -${offset * 0.6}px, 0)`] },
            section,
            ['start end', 'end start']
          );
          break;
        }

        /* 3. PROJETS — Flagship perspective + colonnes magazine décalées */
        case 'flagship-media':
          bindMotionScroll(
            el,
            {
              transform: [
                'perspective(1200px) rotateX(5deg) translate3d(0px, 32px, 0) scale(0.97)',
                'perspective(1200px) rotateX(0deg) translate3d(0px, -26px, 0) scale(1)',
              ],
            },
            el.closest('article') ?? section,
            ['start end', 'end start']
          );
          break;

        case 'flagship-copy':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, -18px, 0)', 'translate3d(0px, 24px, 0)'] },
            el.closest('article') ?? section,
            ['start end', 'end start']
          );
          break;

        case 'col-left':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 18px, 0)', 'translate3d(0px, -22px, 0)'] },
            el.parentElement ?? section,
            ['start end', 'end start']
          );
          break;

        case 'col-right':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 56px, 0)', 'translate3d(0px, -36px, 0)'] },
            el.parentElement ?? section,
            ['start end', 'end start']
          );
          break;

        /* 4. COMPÉTENCES — Contre-glissement 2 colonnes */
        case 'skills-left':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, -14px, 0)', 'translate3d(0px, 16px, 0)'] },
            el.parentElement ?? section,
            ['start end', 'end start']
          );
          break;

        case 'skills-right':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 30px, 0)', 'translate3d(0px, -20px, 0)'] },
            el.parentElement ?? section,
            ['start end', 'end start']
          );
          break;

        /* 5. PARCOURS — Dates flottantes + progression visuelle Finance → Logiciel */
        case 'year':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 14px, 0)', 'translate3d(0px, -14px, 0)'] },
            el.closest('li') ?? section,
            ['start end', 'end start']
          );
          break;

        case 'edu-left':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, -14px, 0)', 'translate3d(0px, 18px, 0)'] },
            el.parentElement ?? section,
            ['start end', 'end start']
          );
          break;

        case 'edu-right':
          bindMotionScroll(
            el,
            { transform: ['translate3d(0px, 28px, 0)', 'translate3d(0px, -22px, 0)'] },
            el.parentElement ?? section,
            ['start end', 'end start']
          );
          break;

        /* 6. CONTACT — Remontée douce qui se pose à 0px / scale(1) au centrage */
        case 'contact-settle':
          bindMotionScroll(
            el,
            {
              transform: [
                'translate3d(0px, 40px, 0) scale(0.975)',
                'translate3d(0px, 0px, 0) scale(1)',
              ],
            },
            section,
            ['start end', 'center 68%']
          );
          break;
      }
    });
  };

  /* ---------- 5. Smooth scroll Lenis léger (desktop molette uniquement) ---------- */
  const startLenis = () => {
    if (reduced || lenis) return;
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    const loop = (time: number) => {
      lenis?.raf(time);
      lenisRaf = requestAnimationFrame(loop);
    };
    lenisRaf = requestAnimationFrame(loop);
  };

  const stopLenis = () => {
    if (lenisRaf) {
      cancelAnimationFrame(lenisRaf);
      lenisRaf = 0;
    }
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  };

  startLenis();
  setupParallax();

  mqDesktop.addEventListener?.('change', () => setupParallax());
  mqReduce.addEventListener?.('change', (e) => {
    reduced = e.matches;
    if (reduced) {
      stopLenis();
      teardownParallax();
      revealAllNow();
      counters.forEach(setFinalCounter);
    } else {
      startLenis();
      setupParallax();
    }
  });

  /* ---------- 6. Accordéon WAAPI interruptible (260ms / 190ms) ---------- */
  const animateAccordion = (panel: HTMLElement, inner: HTMLElement | null, open: boolean) => {
    panel.getAnimations().forEach((a) => a.cancel());
    inner?.getAnimations().forEach((a) => a.cancel());

    if (reduced || typeof panel.animate !== 'function') {
      panel.hidden = !open;
      if (open && inner && typeof inner.animate === 'function') {
        inner.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: 'ease' });
      }
      return;
    }

    if (open) {
      const currentH = panel.hidden ? 0 : panel.getBoundingClientRect().height;
      panel.hidden = false;
      const targetH = panel.scrollHeight;

      panel.animate([{ height: `${currentH}px` }, { height: `${targetH}px` }], {
        duration: ACCORDION_OPEN_MS,
        easing: EASE_OUT,
      });
      inner?.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 6px, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        { duration: ACCORDION_OPEN_MS, easing: EASE_OUT }
      );
    } else {
      const startH = panel.getBoundingClientRect().height;
      const anim = panel.animate([{ height: `${startH}px` }, { height: '0px' }], {
        duration: ACCORDION_CLOSE_MS,
        easing: EASE_OUT,
      });
      inner?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: Math.round(ACCORDION_CLOSE_MS * 0.8),
        easing: 'ease-out',
      });
      anim.onfinish = () => {
        panel.hidden = true;
      };
    }
  };

  return {
    isReduced: () => reduced,
    scrollToTarget(target) {
      if (reduced || !lenis) {
        if (typeof target === 'number') window.scrollTo(0, target);
        else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView();
        else target.scrollIntoView();
        return;
      }
      if (typeof target === 'string' && target === '#top') {
        lenis.scrollTo(0, { duration: 0.95 });
        return;
      }
      lenis.scrollTo(target, { offset: -64, duration: 0.95 });
    },
    setScrollLocked(locked) {
      if (locked) {
        lenis?.stop();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
        lenis?.start();
      }
    },
    animateAccordion,
    refresh: () => setupParallax(),
  };
}
