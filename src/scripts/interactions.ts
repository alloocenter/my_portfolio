/**
 * Interactions éditoriales :
 * 1. Mini-toast façon Sonner (400ms ease, pause si onglet caché, interruptible)
 * 2. Blocs repliables WAAPI interruptibles (« Lire plus » & « Détails »)
 * 3. Modale Projet accessible :
 *    - Navigation Précédent / Suivant (boutons + flèches clavier)
 *    - Swipe-to-dismiss 1:1 au doigt sur mobile (rubber-banding + vélocité + backdrop lié)
 *    - Annulation propre des timers (interruptibilité garantie)
 * 4. Tooltips Compétences : délai d'intention 140ms au 1er survol, 0ms instantané entre voisins
 * 5. Copie d'e-mail + toast de confirmation CV + horloge d'Abidjan + ancres Lenis
 */
import { animate } from 'motion';
import type { MotionController } from './motion';
import type { CursorController } from './cursor';

function rubberband(overshoot: number, dimension: number, constant = 0.45): number {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
}

export function initInteractions(motion: MotionController, cursor: CursorController): void {
  /* ---------- 1. Mini-toast éditorial (Sonner-inspired) ---------- */
  const toastEl = document.querySelector<HTMLElement>('[data-toast]');
  const toastTextEl = toastEl?.querySelector<HTMLElement>('[data-toast-text]');
  let toastHideTimer = 0;
  let toastUnsetTimer = 0;
  let toastRemaining = 0;
  let toastStartedAt = 0;

  const hideToast = () => {
    if (!toastEl) return;
    window.clearTimeout(toastHideTimer);
    toastHideTimer = 0;
    toastRemaining = 0;
    toastEl.classList.remove('is-visible');
    window.clearTimeout(toastUnsetTimer);
    toastUnsetTimer = window.setTimeout(
      () => {
        if (!toastEl.classList.contains('is-visible')) toastEl.hidden = true;
      },
      motion.isReduced() ? 160 : 380
    );
  };

  const showToast = (message: string, duration = 2600) => {
    if (!toastEl || !toastTextEl || !message) return;
    window.clearTimeout(toastHideTimer);
    window.clearTimeout(toastUnsetTimer);

    toastTextEl.textContent = message;
    toastEl.hidden = false;
    toastRemaining = duration;
    toastStartedAt = Date.now();

    requestAnimationFrame(() => {
      toastEl.classList.add('is-visible');
    });

    toastHideTimer = window.setTimeout(hideToast, duration);
  };

  // Pause le timer du toast quand l'onglet passe en arrière-plan (détail Sonner)
  document.addEventListener('visibilitychange', () => {
    if (!toastEl || !toastEl.classList.contains('is-visible')) return;
    if (document.hidden && toastHideTimer) {
      window.clearTimeout(toastHideTimer);
      toastHideTimer = 0;
      toastRemaining = Math.max(400, toastRemaining - (Date.now() - toastStartedAt));
    } else if (!document.hidden && toastRemaining > 0 && !toastHideTimer) {
      toastStartedAt = Date.now();
      toastHideTimer = window.setTimeout(hideToast, toastRemaining);
    }
  });

  // Confirmation discrète au téléchargement du CV
  const cvMsg = toastEl?.dataset.msgCv ?? '';
  document.querySelectorAll<HTMLAnchorElement>('[data-cv-download]').forEach((link) => {
    link.addEventListener('click', () => {
      if (cvMsg) showToast(cvMsg);
    });
  });

  /* ---------- 2. Blocs repliables WAAPI (À propos + Expériences) ---------- */
  document.querySelectorAll<HTMLButtonElement>('[data-collapse-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      const inner = panel.querySelector<HTMLElement>('[data-panel-inner]');
      const willOpen = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(willOpen));

      const labelEl = btn.querySelector<HTMLElement>('[data-collapse-label]');
      if (labelEl) {
        const nextLabel = willOpen ? btn.dataset.labelOpen : btn.dataset.labelClose;
        if (nextLabel) labelEl.textContent = nextLabel;
      }

      motion.animateAccordion(panel, inner, willOpen);
    });
  });

  /* ---------- 3. Modale Projet + Prev/Next + Swipe-to-Dismiss mobile ---------- */
  let activeModal: HTMLElement | null = null;
  let lastTrigger: HTMLElement | null = null;
  const closeTimers = new WeakMap<HTMLElement, number>();

  const resetModalDragStyles = (modal: HTMLElement) => {
    const dialog = modal.querySelector<HTMLElement>('[data-modal-dialog]');
    const backdrop = modal.querySelector<HTMLElement>('[data-modal-backdrop]');
    if (dialog) {
      dialog.style.transition = '';
      dialog.style.transform = '';
    }
    if (backdrop) {
      backdrop.style.transition = '';
      backdrop.style.opacity = '';
    }
  };

  const closeModal = (restoreFocus = true, instant = false) => {
    if (!activeModal) return;
    const modal = activeModal;
    activeModal = null;

    const existing = closeTimers.get(modal);
    if (existing) window.clearTimeout(existing);

    modal.classList.remove('is-open');
    if (restoreFocus) motion.setScrollLocked(false);

    const finalize = () => {
      if (!modal.classList.contains('is-open')) {
        modal.hidden = true;
        resetModalDragStyles(modal);
      }
      closeTimers.delete(modal);
    };

    if (instant || motion.isReduced()) {
      finalize();
    } else {
      const id = window.setTimeout(finalize, 200);
      closeTimers.set(modal, id);
    }

    if (restoreFocus && lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  };

  const openModal = (
    modal: HTMLElement,
    trigger?: HTMLElement,
    instantSwitch = false,
    focusSelector = '[data-modal-close]'
  ) => {
    const pending = closeTimers.get(modal);
    if (pending) {
      window.clearTimeout(pending);
      closeTimers.delete(modal);
    }

    if (activeModal && activeModal !== modal) {
      closeModal(false, true);
    }

    if (trigger) lastTrigger = trigger;
    activeModal = modal;
    resetModalDragStyles(modal);
    modal.hidden = false;
    motion.setScrollLocked(true);

    const focusTarget = () => {
      (modal.querySelector<HTMLElement>(focusSelector) ?? modal.querySelector<HTMLElement>('[data-modal-close]'))?.focus();
    };

    if (instantSwitch || motion.isReduced()) {
      modal.classList.add('is-open');
      focusTarget();
    } else {
      requestAnimationFrame(() => {
        modal.classList.add('is-open');
        focusTarget();
      });
    }
  };

  const switchModalTo = (targetId: string | undefined, instant = false, focusSelector = '[data-modal-close]') => {
    if (!targetId) return;
    const target = document.getElementById(`modal-${targetId}`);
    if (target) openModal(target, undefined, instant, focusSelector);
  };

  document.querySelectorAll<HTMLElement>('[data-project-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.dataset.projectOpen;
      const modal = id ? document.getElementById(`modal-${id}`) : null;
      if (modal) openModal(modal, trigger, false);
    });
  });

  document.querySelectorAll<HTMLElement>('[data-project-modal]').forEach((modal) => {
    modal.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(true));
    });
    modal.querySelector<HTMLElement>('[data-modal-backdrop]')?.addEventListener('click', () => {
      closeModal(true);
    });
    modal.querySelector<HTMLButtonElement>('[data-modal-prev]')?.addEventListener('click', (e) => {
      switchModalTo((e.currentTarget as HTMLElement).dataset.modalPrev, false, '[data-modal-prev]');
    });
    modal.querySelector<HTMLButtonElement>('[data-modal-next]')?.addEventListener('click', (e) => {
      switchModalTo((e.currentTarget as HTMLElement).dataset.modalNext, false, '[data-modal-next]');
    });

    /* --- Geste 1:1 Swipe-to-Dismiss sur la barre/poignée (mobile bottom sheet) --- */
    const handle = modal.querySelector<HTMLElement>('[data-modal-handle]');
    const dialog = modal.querySelector<HTMLElement>('[data-modal-dialog]');
    const backdrop = modal.querySelector<HTMLElement>('[data-modal-backdrop]');

    if (handle && dialog) {
      let dragging = false;
      let activePointerId = -1;
      let startY = 0;
      let startTime = 0;
      let lastY = 0;

      handle.addEventListener('pointerdown', (e) => {
        // Actif uniquement sur mobile bottom-sheet et hors clic sur boutons
        if (window.innerWidth >= 680 || dragging) return;
        if ((e.target as HTMLElement).closest('button, a')) return;

        dragging = true;
        activePointerId = e.pointerId;
        startY = e.clientY;
        lastY = 0;
        startTime = performance.now();
        handle.setPointerCapture(e.pointerId);

        // Phase TRACK 1:1 : zéro transition CSS
        dialog.style.transition = 'none';
        if (backdrop) backdrop.style.transition = 'none';
      });

      handle.addEventListener('pointermove', (e) => {
        if (!dragging || e.pointerId !== activePointerId) return;
        const dy = e.clientY - startY;
        const h = dialog.offsetHeight || 500;
        // Rubber-band si on tire vers le haut, suivi exact 1:1 vers le bas
        const visualY = dy < 0 ? rubberband(dy, h, 0.28) : dy;
        lastY = dy;

        dialog.style.transform = `translate3d(0, ${visualY.toFixed(1)}px, 0)`;
        if (backdrop) {
          const progress = Math.min(1, Math.max(0, dy / (h * 0.75)));
          backdrop.style.opacity = String((1 - progress).toFixed(3));
        }
      });

      const endDrag = (e: PointerEvent) => {
        if (!dragging || e.pointerId !== activePointerId) return;
        dragging = false;
        activePointerId = -1;

        const elapsed = Math.max(1, performance.now() - startTime);
        const velocity = lastY / elapsed; // px/ms
        const h = dialog.offsetHeight || 500;

        if (lastY > Math.min(130, h * 0.28) || velocity > 0.45) {
          // Dismiss le long du même axe (bas)
          dialog.style.transition = 'transform 200ms var(--ease-drawer)';
          dialog.style.transform = 'translate3d(0, 100%, 0)';
          if (backdrop) {
            backdrop.style.transition = 'opacity 180ms var(--ease-out)';
            backdrop.style.opacity = '0';
          }
          closeModal(true, false);
        } else {
          // Retour physique par ressort Motion (hérite de la vélocité du doigt)
          const fromY = lastY < 0 ? rubberband(lastY, h, 0.28) : lastY;
          dialog.style.transition = 'none';
          const springAnim = animate(
            dialog,
            { y: [fromY, 0] },
            {
              type: 'spring',
              duration: 0.42,
              bounce: 0.16,
              velocity: Math.max(-1200, Math.min(1200, velocity * 1000)),
            }
          );
          springAnim.finished.then(() => {
            dialog.style.transition = '';
            dialog.style.transform = '';
          });
          if (backdrop) {
            backdrop.style.transition = 'opacity 200ms var(--ease-out)';
            backdrop.style.opacity = '';
          }
        }
      };

      handle.addEventListener('pointerup', endDrag);
      handle.addEventListener('pointercancel', endDrag);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!activeModal) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal(true);
      return;
    }
    // Navigation clavier instantanée (zéro délai d'animation sur action clavier)
    if (e.key === 'ArrowLeft') {
      const prevBtn = activeModal.querySelector<HTMLElement>('[data-modal-prev]');
      if (prevBtn?.dataset.modalPrev) {
        e.preventDefault();
        switchModalTo(prevBtn.dataset.modalPrev, true);
      }
      return;
    }
    if (e.key === 'ArrowRight') {
      const nextBtn = activeModal.querySelector<HTMLElement>('[data-modal-next]');
      if (nextBtn?.dataset.modalNext) {
        e.preventDefault();
        switchModalTo(nextBtn.dataset.modalNext, true);
      }
      return;
    }
    if (e.key === 'Tab') {
      const focusables = Array.from(
        activeModal.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
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

  /* ---------- 4. Tooltips Compétences (délai d'intention 140ms → 0ms voisins) ---------- */
  const skillGrid = document.querySelector<HTMLElement>('[data-skills-grid]');
  if (skillGrid) {
    const tiles = Array.from(skillGrid.querySelectorAll<HTMLButtonElement>('[data-skill-tile]'));
    let activeTile: HTMLButtonElement | null = null;
    let hoverIntentTimer = 0;
    let warmResetTimer = 0;

    const activateTile = (tile: HTMLButtonElement | null, instant: boolean) => {
      if (activeTile && activeTile !== tile) {
        activeTile.classList.remove('is-tip-open', 'is-tip-instant');
        activeTile.setAttribute('aria-expanded', 'false');
      }
      activeTile = tile;
      if (!tile) return;

      tile.classList.toggle('is-tip-instant', instant);
      tile.classList.add('is-tip-open');
      tile.setAttribute('aria-expanded', 'true');
    };

    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    tiles.forEach((tile) => {
      if (isFinePointer) {
        tile.addEventListener('pointerenter', (e) => {
          if (e.pointerType !== 'mouse') return;
          window.clearTimeout(warmResetTimer);
          window.clearTimeout(hoverIntentTimer);

          if (skillGrid.dataset.tipWarm === 'true') {
            activateTile(tile, true);
          } else {
            hoverIntentTimer = window.setTimeout(() => {
              skillGrid.dataset.tipWarm = 'true';
              activateTile(tile, false);
            }, 140);
          }
        });

        tile.addEventListener('pointerleave', (e) => {
          if (e.pointerType !== 'mouse') return;
          window.clearTimeout(hoverIntentTimer);
          if (activeTile === tile) activateTile(null, false);
          warmResetTimer = window.setTimeout(() => {
            delete skillGrid.dataset.tipWarm;
          }, 260);
        });
      }

      tile.addEventListener('click', (e) => {
        e.stopPropagation();
        window.clearTimeout(hoverIntentTimer);
        if (activeTile === tile) activateTile(null, false);
        else activateTile(tile, false);
      });

      tile.addEventListener('focus', () => activateTile(tile, false));
      tile.addEventListener('blur', () => {
        if (activeTile === tile) activateTile(null, false);
      });
    });

    document.addEventListener('click', (e) => {
      if (activeTile && !skillGrid.contains(e.target as Node)) {
        activateTile(null, false);
      }
    });
  }

  /* ---------- 5. Copie de l'adresse e-mail (morphing icône + toast) ---------- */
  const copyBtn = document.querySelector<HTMLButtonElement>('[data-copy-email]');
  const copyText = copyBtn?.querySelector<HTMLElement>('[data-copy-text]');
  const copyStatus = document.querySelector<HTMLElement>('[data-copy-status]');

  if (copyBtn && copyText) {
    let resetTimer = 0;
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.copyEmail ?? '';
      let ok = false;
      try {
        await navigator.clipboard.writeText(email);
        ok = true;
      } catch {
        const tmp = document.createElement('input');
        tmp.value = email;
        document.body.appendChild(tmp);
        tmp.select();
        ok = document.execCommand('copy');
        tmp.remove();
      }
      if (!ok) return;

      const copiedLabel = copyBtn.dataset.labelCopied ?? 'Copied';
      const defaultLabel = copyBtn.dataset.labelDefault ?? 'Copy';
      const cursorCopied = copyBtn.dataset.cursorCopied ?? 'COPIÉ ✓';
      const cursorDefault = copyBtn.dataset.cursorDefault ?? 'COPIER';

      copyBtn.classList.add('is-copied');
      copyBtn.dataset.cursor = cursorCopied;
      copyText.textContent = copiedLabel;
      if (copyStatus) copyStatus.textContent = copiedLabel;
      cursor.setLabel(cursorCopied);
      if (toastEl?.dataset.msgEmail) showToast(toastEl.dataset.msgEmail);

      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        copyBtn.classList.remove('is-copied');
        copyBtn.dataset.cursor = cursorDefault;
        copyText.textContent = defaultLabel;
        if (copyStatus) copyStatus.textContent = '';
      }, 2400);
    });
  }

  /* ---------- 6. Heure locale d'Abidjan ---------- */
  const clockEl = document.querySelector<HTMLTimeElement>('[data-abidjan-time]');
  if (clockEl) {
    const fmt = new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Africa/Abidjan',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const update = () => {
      const now = new Date();
      clockEl.textContent = `${fmt.format(now)} GMT`;
      clockEl.dateTime = now.toISOString();
    };
    update();

    let timer = 0;
    const start = () => {
      if (!timer) timer = window.setInterval(update, 1000);
    };
    const stop = () => {
      if (timer) {
        window.clearInterval(timer);
        timer = 0;
      }
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop())).observe(clockEl);
    } else {
      start();
    }
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : update()));
  }

  /* ---------- 7. Ancres internes fluides ---------- */
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();
      motion.scrollToTarget(href);
      if (href !== '#top') history.pushState(null, '', href);
    });
  });
}
