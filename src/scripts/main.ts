/**
 * Point d'entrée client unique.
 * Le guard `prefers-reduced-motion` est centralisé dans `initMotion()`.
 */
import { initMotion } from './motion';
import { initTheme } from './theme';
import { initNav } from './nav';
import { initCursor } from './cursor';
import { initInteractions } from './interactions';

const safe = (fn: () => void) => {
  try {
    fn();
  } catch (err) {
    console.error('[portfolio]', err);
  }
};

const motion = initMotion();
safe(() => initTheme(motion.isReduced));
const cursor = initCursor(motion.isReduced);
safe(() => initNav({ setScrollLocked: motion.setScrollLocked }));
safe(() => initInteractions(motion, cursor));
