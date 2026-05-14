/* ==============================================================
   Trader Growz — Site-wide animation polish (JS layer)
   IntersectionObserver scroll reveals, image lazy fade-in,
   grid staggers, smooth anchor scroll, cart count bump, active
   nav highlight. Skipped on the bespoke gate pages and respects
   reduced-motion + body.performance-lite.
   ============================================================== */
(function () {
  "use strict";

  if (window.__tgAnimEnhanced) return;
  window.__tgAnimEnhanced = true;

  // ------------------------------------------------------------
  // Skip on the gate pages — they have their own bespoke animation
  // ------------------------------------------------------------
  var page = (document.body && document.body.dataset && document.body.dataset.page) || "";
  if (page === "password" || page === "password-gate" || page === "age" || page === "age-gate") {
    return;
  }

  function prefersReducedMotion() {
    return window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function isLite() {
    return document.body.classList.contains("performance-lite");
  }

  // ------------------------------------------------------------
  // Scroll reveal — auto-tag main sections, cards, and key blocks
  // and toggle .is-visible when they enter the viewport.
  // ------------------------------------------------------------
  function setupScrollReveal() {
    if (prefersReducedMotion()) return;

    var selectors = [
      "main > section",
      ".product-card",
      ".category-card",
      ".release-product",
      ".info-card",
      ".testimonial-card",
      ".contact-card",
      ".cart-item",
      ".faq-accordion details",
      ".disclaimer-card",
      ".product-detail-media",
      ".product-detail-copy",
      ".newsletter-content",
      ".guarantee-item",
      ".product-meta-strip",
      ".home-promo-card",
      ".page-hero",
      ".promo-hero-panel",
      ".section-band > *"
    ].join(",");

    var nodes = Array.from(document.querySelectorAll(selectors));
    nodes = nodes.filter(function (n) {
      return !n.classList.contains("tg-reveal") && !n.classList.contains("reveal-on-scroll");
    });
    if (!nodes.length) return;

    nodes.forEach(function (node, i) {
      node.classList.add("tg-reveal");
      // Mod-6 stagger so long lists don't get a 5-second cascade
      node.style.setProperty("--tg-reveal-delay", (Math.min(i % 6, 5) * 60) + "ms");
    });

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.10, rootMargin: "0px 0px -8% 0px" });

    nodes.forEach(function (n) { io.observe(n); });

    // Fallback: if a node never gets observed within 1.2s of load
    // (e.g. it's already in view at first paint), reveal it.
    setTimeout(function () {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
    }, 1200);
  }

  // ------------------------------------------------------------
  // Grid stagger — children of common grids fade in sequentially
  // ------------------------------------------------------------
  function setupGridStagger() {
    if (prefersReducedMotion()) return;

    var grids = new Set();
    [
      ".category-track",
      ".release-track",
      ".product-grid",
      ".cards-grid",
      ".faq-accordion",
      ".cart-list"
    ].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) { grids.add(el); });
    });
    document.querySelectorAll(".tg-stagger").forEach(function (el) { grids.add(el); });

    if (!grids.size) return;

    grids.forEach(function (grid) {
      grid.classList.add("tg-stagger");
      var kids = grid.children;
      for (var i = 0; i < kids.length; i += 1) {
        var delay = (i % 8) * 70;
        kids[i].style.setProperty("--tg-stagger-delay", delay + "ms");
      }
    });

    if (!("IntersectionObserver" in window)) {
      grids.forEach(function (g) { g.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });

    grids.forEach(function (g) { io.observe(g); });
  }

  // ------------------------------------------------------------
  // Image lazy fade-in
  // ------------------------------------------------------------
  function setupImageFadeIn() {
    if (prefersReducedMotion()) return;

    var imgs = document.querySelectorAll([
      ".product-card img",
      ".category-card img",
      ".release-product img",
      ".info-card img",
      ".testimonial-card img",
      ".product-detail-media img",
      ".promo-hero img",
      ".page-hero img",
      ".cart-item img",
      ".home-promo-card img"
    ].join(","));
    if (!imgs.length) return;

    imgs.forEach(function (img) {
      if (img.dataset.animImgInit) return;
      img.dataset.animImgInit = "1";
      img.setAttribute("data-anim-img", "");
      if (!img.hasAttribute("loading")) img.loading = "lazy";
      if (!img.hasAttribute("decoding")) img.decoding = "async";
    });

    function reveal(img) {
      var done = function () { img.classList.add("is-loaded"); };
      if (img.complete && img.naturalWidth > 0) {
        done();
      } else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    }

    if (!("IntersectionObserver" in window)) {
      imgs.forEach(reveal); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px 12% 0px", threshold: 0.05 });
    imgs.forEach(function (img) { io.observe(img); });
  }

  // ------------------------------------------------------------
  // Smooth anchor scroll for in-page hash links
  // ------------------------------------------------------------
  function setupSmoothAnchors() {
    if (prefersReducedMotion()) return;

    document.addEventListener("click", function (event) {
      var a = event.target.closest && event.target.closest('a[href^="#"]');
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href || href === "#" || href.length < 2) return;
      var target;
      try { target = document.querySelector(href); } catch (_) { return; }
      if (!target) return;

      event.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: top, behavior: "smooth" });
      if (history.replaceState) history.replaceState(null, "", href);
    });
  }

  // ------------------------------------------------------------
  // Cart count bubble bump on change (MutationObserver)
  // ------------------------------------------------------------
  function setupCartCountBump() {
    if (prefersReducedMotion()) return;
    var nodes = document.querySelectorAll(".cart-count");
    if (!nodes.length) return;

    nodes.forEach(function (node) {
      if (node.dataset.tgBumpInit) return;
      node.dataset.tgBumpInit = "1";
      var last = node.textContent;
      var mo = new MutationObserver(function () {
        if (node.textContent === last) return;
        last = node.textContent;
        node.classList.remove("has-bumped");
        void node.offsetWidth;
        node.classList.add("has-bumped");
      });
      mo.observe(node, { childList: true, characterData: true, subtree: true });
    });
  }

  // ------------------------------------------------------------
  // Mark current nav link as active
  // ------------------------------------------------------------
  function setupActiveNav() {
    var path = (window.location.pathname || "").split("/").pop().toLowerCase();
    if (!path) return;
    document.querySelectorAll(".nav-link, .footer-link").forEach(function (a) {
      var href = (a.getAttribute("href") || "").toLowerCase();
      if (!href) return;
      if (href === path || href.endsWith("/" + path)) {
        a.classList.add("is-active");
      }
    });
  }

  // ------------------------------------------------------------
  // Init — defer non-critical observers a tick after DOM ready
  // ------------------------------------------------------------
  function init() {
    setupActiveNav();
    setupSmoothAnchors();
    setupCartCountBump();

    var schedule = window.requestIdleCallback
      ? function (fn) { window.requestIdleCallback(fn, { timeout: 600 }); }
      : function (fn) { setTimeout(fn, 80); };

    schedule(function () {
      setupScrollReveal();
      setupGridStagger();
      setupImageFadeIn();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
}());
