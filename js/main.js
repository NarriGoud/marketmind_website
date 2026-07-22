/* ═══════════════════════════════════════════
   MARKETMIND LANDING — INTERACTIONS
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    var cfg = window.MM_CONFIG || {};

    /* ── Populate Links from Config ───────── */
    function resolveLinks(root) {
        (root || document).querySelectorAll('[data-link]').forEach(function (el) {
            var key = el.getAttribute('data-link');
            var url = cfg[key];
            if (url) {
                el.setAttribute('href', url);
            }
        });
    }

    resolveLinks();

    /* ── Navbar Scroll Effect ─────────────── */
    var navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    /* ── Mobile Menu Toggle ───────────────── */
    var navToggle = document.getElementById('navToggle');
    var navLinks  = document.getElementById('navLinks');
    var navOverlay = document.getElementById('navOverlay');

    function openMenu() {
        navToggle.classList.add('active');
        navLinks.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    /* ── Smooth Scroll for Anchor Links ───── */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            var offset = navbar.offsetHeight + 20;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    /* ── Scroll-Triggered Fade-In ─────────── */
    var fadeElements = [
        '.feature-card',
        '.use-case-card',
        '.channel-card',
        '.mcp-content',
        '.mcp-code',
        '.dev-content',
        '.dev-api-preview',
        '.hero-badge',
        '.hero-title',
        '.hero-subtitle',
        '.hero-buttons',
        '.hero-stats',
        '.section-header',
        '.unified-key-card',
        '.unified-banner',
        '.unified-points li'
    ];

    fadeElements.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.classList.add('fade-in');
        });
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach(function (el) {
        observer.observe(el);
    });

    /* ── Stagger Feature Cards ────────────── */
    document.querySelectorAll('.features-grid .feature-card').forEach(function (card, i) {
        card.style.transitionDelay = (i * 0.08) + 's';
    });

    /* ── Stagger Unified Points ───────────── */
    document.querySelectorAll('.unified-points li').forEach(function (li, i) {
        li.style.transitionDelay = (i * 0.1) + 's';
    });

    document.querySelectorAll('.use-cases-grid .use-case-card').forEach(function (card, i) {
        card.style.transitionDelay = (i * 0.1) + 's';
    });

    document.querySelectorAll('.channels-grid .channel-card').forEach(function (card, i) {
        card.style.transitionDelay = (i * 0.15) + 's';
    });

    /* ── Contact Form (if present) ───────── */
    var contactForm = document.getElementById('contactForm');
    var contactSuccess = document.getElementById('contactSuccess');
    var contactReset = document.getElementById('contactReset');
    var contactTextarea = document.getElementById('contact-message');
    var contactCharCount = document.getElementById('charCount');

    if (contactTextarea && contactCharCount) {
        contactTextarea.addEventListener('input', function () {
            var len = contactTextarea.value.length;
            contactCharCount.textContent = len;
            if (len > 1000) {
                contactTextarea.value = contactTextarea.value.slice(0, 1000);
                contactCharCount.textContent = 1000;
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            contactForm.style.display = 'none';
            contactSuccess.classList.add('visible');
        });
    }

    if (contactReset) {
        contactReset.addEventListener('click', function () {
            contactForm.reset();
            if (contactCharCount) contactCharCount.textContent = '0';
            contactForm.style.display = '';
            contactSuccess.classList.remove('visible');
        });
    }

    /* ── Contact Panel ────────────────────── */
    var contactPanelOverlay = document.getElementById('contactPanelOverlay');
    var contactPanelClose = document.getElementById('contactPanelClose');

    function openContactPanel() {
        if (!contactPanelOverlay) return;
        contactPanelOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeContactPanel() {
        if (!contactPanelOverlay) return;
        contactPanelOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (contactPanelClose) {
        contactPanelClose.addEventListener('click', closeContactPanel);
    }

    if (contactPanelOverlay) {
        contactPanelOverlay.addEventListener('click', function (e) {
            if (e.target === contactPanelOverlay) {
                closeContactPanel();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && contactPanelOverlay && contactPanelOverlay.classList.contains('open')) {
            closeContactPanel();
        }
    });

    document.querySelectorAll('[data-contact]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            openContactPanel();
        });
    });

})();
