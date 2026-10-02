(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const enhance = () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    document.documentElement.classList.add('js');
    toggle.hidden = false;
    const close = (restoreFocus = false) => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      if (restoreFocus) toggle.focus();
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;
      close();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && !window.matchMedia('(min-width: 901px)').matches) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') close(true);
    });
    const wide = window.matchMedia('(min-width: 901px)');
    let lastFocused = document.activeElement;
    document.addEventListener('focusin', (event) => { lastFocused = event.target; });
    if (typeof wide.addEventListener === 'function') wide.addEventListener('change', (event) => {
      const active = document.activeElement === document.body ? lastFocused : document.activeElement;
      const wasInNav = nav.contains(active);
      const wasOnToggle = active === toggle;
      close();
      if (!event.matches && wasInNav) toggle.focus();
      if (event.matches && wasOnToggle) {
        const firstLink = nav.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });
  }
  const copy = document.querySelector('.copy-email');
  const status = document.getElementById('copy-status');
  if (copy && status) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(copy.dataset.email);
        status.textContent = 'Adresse courriel copiée.';
      } catch {
        status.textContent = 'La copie est indisponible. Sélectionnez l’adresse visible et copiez-la vous-même.';
      }
    });
  }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhance, { once: true });
  } else {
    enhance();
  }
})();
