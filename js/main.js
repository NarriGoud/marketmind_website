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
        '.contact-card',
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

    /* ── Contact Panel (Dynamic Injection) ── */
    var contactPanelLoaded = false;

    function openContactPanel() {
        if (!contactPanelLoaded) {
            fetch('contact_modal.html')
                .then(function (res) { return res.text(); })
                .then(function (html) {
                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = html;
                    document.body.appendChild(wrapper.firstElementChild);
                    contactPanelLoaded = true;
                    bindContactPanel();
                    showContactPanel();
                });
        } else {
            showContactPanel();
        }
    }

    function showContactPanel() {
        var panel = document.getElementById('contactPanel');
        if (panel) {
            panel.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeContactPanel() {
        var panel = document.getElementById('contactPanel');
        if (panel) {
            panel.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    function bindContactPanel() {
        var backdrop = document.getElementById('contactBackdrop');
        var closeBtn = document.getElementById('contactClose');
        var form     = document.getElementById('contactForm');
        var success  = document.getElementById('contactSuccess');
        var resetBtn = document.getElementById('contactReset');
        var textarea = document.getElementById('contact-message');
        var charCount = document.getElementById('charCount');

        if (backdrop) backdrop.addEventListener('click', closeContactPanel);
        if (closeBtn) closeBtn.addEventListener('click', closeContactPanel);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeContactPanel();
        });

        if (textarea && charCount) {
            textarea.addEventListener('input', function () {
                var len = textarea.value.length;
                charCount.textContent = len;
                if (len > 1000) {
                    textarea.value = textarea.value.slice(0, 1000);
                    charCount.textContent = 1000;
                }
            });
        }

        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                form.style.display = 'none';
                success.classList.add('visible');
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                form.reset();
                if (charCount) charCount.textContent = '0';
                form.style.display = '';
                success.classList.remove('visible');
            });
        }

        document.querySelectorAll('#contactPanel [data-link]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var key = btn.getAttribute('data-link');
                var url = cfg[key];
                if (url) window.location.href = url;
            });
        });
    }

    /* ── Contact Triggers ────────────────── */
    document.querySelectorAll('[data-contact]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            openContactPanel();
        });
    });

})();
