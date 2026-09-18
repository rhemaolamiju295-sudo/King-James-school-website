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
     3. STORY HERO
     ======================================================= */
  const hero = document.querySelector('.hero');
  if (hero && !prefersReducedMotion) {
    const slides = Array.from(hero.querySelectorAll('[data-story]'));
    const segs = Array.from(hero.querySelectorAll('.progress-seg'));
    const statusIndex = document.querySelector('#hero-status .status-index');
    const statusLabel = document.querySelector('#hero-status .status-label');
    const STORY_MS = 7000;
    let current = 0;
    let elapsed = 0;
    let rafId = null;
    let lastTick = null;
    let paused = false;
    const fills = segs.map((s) => s.querySelector('.progress-fill'));
    let activeTimer = null;

    const pad = (n) => String(n + 1).padStart(2, '0');

    const render = () => {
      slides.forEach((slide, i) => {
        const active = i === current;
        const leaving = slide.classList.contains('is-leaving');
        if (active && slide.hidden) {
          slide.hidden = false;
          slide.classList.add('is-active');
        } else if (!active && !leaving && !slide.hidden) {
          slide.hidden = true;
          slide.classList.remove('is-active');
        }
      });
      segs.forEach((seg, i) => {
        seg.setAttribute('aria-selected', String(i === current));
        seg.classList.toggle('is-done', i < current);
        if (i < current) fills[i].style.width = '100%';
        else if (i > current) fills[i].style.width = '0%';
      });
      if (statusIndex) statusIndex.textContent = pad(current);
      if (statusLabel) statusLabel.textContent = slides[current].dataset.label || '';
    };

    const tick = (now) => {
      if (!paused) {
        if (lastTick == null) lastTick = now;
        elapsed += now - lastTick;
        const pct = Math.min(100, (elapsed / STORY_MS) * 100);
        fills[current].style.width = pct + '%';
        if (elapsed >= STORY_MS) {
          goTo((current + 1) % slides.length);
        }
      }
      lastTick = now;
      rafId = requestAnimationFrame(tick);
    };

    const goTo = (index) => {
      if (index === current) return;
      const prevSlide = slides[current];
      const nextSlide = slides[index];

      // Animate the old slide out, then hide it
      prevSlide.classList.remove('is-active');
      prevSlide.classList.add('is-leaving');
      fills[current].style.width = '0%';
      setTimeout(() => {
        prevSlide.classList.remove('is-leaving');
        prevSlide.hidden = true;
      }, 900);

      current = index;
      elapsed = 0;
      lastTick = null;
      nextSlide.hidden = false;
      nextSlide.classList.add('is-active');
      // Clear the entrance animation after it finishes so inline transforms
      // (parallax / scroll drift) are not overridden by fill-mode forwards.
      clearTimeout(activeTimer);
      activeTimer = setTimeout(() => nextSlide.classList.remove('is-active'), 1400);
      render();
    };

    // Controls
    const next = () => goTo((current + 1) % slides.length);
    const prev = () => goTo((current - 1 + slides.length) % slides.length);
    hero.querySelector('#hero-next')?.addEventListener('click', next);
    hero.querySelector('#hero-prev')?.addEventListener('click', prev);

    segs.forEach((seg, i) => seg.addEventListener('click', () => goTo(i)));

    // Click zones (left = prev, right = next) — ignore clicks on links/buttons
    hero.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      const rect = hero.getBoundingClientRect();
      (e.clientX - rect.left) > rect.width / 2 ? next() : prev();
    });

    // Pause on hover (desktop) / hold (touch)
    const pause = () => { paused = true; };
    const resume = () => { paused = false; lastTick = null; };
    hero.addEventListener('mouseenter', pause);
    hero.addEventListener('mouseleave', resume);

    // Touch: press-and-hold pauses; a completed swipe navigates.
    // Swipe detection is skipped when the movement is small so that a tap
    // falls through to the click zones (tap left/right = prev/next).
    let holdTimer = null;
    let touchX = null;
    hero.addEventListener('touchstart', (e) => {
      touchX = e.touches[0].clientX;
      holdTimer = setTimeout(pause, 350);
    }, { passive: true });
    const onTouchEnd = (e) => {
      clearTimeout(holdTimer);
      if (paused) setTimeout(resume, 800);
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 48) {
        (dx < 0 ? next : prev)();
        paused = false; // a swipe is an explicit action — resume playback
      }
      touchX = null;
    };
    hero.addEventListener('touchend', onTouchEnd, { passive: true });
    hero.addEventListener('touchcancel', onTouchEnd, { passive: true });

    // Pause the timer while the tab is hidden so returning users
    // don't land several stories ahead.
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause(); else resume();
    });

    // Keyboard navigation — only when focus is inside the hero
    hero.addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea, a, button') && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    });
    hero.tabIndex = -1;

    // Cursor parallax (extremely subtle)
    if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        slides.forEach((slide) => {
          const media = slide.querySelector('.story-media');
          if (!media) return;
          const depth = parseFloat(getComputedStyle(media).getPropertyValue('--parallax')) || 0.3;
          media.style.setProperty('--px', `${(-x * depth * 30).toFixed(2)}px`);
          media.style.setProperty('--py', `${(-y * depth * 30).toFixed(2)}px`);
        });
      });
    }

    // Scroll transition: hero content drifts up, bg scales slightly
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      hero.style.setProperty('--scroll-progress', String(y / window.innerHeight));
      const copy = hero.querySelector('.story-copy');
      const media = slides[current]?.querySelector('.story-media');
      if (copy) copy.style.transform = `translateY(${y * 0.18}px)`;
      if (copy) copy.style.opacity = String(Math.max(0, 1 - (y / (window.innerHeight * 0.7))));
      if (media) media.style.filter = `brightness(${Math.max(0.75, 1 - y / 2500)})`;
    }, { passive: true });

    render();
    rafId = requestAnimationFrame(tick);
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
  const tImages = ['images/parent-1.svg', 'images/parent-2.svg', 'images/parent-3.svg'];
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
    document.querySelectorAll('.magnetic').fhttps://emeraldschools.com/orEach((btn) => {
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
