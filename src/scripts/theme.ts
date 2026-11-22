/**
 * Bascule de thème « Encre » :
 * - Clair papier coton (#f3efe6) par défaut, sombre charbon (#11100e) en option
 * - Transition View Transitions API (480ms ease-expo), repli fondu CSS si reduced-motion
 */
const THEME_COLORS = { light: '#fbf7f6', dark: '#121010' } as const;
type Theme = keyof typeof THEME_COLORS;

export function getTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme: Theme, btn: HTMLButtonElement | null): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* stockage indisponible */
  }

  const meta = document.querySelector<HTMLMetaElement>('meta[data-theme-color]');
  if (meta) meta.content = THEME_COLORS[theme];

  if (btn) {
    const label = theme === 'light' ? btn.dataset.labelDark : btn.dataset.labelLight;
    if (label) btn.setAttribute('aria-label', label);
  }
}

export function initTheme(isReduced: () => boolean): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  applyTheme(getTheme(), btn);
  if (!btn) return;

  btn.addEventListener('click', (event) => {
    const next: Theme = getTheme() === 'light' ? 'dark' : 'light';
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (!doc.startViewTransition || isReduced()) {
      applyTheme(next, btn);
      return;
    }

    const rect = btn.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => applyTheme(next, btn));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 480,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {});
  });
}
