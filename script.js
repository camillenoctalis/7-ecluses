/* ============================================================
   LOADER
   Only plays on the very first page opened in a session.
   All subsequent internal navigations skip it immediately.
   ============================================================ */
const loader = document.querySelector('.loader');
const hero   = document.querySelector('.hero');

const SESSION_KEY = 'site7ecluses_loaded';

if (sessionStorage.getItem(SESSION_KEY)) {
  // Already visited — bypass loader instantly, reveal hero right away
  if (loader) {
    loader.style.transition = 'none';
    loader.classList.add('is-gone');
  }
  if (hero) hero.classList.add('is-ready');
} else {
  // First open — run the full intro animation
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (loader) loader.classList.add('is-gone');
      sessionStorage.setItem(SESSION_KEY, '1');
      setTimeout(() => {
        if (hero) hero.classList.add('is-ready');
      }, 350);
    }, 950);
  });
}

/* ============================================================
   NAVIGATION — scroll effect + mobile menu
   ============================================================ */
const siteNav    = document.querySelector('.site-nav');
const navBurger  = document.querySelector('.nav-burger');
const navMobile  = document.querySelector('.nav-mobile');
const mobileLinks = document.querySelectorAll('.nav-mobile a');

window.addEventListener('scroll', () => {
  if (siteNav) {
    siteNav.classList.toggle('is-scrolled', window.scrollY > 48);
  }
}, { passive: true });

if (navBurger && navMobile) {
  navBurger.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    navBurger.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      navBurger.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.classList.add('in-view');
  });
}

/* ============================================================
   WINE TABS (vins.html)
   ============================================================ */
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function activateTab(target) {
  tabBtns.forEach(b => b.classList.toggle('is-active', b.dataset.tab === target));
  tabContents.forEach(tc => {
    const active = tc.dataset.tab === target;
    tc.classList.toggle('is-active', active);
    if (active) {
      tc.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.remove('in-view');
        setTimeout(() => el.classList.add('in-view'), 60);
      });
    }
  });
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

/* Handle hash from other pages e.g. vins.html#rouges */
(function initTabFromHash() {
  const hash = window.location.hash.replace('#', '');
  const valid = ['rouges', 'blancs', 'roses'];
  if (valid.includes(hash)) activateTab(hash);
})();

/* ============================================================
   CONTACT FORM
   ============================================================ */
const contactForms = document.querySelectorAll('.contact-form');
contactForms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = 'Demande envoyée !';
    btn.disabled = true;
    btn.style.background = 'var(--olive)';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 2800);
  });
});
