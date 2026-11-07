(() => {
  'use strict';

  // Keep fallback images rooted at the shared assets directory on every nested page.
  const assetRoot = new URL('.', document.currentScript?.src || window.location.href);
  const corner = document.querySelector('a.page-prev, a.page-fold');
  const paper = corner?.closest('.paper');
  if (!paper) return;

  const previousLink = paper.querySelector('a.page-prev');
  const nextLink = paper.querySelector('a.page-fold');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const turnDuration = 690;
  const storageKey = 'may-rhee-last-stack-turn';
  const templates = new Map();
  let turning = false;

  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    turning = false;
    paper.classList.remove('stack-source-hidden');
    document.body.classList.remove('stack-transitioning');
    document.querySelector('.stack-transition-layer')?.remove();
  });

  const preview = {
    'index.html': ['Bio & Links', 'assets/original/may-rhee-mark.png'],
    'profile-2.html': ['Professional Experience', 'assets/original/may-rhee-mark.png'],
    'profile-3.html': ['Education', 'assets/original/may-rhee-mark.png'],
    'profile-4.html': ['Certificates & Awards', 'assets/original/may-rhee-mark.png'],
    'profile-5.html': ['Technical Skills & Referees', 'assets/original/may-rhee-mark.png'],
    'projects-shakeup.html': ['Shake-Up', 'assets/original/shake-up.png'],
    'projects-chichu.html': ['CHI-CHU', 'assets/original/chi-chu.png'],
    'projects-ssafyland.html': ['SSAFYLand', 'assets/original/ssafyland.png'],
    'projects-kurly.html': ['U Life Kurly', 'assets/4/kurly-poster.png'],
    'design.html': ['OSULLOC UX Design', 'assets/design/fallback-osulloc.svg'],
    'design-projection.html': ['Projection Design', 'assets/design/fallback-projection.svg'],
    'design-de-poster.html': ['DE.POSTER', 'assets/design/fallback-de-poster.svg'],
    'design-de-goods.html': ['DE.GOODS', 'assets/design/fallback-de-goods.svg'],
    'design-makerthon.html': ['MakerThon', 'assets/design/fallback-makerthon.svg'],
    'design-video-making.html': ['VIDEO MAKING', 'assets/design/fallback-video-making.svg'],
    'design-wood-work.html': ['Wood Work', 'assets/design/fallback-wood-work.svg'],
    'design-may-illustrations.html': ['MAY', 'assets/design/fallback-may-illustrations.svg'],
    'design-one-fifth-life.html': ['1/5 Life', 'assets/design/fallback-one-fifth-life.svg'],
    'design-tumbler-design.html': ['Tumbler Design', 'assets/design/fallback-tumbler-design.svg'],
    'design-branding.html': ['Branding', 'assets/design/fallback-branding.svg'],
    'design-corelle.html': ['Corelle Pattern Design', 'assets/design/fallback-corelle.svg'],
    'design-workshop.html': ['Workshop · Invisible Seoul', 'assets/design/fallback-workshop.svg'],
    'design-graphic-work.html': ['Graphic Work', 'assets/design/fallback-graphic-work.svg'],
    'design-makestar.html': ['MakeStar', 'assets/design/fallback-makestar.svg'],
    'design-siren-concept.html': ['SIREN · Concept', 'assets/design/fallback-siren-concept.svg'],
    'design-siren-album.html': ['SIREN · Album Art', 'assets/design/fallback-siren-album.svg'],
    'contact.html': ['Guestbook', 'assets/original/may-rhee-mark.png']
  };

  // Use the project root as Bio's canonical URL to avoid separate / and /index.html caches.
  function canonicalHref(href) {
    const url = new URL(href, window.location.href);
    if (url.pathname.endsWith('/index.html')) url.pathname = url.pathname.slice(0, -'index.html'.length);
    return url.href;
  }

  function loadNeighbor(href) {
    if (!href) return Promise.resolve(null);
    const url = new URL(canonicalHref(href));
    if (templates.has(url.href)) return templates.get(url.href);
    const request = fetch(url.href, { credentials: 'same-origin', cache: 'no-cache' })
      .then(response => response.ok ? response.text() : null)
      .then(html => {
        if (!html) return null;
        const destination = new DOMParser().parseFromString(html, 'text/html');
        const template = destination.querySelector('main .paper');
        if (!template) return null;
        template.querySelectorAll('img[src]').forEach(image => {
          image.src = new URL(image.getAttribute('src'), url.href).href;
          image.loading = 'eager';
        });
        const firstImage = template.querySelector('img[src]');
        if (firstImage) {
          const warm = new Image();
          warm.src = firstImage.src;
        }
        return template;
      })
      .catch(() => null);
    templates.set(url.href, request);
    return request;
  }

  [previousLink, nextLink].forEach(link => {
    if (link) loadNeighbor(link.getAttribute('href'));
  });

  function fallbackPaper(href, direction) {
    const name = new URL(href, window.location.href).pathname.split('/').pop();
    const [title, image] = preview[name] || [name.replace(/\.html$/, '').replace(/-/g, ' '), null];
    const article = document.createElement('article');
    article.className = 'paper stack-placeholder-paper';
    const overline = document.createElement('p');
    overline.className = 'stack-placeholder-eyebrow';
    overline.textContent = direction > 0 ? 'THE NEXT PAGE' : 'THE PREVIOUS PAGE';
    article.append(overline);
    if (image) {
      const illustration = document.createElement('img');
      illustration.src = new URL(image, assetRoot).href;
      illustration.alt = '';
      article.append(illustration);
    }
    const heading = document.createElement('h2');
    heading.textContent = title;
    article.append(heading);
    return article;
  }

  async function targetPaper(href, direction) {
    const template = await Promise.race([
      loadNeighbor(href),
      new Promise(resolve => window.setTimeout(() => resolve(null), 110))
    ]);
    return template || fallbackPaper(href, direction);
  }

  function makeSheet(template, rect, position) {
    const wrapper = document.createElement('section');
    wrapper.className = `stack-flight-sheet stack-flight-${position}`;
    wrapper.style.left = `${rect.left}px`;
    wrapper.style.top = `${rect.top}px`;
    wrapper.style.width = `${rect.width}px`;
    wrapper.style.height = `${rect.height}px`;

    const sheet = template.cloneNode(true);
    sheet.classList.add('stack-render-paper');
    sheet.setAttribute('aria-hidden', 'true');
    sheet.inert = true;
    sheet.removeAttribute('id');
    sheet.querySelectorAll('[id]').forEach(element => element.removeAttribute('id'));
    wrapper.append(sheet);
    return wrapper;
  }

  function recordTurn() {
    try { sessionStorage.setItem(storageKey, String(Date.now())); }
    catch { /* Session storage may be disabled for local HTML files. */ }
  }

  function recentlyTurned() {
    try { return Date.now() - Number(sessionStorage.getItem(storageKey) || 0) < 1350; }
    catch { return false; }
  }

  async function turnTo(link, direction) {
    if (!link || turning || recentlyTurned()) return;
    const href = link.getAttribute('href');
    if (!href) return;
    turning = true;
    recordTurn();
    if (reducedMotion.matches || !Element.prototype.animate) {
      window.location.assign(canonicalHref(href));
      return;
    }

    const destination = await targetPaper(href, direction);
    const rect = paper.getBoundingClientRect();
    const layer = document.createElement('aside');
    layer.className = 'stack-transition-layer';
    layer.setAttribute('aria-hidden', 'true');
    const lower = makeSheet(direction > 0 ? destination : paper, rect, 'under');
    const upper = makeSheet(direction > 0 ? paper : destination, rect, 'over');
    layer.append(lower, upper);
    document.body.append(layer);
    paper.classList.add('stack-source-hidden');
    document.body.classList.add('stack-transitioning');

    const settings = {
      duration: turnDuration,
      easing: 'cubic-bezier(.22,.68,.14,1)',
      fill: 'forwards'
    };
    let motions;
    if (direction > 0) {
      motions = [
        upper.animate([
          { transform: 'translate3d(0,0,0) rotate(0deg)', offset: 0 },
          { transform: 'translate3d(-1vw,-22vh,24px) rotate(-2deg)', offset: .38 },
          { transform: 'translate3d(5vw,-125vh,80px) rotate(-10deg)', offset: 1 }
        ], settings),
        lower.animate([
          { transform: 'translate3d(0,16px,0) scale(.979) rotate(1deg)', opacity: .8 },
          { transform: 'translate3d(0,0,0) scale(1) rotate(0deg)', opacity: 1 }
        ], settings)
      ];
    } else {
      motions = [
        upper.animate([
          { transform: 'translate3d(5vw,-125vh,80px) rotate(-10deg)', offset: 0 },
          { transform: 'translate3d(-1vw,-22vh,24px) rotate(-2deg)', offset: .58 },
          { transform: 'translate3d(0,0,0) rotate(0deg)', offset: 1 }
        ], settings),
        lower.animate([
          { transform: 'translate3d(0,0,0) scale(1)', opacity: 1 },
          { transform: 'translate3d(0,14px,0) scale(.981)', opacity: .83 }
        ], settings)
      ];
    }

    await Promise.race([
      Promise.all(motions.map(animation => animation.finished.catch(() => null))),
      new Promise(resolve => window.setTimeout(resolve, turnDuration + 180))
    ]);
    window.location.assign(canonicalHref(href));
  }

  [previousLink, nextLink].forEach(link => {
    if (!link) return;
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      turnTo(link, link === previousLink ? -1 : 1);
    });
  });

  const scrollRoot = () => document.scrollingElement || document.documentElement;
  const atTop = () => scrollRoot().scrollTop <= 5;
  const atBottom = () => scrollRoot().scrollTop + window.innerHeight >= scrollRoot().scrollHeight - 5;
  const fitsScreen = () => {
    const rect = paper.getBoundingClientRect();
    return rect.height <= window.innerHeight - 24 && rect.top >= -12 && rect.bottom <= window.innerHeight + 12;
  };
  const interactive = target => target instanceof Element && Boolean(
    target.closest('input, textarea, select, button, summary, [contenteditable="true"], [role="slider"], dialog[open]')
  );
  const inNestedScroller = (target, delta) => {
    for (let element = target instanceof Element ? target : null; element && element !== document.body; element = element.parentElement) {
      if (element === paper) break;
      const style = window.getComputedStyle(element);
      if (!/(auto|scroll)/.test(style.overflowY) || element.scrollHeight <= element.clientHeight + 2) continue;
      if (delta < 0 && element.scrollTop > 2) return true;
      if (delta > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 2) return true;
    }
    return false;
  };
  const go = direction => {
    const link = direction < 0 ? previousLink : nextLink;
    if (!link || turning || recentlyTurned()) return false;
    link.click();
    return true;
  };

  let wheelTotal = 0;
  let wheelDirection = 0;
  let lastWheel = 0;
  window.addEventListener('wheel', event => {
    if (turning || recentlyTurned() || event.ctrlKey || event.metaKey || interactive(event.target) || document.querySelector('dialog[open]')) return;
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) * 1.2) return;
    const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    const delta = event.deltaY * multiplier;
    const direction = Math.sign(delta);
    if (!direction || inNestedScroller(event.target, delta)) return;
    const link = direction < 0 ? previousLink : nextLink;
    if (!link) return;

    const onPaper = event.target instanceof Element && Boolean(event.target.closest('.paper'));
    const canTurn = (onPaper && fitsScreen()) || (direction < 0 ? atTop() : atBottom());
    if (!canTurn) { wheelTotal = 0; return; }
    if (event.cancelable) event.preventDefault();
    const now = performance.now();
    if (wheelDirection !== direction || now - lastWheel > 420) wheelTotal = 0;
    wheelDirection = direction;
    lastWheel = now;
    wheelTotal += Math.abs(delta);
    if (wheelTotal >= 95) go(direction);
  }, { passive: false });

  let touch = null;
  paper.addEventListener('touchstart', event => {
    if (event.touches.length !== 1 || interactive(event.target)) { touch = null; return; }
    const point = event.touches[0];
    touch = {
      x: point.clientX, y: point.clientY, started: performance.now(),
      previous: Boolean(previousLink && (fitsScreen() || atTop())),
      next: Boolean(nextLink && (fitsScreen() || atBottom()))
    };
  }, { passive: true });
  paper.addEventListener('touchend', event => {
    if (!touch || event.changedTouches.length !== 1) { touch = null; return; }
    const start = touch;
    touch = null;
    const point = event.changedTouches[0];
    const dy = point.clientY - start.y;
    const dx = point.clientX - start.x;
    if (Math.abs(dy) < 90 || Math.abs(dy) < Math.abs(dx) * 1.4 || performance.now() - start.started > 550) return;
    if (dy < 0 && start.previous) go(-1);
    if (dy > 0 && start.next) go(1);
  }, { passive: true });
  paper.addEventListener('touchcancel', () => { touch = null; }, { passive: true });

  document.querySelectorAll('.project-index-hint').forEach(hint => {
    const text = Array.from(hint.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (text) text.textContent = 'Swipe down for the next sheet · swipe up for the previous. On desktop, use the wheel or trackpad. ';
  });
})();
