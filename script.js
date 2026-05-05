// =============================================================
// SARAH MCGREGOR — PORTFOLIO
// Notebook with page-turn navigation
// =============================================================
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ---------- Detect mobile (drop the page-flip mechanic) ----------
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  // ---------- Typewriter (cover bio) ----------
  const typewriterEl = $('#typewriter');
  const startTypewriter = () => {
    if (!typewriterEl) return;
    const text = typewriterEl.dataset.text || '';
    typewriterEl.textContent = '';
    typewriterEl.classList.add('typing');
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        typewriterEl.textContent += text.charAt(i);
        i += 1;
        setTimeout(tick, 16 + Math.random() * 18);
      }
    };
    tick();
  };
  setTimeout(startTypewriter, 600);

  // ---------- Page navigation ----------
  const pages = $$('.page');
  const navPrev = $('.nav-prev');
  const navNext = $('.nav-next');
  const navContents = $('.nav-contents');
  const navMarker = $('.nav-marker');

  const labels = pages.map(p => {
    const dp = p.dataset.page;
    const titles = {
      cover: 'cover',
      contents: 'i. contents',
      numbers: 'ii. numbers',
      toolbox: 'iii. toolbox',
      journal: 'iv. journal',
      contact: 'v. contact',
    };
    return titles[dp] || dp;
  });

  let current = 0;

  const navigate = (target) => {
    if (isMobile()) {
      // On mobile, just scroll to the page (no flipping)
      pages[target] && pages[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (target < 0 || target >= pages.length || target === current) return;

    if (target > current) {
      for (let i = current; i < target; i++) {
        pages[i].classList.add('flipped');
      }
    } else {
      for (let i = target; i < current; i++) {
        pages[i].classList.remove('flipped');
      }
    }
    current = target;
    updateNav();

    // scroll the active page-inner back to top so users start at the top of new content
    const activeInner = pages[current].querySelector('.page-inner');
    if (activeInner) activeInner.scrollTop = 0;
  };

  const updateNav = () => {
    if (!navPrev) return;
    navPrev.disabled = current === 0;
    navNext.disabled = current === pages.length - 1;
    if (navMarker) navMarker.textContent = labels[current] || '';
  };

  if (navPrev) navPrev.addEventListener('click', () => navigate(current - 1));
  if (navNext) navNext.addEventListener('click', () => navigate(current + 1));
  if (navContents) navContents.addEventListener('click', () => {
    const idx = pages.findIndex(p => p.dataset.page === 'contents');
    navigate(idx);
  });

  // TOC entries
  $$('.toc-entry').forEach(entry => {
    entry.addEventListener('click', e => {
      e.preventDefault();
      const target = entry.dataset.target;
      const targetIndex = pages.findIndex(p => p.dataset.page === target);
      if (targetIndex >= 0) navigate(targetIndex);
    });
  });

  // Cover CTA
  const coverCta = $('.cover-cta');
  if (coverCta) {
    coverCta.addEventListener('click', () => {
      const dp = coverCta.dataset.target || 'contents';
      const idx = pages.findIndex(p => p.dataset.page === dp);
      navigate(idx >= 0 ? idx : 1);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.code === 'ArrowRight' || e.code === 'PageDown' || e.code === 'Space') {
      if (e.code === 'Space' && (current === 0 || current === pages.length - 1)) return;
      e.preventDefault();
      navigate(current + 1);
    }
    if (e.code === 'ArrowLeft' || e.code === 'PageUp') {
      e.preventDefault();
      navigate(current - 1);
    }
  });

  updateNav();

  // ---------- Tabs (Journal panels) ----------
  const tabs = $$('[data-tab]');
  const panels = $$('[data-panel]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panels.forEach(p => p.classList.toggle('hidden', p.dataset.panel !== target));
    });
  });

  // ---------- Konami → Full Bloom (hidden) ----------
  const KONAMI = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'KeyB','KeyA',
  ];
  let progress = 0;
  document.addEventListener('keydown', (e) => {
    if (e.code === KONAMI[progress]) {
      progress += 1;
      if (progress === KONAMI.length) {
        document.body.classList.add('bloomed');
        const banner = $('#bloom-banner');
        if (banner) {
          banner.classList.add('show');
          setTimeout(() => banner.classList.remove('show'), 3200);
        }
        progress = 0;
      }
    } else {
      progress = e.code === KONAMI[0] ? 1 : 0;
    }
  });
})();
