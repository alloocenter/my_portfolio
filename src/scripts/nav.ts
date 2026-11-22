/**
 * Navigation éditoriale :
 * - Indicateur actif glissant unique (100% GPU : translate3d + scaleX)
 * - Effet de bordure translucide au scroll (`data-scrolled`)
 * - Barre de progression de lecture 2px propulsée par Motion `scroll(animate(...))`
 * - Menu mobile plein écran accessible (focus trap, Échap, verrouillage du scroll)
 */
import { animate, scroll } from 'motion';

interface NavOptions {
  setScrollLocked: (locked: boolean) => void;
}

export function initNav({ setScrollLocked }: NavOptions): void {
  const header = document.querySelector<HTMLElement>('[data-nav]');
  if (!header) return;

  const burger = header.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = header.querySelector<HTMLElement>('[data-menu]');
  const menuLinks = header.querySelectorAll<HTMLAnchorElement>('[data-menu-link]');
  const navLinks = Array.from(header.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));
  const indicator = header.querySelector<HTMLElement>('[data-nav-indicator]');
  const progressBar = header.querySelector<HTMLElement>('[data-scroll-progress]');

  let isMenuOpen = false;
  let activeId = '';

  /* ---------- Indicateur actif glissant (GPU translate3d + scaleX) ---------- */
  const moveIndicator = (link: HTMLAnchorElement | null) => {
    if (!indicator) return;
    if (!link || link.offsetWidth === 0) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.transform = `translate3d(${link.offsetLeft}px, 0, 0) scaleX(${link.offsetWidth})`;
  };

  const setActive = (id: string) => {
    if (id === activeId) return;
    activeId = id;
    let activeLink: HTMLAnchorElement | null = null;
    for (const link of navLinks) {
      const match = link.dataset.navLink === id;
      if (match) {
        link.setAttribute('aria-current', 'true');
        activeLink = link;
      } else {
        link.removeAttribute('aria-current');
      }
    }
    moveIndicator(activeLink);
  };

  const sections = navLinks
    .map((l) => document.getElementById(l.dataset.navLink ?? ''))
    .filter((el): el is HTMLElement => Boolean(el));

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        if (visible.size > 0) {
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
          setActive(top);
        } else if (window.scrollY < 320) {
          setActive('');
        }
      },
      { rootMargin: '-28% 0px -52% 0px', threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Bordure au scroll + barre de progression Motion ScrollTimeline ---------- */
  if (progressBar) {
    scroll(animate(progressBar, { transform: ['scaleX(0)', 'scaleX(1)'] }, { ease: 'linear' }));
  }

  let scrollRaf = 0;
  const syncScrollChrome = () => {
    scrollRaf = 0;
    header.toggleAttribute('data-scrolled', window.scrollY > 12);
  };
  syncScrollChrome();

  window.addEventListener(
    'scroll',
    () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(syncScrollChrome);
    },
    { passive: true }
  );

  /* ---------- Menu mobile ---------- */
  const openMenu = () => {
    if (!burger || !menu) return;
    isMenuOpen = true;
    menu.removeAttribute('inert');
    menu.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    if (burger.dataset.labelClose) burger.setAttribute('aria-label', burger.dataset.labelClose);
    setScrollLocked(true);
  };

  const closeMenu = (restoreFocus = true) => {
    if (!burger || !menu || !isMenuOpen) return;
    isMenuOpen = false;
    menu.classList.remove('is-open');
    menu.setAttribute('inert', '');
    burger.setAttribute('aria-expanded', 'false');
    if (burger.dataset.labelOpen) burger.setAttribute('aria-label', burger.dataset.labelOpen);
    setScrollLocked(false);
    if (restoreFocus) burger.focus();
  };

  burger?.addEventListener('click', () => (isMenuOpen ? closeMenu(true) : openMenu()));
  menuLinks.forEach((link) => link.addEventListener('click', () => closeMenu(false)));

  window.addEventListener(
    'resize',
    () => {
      if (isMenuOpen && window.innerWidth >= 860) closeMenu(false);
      if (activeId) {
        const current = navLinks.find((l) => l.dataset.navLink === activeId) ?? null;
        moveIndicator(current);
      }
      syncScrollChrome();
    },
    { passive: true }
  );

  document.addEventListener('keydown', (e) => {
    if (!isMenuOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu(true);
      return;
    }
    if (e.key === 'Tab') {
      const focusables = Array.from(
        header.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}
