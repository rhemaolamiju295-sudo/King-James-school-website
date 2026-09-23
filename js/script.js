/* =========================================================
   KING JAMES SCHOOLS — Interactions
   Story hero, parallax, reveals, counters, tabs, gallery, menu
   ========================================================= */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Let CSS hide hover-only affordances (hero arrows) on touch devices
  if (!window.matchMedia('(pointer: fine)').matches) {
    document.documentElement.classList.add('touch-device');
  }

  /* =======================================================
     1. MOBILE MENU (full-screen overlay)
     ======================================================= */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navbar = document.getElementById('navbar');

  const closeMenu = () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  };

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
    });
  }

  /* =======================================================
     2. NAVBAR SOLID ON SCROLL
     ======================================================= */
  const onScrollNav = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* =======================================================
     3. HERO — DIVISION SHOWCASE SLIDER
     ======================================================= */
  const hero = document.querySelector('.hero');
  if (hero) {
    const slides = Array.from(hero.querySelectorAll('[data-slide]'));
    const dots = Array.from(hero.querySelectorAll('.hero-dot'));
    const fills = dots.map((d) => d.querySelector('.dot-fill'));
    const SLIDE_MS = 7500;
    const FADE_MS = 950;
    let current = 0;
    let autoTimer = null;
    let paused = false;
    const cleanupTimers = new Map();

    // Active dot's fill sweeps from 0 → 100% over the slide duration.
    // While paused the sweep is held, so resume() can continue it.
    const startProgress = () => {
      fills.forEach((fill, i) => {
        if (!fill) return;
        fill.style.transition = 'none';
        fill.style.width = i < current ? '100%' : '0%';
      });
      const active = fills[current];
      if (!active || paused || prefersReducedMotion) return;
      void active.offsetWidth; // flush styles so the transition runs
      active.style.transition = `width ${SLIDE_MS}ms linear`;
      active.style.width = '100%';
    };

    const restartAutoplay = () => {
      clearTimeout(autoTimer);
      if (prefersReducedMotion || paused || slides.length < 2) return;
      autoTimer = setTimeout(() => goTo(current + 1), SLIDE_MS);
    };

    const goTo = (index) => {
      const nextIndex = (index + slides.length) % slides.length;
      if (nextIndex === current) return;
      const prevSlide = slides[current];
      const nextSlide = slides[nextIndex];

      // Animate the previous slide out, then hide it
      clearTimeout(cleanupTimers.get(prevSlide));
      prevSlide.classList.remove('is-active');
      prevSlide.classList.add('is-leaving');
      cleanupTimers.set(prevSlide, setTimeout(() => {
        prevSlide.classList.remove('is-leaving');
        prevSlide.hidden = true;
      }, FADE_MS));

      // Reveal the incoming slide
      clearTimeout(cleanupTimers.get(nextSlide));
      nextSlide.hidden = false;
      nextSlide.classList.remove('is-leaving');
      nextSlide.classList.add('is-active');
      current = nextIndex;

      // Sync dots — done dots stay filled and dimmed, the active one sweeps
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-done', i < current);
        dot.setAttribute('aria-selected', String(i === current));
      });
      startProgress();
      restartAutoplay();
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);
    hero.querySelector('#hero-next')?.addEventListener('click', next);
    hero.querySelector('#hero-prev')?.addEventListener('click', prev);
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Pause on hover over the controls — freezes the sweep mid-way
    const pause = () => {
      if (prefersReducedMotion || paused) return;
      paused = true;
      clearTimeout(autoTimer);
      const fill = fills[current];
      if (!fill) return;
      const frozen = getComputedStyle(fill).width;
      fill.style.transition = 'none';
      fill.style.width = frozen;
    };
    const resume = () => {
      if (prefersReducedMotion || !paused) return;
      paused = false;
      const fill = fills[current];
      const track = fill?.parentElement;
      if (!fill || !track) { restartAutoplay(); return; }
      const trackW = track.getBoundingClientRect().width || 64;
      const done = (parseFloat(getComputedStyle(fill).width) || 0) / trackW;
      const remaining = Math.max(500, SLIDE_MS * (1 - done));
      fill.style.transition = `width ${remaining}ms linear`;
      fill.style.width = '100%';
      autoTimer = setTimeout(() => goTo(current + 1), remaining);
    };
    const controls = hero.querySelector('.hero-controls');
    if (controls && window.matchMedia('(pointer: fine)').matches) {
      controls.addEventListener('mouseenter', pause);
      controls.addEventListener('mouseleave', resume);
    }

    // Touch: swipe left/right navigates (dots + arrows cover taps)
    let touchX = null;
    hero.addEventListener('touchstart', (e) => {
      touchX = e.touches[0].clientX;
    }, { passive: true });
    const onTouchEnd = (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      touchX = null;
      if (Math.abs(dx) > 48) (dx < 0 ? next : prev)();
    };
    hero.addEventListener('touchend', onTouchEnd, { passive: true });
    hero.addEventListener('touchcancel', () => { touchX = null; }, { passive: true });

    // Don't advance while the tab is hidden so returning users
    // don't land several slides ahead.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause(); else resume();
    });

    // Keyboard navigation — arrow keys while focus is inside the hero
    hero.addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });

    // Scroll transition: hero copy drifts up and fades out
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      const copy = hero.querySelector('.slide-content');
      if (copy) {
        copy.style.transform = `translateY(${y * 0.18}px)`;
        copy.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.7)));
      }
    }, { passive: true });

    // Init
    slides.forEach((slide, i) => {
      slide.hidden = i !== 0;
      slide.classList.toggle('is-active', i === 0);
    });
    startProgress();
    restartAutoplay();
  }

  /* =======================================================
     4. SCROLL REVEALS
     ======================================================= */
  const revealEls = document.querySelectorAll('.reveal, .reveal-media');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* =======================================================
     5. NUMBER COUNTERS
     ======================================================= */
  const counters = document.querySelectorAll('.count');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const useComma = el.dataset.comma === 'true';
    const duration = 1800;
    const start = performance.now();
    const format = (n) => (useComma ? n.toLocaleString('en-US') : String(n));
    if (prefersReducedMotion) { el.textContent = format(target) + suffix; return; }
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = format(Math.round(target * eased)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => countObserver.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* =======================================================
     6. ACADEMICS TABS (shared-element feel)
     ======================================================= */
  const switchPanel = (tabSel, panelSel, dataAttr) => {
    const tabs = Array.from(document.querySelectorAll(tabSel));
    const panels = Array.from(document.querySelectorAll(panelSel));
    if (!tabs.length || !panels.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const idx = tab.dataset[dataAttr];
        tabs.forEach((t) => {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', String(t === tab));
        });
        panels.forEach((panel) => {
          const active = panel.dataset.panel === idx;
          panel.hidden = !active;
          panel.classList.toggle('is-active', active);
        });
      });
      // Keyboard support
      tab.addEventListener('keydown', (e) => {
        const i = tabs.indexOf(tab);
        if (e.key === 'ArrowRight' && tabs[i + 1]) tabs[i + 1].focus(), tabs[i + 1].click();
        if (e.key === 'ArrowLeft' && tabs[i - 1]) tabs[i - 1].focus(), tabs[i - 1].click();
      });
    });
  };
  switchPanel('.acad-tab', '.acad-panel', 'acad');
  switchPanel('.campus-tab', '.campus-panel', 'campus');

  /* =======================================================
     7. TESTIMONIAL SLIDES
     ======================================================= */
  const tDots = Array.from(document.querySelectorAll('.t-dot'));
  const tSlides = Array.from(document.querySelectorAll('.t-slide'));
  const tImg = document.getElementById('t-img');
  const tImages = ['images/students/parent-1.svg', 'images/students/parent-2.svg', 'images/students/parent-3.svg'];
  let tIndex = 0;
  let tTimer = null;

  const showTestimonial = (idx) => {
    tIndex = idx;
    tSlides.forEach((slide, i) => {
      slide.hidden = i !== idx;
      slide.classList.toggle('is-active', i === idx);
    });
    tDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === idx);
      dot.setAttribute('aria-selected', String(i === idx));
    });
    if (tImg) {
      tImg.style.opacity = '0';
      setTimeout(() => {
        tImg.src = tImages[idx];
        tImg.style.opacity = '1';
      }, 250);
    }
  };
  const startTestimonialTimer = () => {
    if (prefersReducedMotion || !tDots.length) return;
    clearInterval(tTimer);
    tTimer = setInterval(() => showTestimonial((tIndex + 1) % tSlides.length), 8000);
  };
  tDots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
      showTestimonial(i);
      startTestimonialTimer();
    })
  );
  if (tSlides.length) {
    showTestimonial(0);
    startTestimonialTimer();
  }

  /* =======================================================
     8. HORIZONTAL GALLERY — drag to scroll
     ======================================================= */
  const gallery = document.getElementById('h-gallery');
  if (gallery) {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    gallery.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.clientX;
      startScroll = gallery.scrollLeft;
      gallery.classList.add('dragging');
      gallery.setPointerCapture(e.pointerId);
    });
    gallery.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      gallery.scrollLeft = startScroll - (e.clientX - startX);
    });
    const endDrag = () => {
      isDown = false;
      gallery.classList.remove('dragging');
    };
    gallery.addEventListener('pointerup', endDrag);
    gallery.addEventListener('pointercancel', endDrag);

    // Keyboard support
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); gallery.scrollBy({ left: 360, behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); gallery.scrollBy({ left: -360, behavior: 'smooth' }); }
    });
  }

  /* =======================================================
     9. MAGNETIC BUTTONS (subtle)
     ======================================================= */
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* =======================================================
     10. APPLICATION FORM VALIDATION (apply.html)
     ======================================================= */
  const applyForm = document.getElementById('apply-form');
  if (applyForm && !applyForm.dataset.enhanced) {
    applyForm.dataset.enhanced = 'true';

    const validators = {
      required: (v) => v.trim() !== '',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      phone: (v) => /^[+]?[\d\s()-]{7,20}$/.test(v.trim()),
      checked: (_, input) => input.checked,
    };

    const errorBoxFor = (input) => {
      const describedBy = input.getAttribute('aria-describedby');
      return describedBy ? document.getElementById(describedBy) : null;
    };

    const runValidation = (input) => {
      const tests = (input.dataset.validate || '').split(/\s+/).filter(Boolean);
      let firstError = null;
      for (const name of tests) {
        const fn = validators[name];
        if (fn && !fn(input.value || '', input)) {
          firstError = input.dataset[name + 'Error'] || 'Please check this field.';
          break;
        }
      }
      const errorBox = errorBoxFor(input);
      if (firstError) {
        input.setAttribute('aria-invalid', 'true');
        if (errorBox) errorBox.textContent = firstError;
      } else {
        input.removeAttribute('aria-invalid');
        if (errorBox) errorBox.textContent = '';
      }
      return !firstError;
    };

    const fields = Array.from(applyForm.querySelectorAll('input, select, textarea'));
    fields.forEach((input) => {
      input.addEventListener('blur', () => {
        if (input.dataset.validate) runValidation(input);
      });
      input.addEventListener('input', () => {
        if (input.getAttribute('aria-invalid') === 'true') runValidation(input);
      });
      input.addEventListener('change', () => {
        if (input.getAttribute('aria-invalid') === 'true') runValidation(input);
      });
    });

    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstInvalid = null;
      fields.forEach((input) => {
        if (input.dataset.validate && !runValidation(input) && !firstInvalid) {
          firstInvalid = input;
        }
      });
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }
      // Demo success state — wire this to your admissions inbox or CRM.
      applyForm.hidden = true;
      const success = document.getElementById('apply-success');
      if (success) {
        success.hidden = false;
        success.setAttribute('tabindex', '-1');
        success.focus();
      }
    });
  }

  /* =======================================================
     11. FOOTER YEAR
     ======================================================= */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
