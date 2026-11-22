/**
 * Curseur contextuel 100% GPU (`transform` & `opacity` uniquement — zéro layout).
 * - Activé UNIQUEMENT au survol des lignes Projets (`LIRE`/`FERMER`) et de l'e-mail (`COPIER`/`COPIÉ ✓`)
 * - Lerp amorti (0.16), boucle arrêtée au repos (raf = 0)
 * - Désactivé automatiquement sur tactile et sous `prefers-reduced-motion`
 */

export interface CursorController {
  setLabel: (text: string) => void;
}

export function initCursor(isReduced: () => boolean): CursorController {
  const noop: CursorController = { setLabel: () => {} };
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return noop;

  const el = document.querySelector<HTMLElement>('[data-cursor-el]');
  const labelEl = el?.querySelector<HTMLElement>('[data-cursor-label]');
  if (!el || !labelEl) return noop;

  let tx = -120;
  let ty = -120;
  let x = -120;
  let y = -120;
  let active = false;
  let raf = 0;

  const paint = () => {
    const scale = active ? 1 : 0.88;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale})`;
  };

  const loop = () => {
    x += (tx - x) * 0.16;
    y += (ty - y) * 0.16;
    paint();

    if (active && (Math.abs(tx - x) > 0.2 || Math.abs(ty - y) > 0.2)) {
      raf = requestAnimationFrame(loop);
    } else {
      raf = 0;
    }
  };

  const setActive = (next: boolean, text = '') => {
    if (isReduced()) {
      active = false;
      el.classList.remove('is-active');
      return;
    }
    if (text && labelEl.textContent !== text) labelEl.textContent = text;
    if (active !== next) {
      active = next;
      el.classList.toggle('is-active', active);
      paint();
    }
    if (active && !raf) raf = requestAnimationFrame(loop);
  };

  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' || isReduced()) return;
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        x = tx;
        y = ty;
      }
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      if (target && target.dataset.cursor) {
        setActive(true, target.dataset.cursor);
      } else if (active) {
        setActive(false);
      }
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', () => setActive(false));

  return {
    setLabel(text) {
      if (active && !isReduced()) labelEl.textContent = text;
    },
  };
}
