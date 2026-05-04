// =============================================================
// RETRO ARCADE PORTFOLIO — interactive bits
// =============================================================
(() => {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // -------- Press Start screen --------
  const startScreen = $('#press-start');
  const main = $('#main');

  const beginGame = () => {
    if (!startScreen || startScreen.classList.contains('hide')) return;
    startScreen.classList.add('hide');
    main.classList.remove('opacity-0');
    setTimeout(startTypewriter, 350);
    setTimeout(() => startScreen.remove(), 800);
  };

  if (startScreen) {
    startScreen.addEventListener('click', beginGame);
    document.addEventListener('keydown', (e) => {
      if (startScreen.classList.contains('hide')) return;
      if (['Space', 'Enter', 'NumpadEnter'].includes(e.code)) {
        e.preventDefault();
        beginGame();
      }
    }, { once: false });
  }

  // -------- Typewriter for the bio line --------
  const typewriterEl = $('#typewriter');
  const startTypewriter = () => {
    if (!typewriterEl) return;
    const text = typewriterEl.dataset.text || '';
    typewriterEl.textContent = '';
    typewriterEl.classList.add('cursor');
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        typewriterEl.textContent += text.charAt(i);
        i += 1;
        setTimeout(tick, 18 + Math.random() * 18);
      } else {
        // Keep the cursor blinking afterwards.
      }
    };
    tick();
  };

  // -------- Reveal on scroll + HP-bar fill --------
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('bar') || entry.target.classList.contains('xp-bar')) {
          entry.target.classList.add('full');
        }
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.25 });

  $$('.reveal, .bar, .xp-bar').forEach(el => io.observe(el));

  // -------- Tabs (Quest Log) --------
  const tabs = $$('[data-tab]');
  const panels = $$('[data-panel]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      panels.forEach(p => p.classList.toggle('hidden', p.dataset.panel !== target));
    });
  });

  // -------- Coin counter (clicks) --------
  const coinEl = $('#coin-count');
  let coins = 0;
  document.addEventListener('click', (e) => {
    // Don't count clicks on the press-start screen itself.
    if (startScreen && startScreen.contains(e.target) && !startScreen.classList.contains('hide')) return;
    coins += 1;
    if (coinEl) coinEl.textContent = String(coins).padStart(4, '0');
  });

  // -------- Konami code --------
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
        triggerKonami();
        progress = 0;
      }
    } else {
      progress = e.code === KONAMI[0] ? 1 : 0;
    }
  });

  const triggerKonami = () => {
    document.body.classList.add('konami');
    const banner = $('#unlock-banner');
    if (banner) {
      banner.classList.add('show');
      setTimeout(() => banner.classList.remove('show'), 2800);
    }
    // Reveal the secret stats panel.
    const secret = $('#secret-stats');
    if (secret) secret.classList.remove('hidden');
  };

  // -------- Year stamp --------
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
