(function () {
  const TELEGRAM_USERNAME = "JoeTheGrower";
  const LUFFA_URL = "https://callup.luffa.im/c/ZDpPd114Xwh";
  const CART_KEY = "traderGrowzCart";

  function isAgeVerified() {
    return localStorage.getItem("ageVerified") === "true" || sessionStorage.getItem("ageVerified") === "true";
  }

  function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  }

  function resetAccessIfRequested() {
    const params = new URLSearchParams(window.location.search);

    if (!params.has("reset")) {
      return;
    }

    localStorage.removeItem("ageVerified");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("ageVerified");
    sessionStorage.removeItem("showHomePromo");

    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  function getSiteRoot() {
    return document.body.dataset.root || "";
  }

  function goTo(path) {
    window.location.replace(getSiteRoot() + path);
  }

  function showError(id, message) {
    const node = document.getElementById(id);
    if (node) {
      node.textContent = message;
    }
  }

  function populateBirthdaySelects() {
    const month = document.getElementById("birth-month");
    const day = document.getElementById("birth-day");
    const year = document.getElementById("birth-year");

    if (!month || !day || !year) {
      return;
    }

    for (let i = 1; i <= 12; i += 1) {
      const option = document.createElement("option");
      option.value = String(i).padStart(2, "0");
      option.textContent = String(i).padStart(2, "0");
      month.appendChild(option);
    }

    for (let i = 1; i <= 31; i += 1) {
      const option = document.createElement("option");
      option.value = String(i).padStart(2, "0");
      option.textContent = String(i).padStart(2, "0");
      day.appendChild(option);
    }

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 120; i -= 1) {
      const option = document.createElement("option");
      option.value = String(i);
      option.textContent = String(i);
      year.appendChild(option);
    }
  }

  function calculateAge(year, month, day) {
    const today = new Date();
    const birthday = new Date(year, month - 1, day);

    if (
      birthday.getFullYear() !== year ||
      birthday.getMonth() !== month - 1 ||
      birthday.getDate() !== day
    ) {
      return null;
    }

    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
      age -= 1;
    }

    return age;
  }

  function setupAgeGate() {
    if (!isLoggedIn()) {
      goTo("password.html");
      return;
    }

    if (isAgeVerified()) {
      goTo("home.html");
      return;
    }

    populateBirthdaySelects();

    const form = document.getElementById("age-form");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const month = Number(document.getElementById("birth-month").value);
      const day = Number(document.getElementById("birth-day").value);
      const year = Number(document.getElementById("birth-year").value);
      const remember = document.getElementById("remember-age").checked;

      if (!month || !day || !year) {
        showError("age-error", "Please enter a valid birthday");
        return;
      }

      const age = calculateAge(year, month, day);

      if (age === null) {
        showError("age-error", "Please enter a valid birthday");
        return;
      }

      if (age >= 21) {
        if (remember) {
          localStorage.setItem("ageVerified", "true");
        } else {
          sessionStorage.setItem("ageVerified", "true");
        }
        goTo("home.html");
      } else {
        showError("age-error", "You must be 21+ to access this site");
      }
    });
  }

  function setupPasswordGate() {
    if (isLoggedIn()) {
      if (isAgeVerified()) {
        sessionStorage.removeItem("showHomePromo");
        goTo("home.html");
      } else {
        goTo("index.html");
      }
      return;
    }

    const form = document.getElementById("password-form");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const input = document.getElementById("site-password");
      const value = input ? input.value.trim() : "";

      if (value === "PHUNKY") {
        localStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("showHomePromo", "true");
        if (isAgeVerified()) {
          goTo("home.html");
        } else {
          goTo("index.html");
        }
      } else {
        showError("password-error", "Incorrect password. Please try again.");
      }
    });
  }

  function protectPage() {
    const needsProtection = document.body.dataset.protected === "true";
    if (!needsProtection) {
      return;
    }

    if (!isLoggedIn()) {
      goTo("password.html");
      return;
    }

    if (!isAgeVerified()) {
      goTo("index.html");
    }
  }

  function redirectHiddenCatalog() {
    const pathname = window.location.pathname.replace(/\\/g, "/").toLowerCase();
    const isHiddenVapesPage =
      document.body.dataset.page === "vapes" ||
      pathname.endsWith("/vapes.html") ||
      pathname.includes("/products/vapes/");

    if (!isHiddenVapesPage) {
      return false;
    }

    goTo("home.html#shop");
    return true;
  }

  function setupMobileNavigation() {
    const toggle = document.getElementById("mobile-menu-toggle");
    const menu = document.getElementById("mobile-menu");
    const shopToggle = document.getElementById("mobile-shop-toggle");
    const shopPanel = document.getElementById("mobile-shop-panel");

    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }

    if (shopToggle && shopPanel) {
      shopToggle.addEventListener("click", function () {
        const isOpen = shopPanel.classList.toggle("is-open");
        shopToggle.setAttribute("aria-expanded", String(isOpen));
      });
    }
  }

  function getCart() {
    try {
      const cart = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function priceToNumber(price) {
    const match = String(price).replace(/,/g, "").match(/\$?\s*([0-9]+(?:\.[0-9]+)?)/);
    return match ? Number(match[1]) : 0;
  }

  function isContactPrice(price) {
    return /contact/i.test(String(price));
  }

  function getCartQuantity() {
    return getCart().reduce(function (total, item) {
      return total + item.quantity;
    }, 0);
  }

  function updateCartCount() {
    const count = getCartQuantity();
    document.querySelectorAll(".cart-count").forEach(function (node) {
      node.textContent = String(count);
      node.classList.toggle("is-empty", count === 0);
    });
  }

  function setCartMessage(message) {
    const node = document.getElementById("cart-message");
    if (node) {
      node.textContent = message;
      return;
    }

    let toast = document.getElementById("cart-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "cart-toast";
      toast.className = "cart-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    window.clearTimeout(setCartMessage.timeoutId);
    setCartMessage.timeoutId = window.setTimeout(function () {
      toast.remove();
    }, 2200);
  }

  function renderCart() {
    const list = document.getElementById("cart-items");
    const empty = document.getElementById("cart-empty");
    const summary = document.getElementById("cart-summary");
    const totalNode = document.getElementById("cart-total");

    if (!list || !empty || !summary || !totalNode) {
      return;
    }

    const cart = getCart();
    list.innerHTML = "";

    if (cart.length === 0) {
      empty.classList.remove("hidden");
      summary.classList.add("hidden");
      totalNode.textContent = "$0.00";
      return;
    }

    empty.classList.add("hidden");
    summary.classList.remove("hidden");

    let total = 0;
    let hasContactPrice = false;
    cart.forEach(function (item) {
      if (isContactPrice(item.price)) {
        hasContactPrice = true;
      }
      const itemTotal = priceToNumber(item.price) * item.quantity;
      total += itemTotal;

      const article = document.createElement("article");
      article.className = "cart-item";
      article.innerHTML = `
        <div>
          <h2 class="text-lg font-black text-white">${item.name}</h2>
          <p class="mt-1 text-sm font-semibold text-white/70">${item.price}</p>
        </div>
        <div class="cart-actions">
          <button type="button" class="cart-qty-btn" data-cart-action="decrease" data-cart-name="${item.name}" aria-label="Decrease ${item.name}">-</button>
          <span class="cart-qty">${item.quantity}</span>
          <button type="button" class="cart-qty-btn" data-cart-action="increase" data-cart-name="${item.name}" aria-label="Increase ${item.name}">+</button>
          <button type="button" class="cart-remove" data-cart-action="remove" data-cart-name="${item.name}">Remove</button>
        </div>
      `;
      list.appendChild(article);
    });

    totalNode.textContent = hasContactPrice ? "Contact on TG for price" : `$${total.toFixed(2)}`;
  }

  function changeCartItem(productName, delta) {
    const cart = getCart();
    const item = cart.find(function (cartItem) {
      return cartItem.name === productName;
    });

    if (!item) {
      return;
    }

    item.quantity += delta;
    const nextCart = cart.filter(function (cartItem) {
      return cartItem.quantity > 0;
    });

    saveCart(nextCart);
    renderCart();
  }

  function removeCartItem(productName) {
    const nextCart = getCart().filter(function (item) {
      return item.name !== productName;
    });

    saveCart(nextCart);
    renderCart();
  }

  function buildTelegramCartMessage(cart) {
    const lines = cart.map(function (item) {
      return `- ${item.name} - ${item.price} x ${item.quantity}`;
    });

    const hasContactPrice = cart.some(function (item) {
      return isContactPrice(item.price);
    });
    const total = cart.reduce(function (sum, item) {
      return sum + priceToNumber(item.price) * item.quantity;
    }, 0);

    return `I want to order:\n${lines.join("\n")}\n\nTotal: ${hasContactPrice ? "Contact on TG for price" : `$${total.toFixed(2)}`}`;
  }

  function orderCartViaTelegram() {
    const cart = getCart();
    if (cart.length === 0) {
      setCartMessage("Your cart is empty.");
      return;
    }

    const message = buildTelegramCartMessage(cart);
    const url = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  }

  function setupCartPage() {
    const list = document.getElementById("cart-items");
    const orderButton = document.getElementById("cart-order-button");
    const clearButton = document.getElementById("cart-clear-button");

    renderCart();

    if (list) {
      list.addEventListener("click", function (event) {
        const button = event.target.closest("[data-cart-action]");
        if (!button) {
          return;
        }

        const action = button.dataset.cartAction;
        const name = button.dataset.cartName;

        if (action === "increase") {
          changeCartItem(name, 1);
        } else if (action === "decrease") {
          changeCartItem(name, -1);
        } else if (action === "remove") {
          removeCartItem(name);
        }
      });
    }

    if (orderButton) {
      orderButton.addEventListener("click", orderCartViaTelegram);
    }

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        saveCart([]);
        renderCart();
        setCartMessage("Cart cleared.");
      });
    }
  }

  function setupHomePromo() {
    const promo = document.getElementById("home-promo");
    const closeButton = document.getElementById("home-promo-close");
    const shopButton = document.getElementById("home-promo-shop");

    if (!promo) {
      return;
    }

    function closePromo() {
      promo.classList.remove("is-open");
      promo.setAttribute("aria-hidden", "true");
      sessionStorage.removeItem("showHomePromo");
    }

    function openPromo() {
      promo.classList.add("is-open");
      promo.setAttribute("aria-hidden", "false");
    }

    if (sessionStorage.getItem("showHomePromo") === "true") {
      window.setTimeout(openPromo, 350);
    }

    if (closeButton) {
      closeButton.addEventListener("click", closePromo);
    }

    if (shopButton) {
      shopButton.addEventListener("click", closePromo);
    }

    promo.addEventListener("click", function (event) {
      if (event.target === promo) {
        closePromo();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && promo.classList.contains("is-open")) {
        closePromo();
      }
    });
  }

  function setupNewReleasesCarousel() {
    const track = document.querySelector("[data-release-track]");
    const carousel = document.querySelector("[data-release-carousel]");
    const prevButton = document.querySelector("[data-release-prev]");
    const nextButton = document.querySelector("[data-release-next]");
    const dotsWrap = document.querySelector("[data-release-dots]");

    if (!track || !carousel) {
      return;
    }

    const slides = Array.from(track.querySelectorAll(".release-product:not(.is-category-hidden)"));

    if (!slides.length) {
      return;
    }

    let activeIndex = 0;
    let positions = [];
    let scrollTimer;

    function buildPositions() {
      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);
      const nextPositions = slides.map(function (slide) {
        return Math.min(slide.offsetLeft, maxScroll);
      }).filter(function (position, index, list) {
        return index === 0 || Math.abs(position - list[index - 1]) > 4;
      });

      if (!nextPositions.length || maxScroll <= 2) {
        positions = [0];
      } else {
        const last = nextPositions[nextPositions.length - 1];
        positions = Math.abs(last - maxScroll) > 4 ? nextPositions.concat(maxScroll) : nextPositions;
      }
    }

    function renderDots() {
      if (!dotsWrap) {
        return;
      }

      dotsWrap.innerHTML = positions.map(function (_, index) {
        return `<button type="button" class="release-dot" aria-label="Show new releases page ${index + 1}" data-release-dot="${index}"></button>`;
      }).join("");
      dotsWrap.hidden = positions.length <= 1;
    }

    function getNearestIndex() {
      const left = track.scrollLeft;
      let nearest = 0;
      let smallestDistance = Infinity;

      positions.forEach(function (position, index) {
        const distance = Math.abs(position - left);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearest = index;
        }
      });

      return nearest;
    }

    function updateState() {
      activeIndex = getNearestIndex();
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (prevButton) {
        prevButton.disabled = track.scrollLeft <= 2;
      }

      if (nextButton) {
        nextButton.disabled = track.scrollLeft >= maxScroll - 2;
      }

      if (dotsWrap) {
        dotsWrap.querySelectorAll(".release-dot").forEach(function (dot, index) {
          dot.classList.toggle("is-active", index === activeIndex);
          dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
        });
      }
    }

    function scrollToSlide(index) {
      const target = positions[Math.min(Math.max(index, 0), positions.length - 1)];
      if (typeof target !== "number") {
        return;
      }

      track.scrollTo({
        left: target,
        behavior: shouldUseLiteMotion() ? "auto" : "smooth"
      });
    }

    if (dotsWrap) {
      dotsWrap.addEventListener("click", function (event) {
        const button = event.target.closest("[data-release-dot]");
        if (!button) {
          return;
        }
        scrollToSlide(Number(button.dataset.releaseDot));
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        scrollToSlide(activeIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        scrollToSlide(activeIndex + 1);
      });
    }

    track.addEventListener("scroll", function () {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(updateState, 80);
    }, { passive: true });

    window.addEventListener("resize", function () {
      buildPositions();
      renderDots();
      updateState();
    });
    buildPositions();
    renderDots();
    updateState();
  }

  function setupCategoryCarousel() {
    const track = document.querySelector("[data-category-track]");
    const carousel = document.querySelector("[data-category-carousel]");
    const prevButton = document.querySelector("[data-category-prev]");
    const nextButton = document.querySelector("[data-category-next]");
    const dotsWrap = document.querySelector("[data-category-dots]");

    if (!track || !carousel) {
      return;
    }

    const slides = Array.from(track.querySelectorAll(".category-slide:not(.is-category-hidden)"));

    if (!slides.length) {
      return;
    }

    let activeIndex = 0;
    let positions = [];
    let scrollTimer;

    function buildPositions() {
      const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0);
      const nextPositions = slides.map(function (slide) {
        return Math.min(slide.offsetLeft, maxScroll);
      }).filter(function (position, index, list) {
        return index === 0 || Math.abs(position - list[index - 1]) > 4;
      });

      if (!nextPositions.length || maxScroll <= 2) {
        positions = [0];
      } else {
        const last = nextPositions[nextPositions.length - 1];
        positions = Math.abs(last - maxScroll) > 4 ? nextPositions.concat(maxScroll) : nextPositions;
      }
    }

    function renderDots() {
      if (!dotsWrap) {
        return;
      }

      dotsWrap.innerHTML = positions.map(function (_, index) {
        return `<button type="button" class="release-dot" aria-label="Show category page ${index + 1}" data-category-dot="${index}"></button>`;
      }).join("");
      dotsWrap.hidden = positions.length <= 1;
    }

    function getNearestIndex() {
      const left = track.scrollLeft;
      let nearest = 0;
      let smallestDistance = Infinity;

      positions.forEach(function (position, index) {
        const distance = Math.abs(position - left);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearest = index;
        }
      });

      return nearest;
    }

    function updateState() {
      activeIndex = getNearestIndex();
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (prevButton) {
        prevButton.disabled = track.scrollLeft <= 2;
      }

      if (nextButton) {
        nextButton.disabled = track.scrollLeft >= maxScroll - 2;
      }

      if (dotsWrap) {
        dotsWrap.querySelectorAll(".release-dot").forEach(function (dot, index) {
          dot.classList.toggle("is-active", index === activeIndex);
          dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
        });
      }
    }

    function scrollToSlide(index) {
      const target = positions[Math.min(Math.max(index, 0), positions.length - 1)];
      if (typeof target !== "number") {
        return;
      }

      track.scrollTo({
        left: target,
        behavior: shouldUseLiteMotion() ? "auto" : "smooth"
      });
    }

    if (dotsWrap) {
      dotsWrap.addEventListener("click", function (event) {
        const button = event.target.closest("[data-category-dot]");
        if (!button) {
          return;
        }
        scrollToSlide(Number(button.dataset.categoryDot));
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", function () {
        scrollToSlide(activeIndex - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        scrollToSlide(activeIndex + 1);
      });
    }

    track.addEventListener("scroll", function () {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(updateState, 80);
    }, { passive: true });

    window.addEventListener("resize", function () {
      buildPositions();
      renderDots();
      updateState();
    });

    buildPositions();
    renderDots();
    updateState();
  }

  function setupFloatingTelegram() {
    if (document.getElementById("floating-telegram")) {
      return;
    }

    const link = document.createElement("a");
    link.id = "floating-telegram";
    link.className = "floating-telegram";
    link.href = `https://t.me/${TELEGRAM_USERNAME}`;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `Message Trader Growz on Telegram at @${TELEGRAM_USERNAME}`);
    link.innerHTML = `
      <span class="floating-telegram-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M21.5 4.4 18.3 19c-.2 1-1.1 1.2-1.9.7l-5.2-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.4 9.8-8.8c.4-.4-.1-.6-.7-.3L5 11.9.1 10.4c-1-.3-1-1 .2-1.5L19.5 1.5c.9-.3 1.7.2 2 1.3Z" fill="currentColor"/>
        </svg>
      </span>
      <span class="floating-telegram-text">
        <strong>Telegram</strong>
        <span>@${TELEGRAM_USERNAME}</span>
      </span>
    `;

    document.body.appendChild(link);
  }

  function setupFloatingLuffa() {
    if (document.getElementById("floating-luffa")) {
      return;
    }

    const link = document.createElement("a");
    link.id = "floating-luffa";
    link.className = "floating-luffa";
    link.href = LUFFA_URL;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", "Join Trader Growz on Luffa");
    link.innerHTML = `
      <span class="floating-luffa-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M4 6.8A4.8 4.8 0 0 1 8.8 2h6.4A4.8 4.8 0 0 1 20 6.8v4.9a4.8 4.8 0 0 1-4.8 4.8H11l-5.2 4.1v-4.4A4.8 4.8 0 0 1 4 12.5V6.8Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M8 8.5h8M8 12h5.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="floating-luffa-text">
        <strong>Luffa</strong>
        <span>Get updates</span>
      </span>
    `;

    document.body.appendChild(link);
  }

  function setupProductPagination() {
    const grid = document.querySelector("[data-products-per-page]");
    const pagination = document.getElementById("product-pagination");

    if (!grid || !pagination) {
      return;
    }

    const cards = Array.from(grid.querySelectorAll(".product-card"));
    const perPage = Number(grid.dataset.productsPerPage) || 9;
    const totalPages = Math.ceil(cards.length / perPage);
    let currentPage = 1;

    if (totalPages <= 1) {
      pagination.remove();
      return;
    }

    function renderPagination() {
      const pageButtons = Array.from({ length: totalPages }, function (_, index) {
        const page = index + 1;
        return `<button type="button" class="pagination-btn" data-page="${page}" aria-label="Show page ${page}">${page}</button>`;
      }).join("");

      pagination.innerHTML = `
        <button type="button" class="pagination-btn" data-page-action="previous" aria-label="Previous page">&larr;</button>
        ${pageButtons}
        <button type="button" class="pagination-btn" data-page-action="next" aria-label="Next page">&rarr;</button>
      `;
    }

    function showPage(page, shouldScroll) {
      currentPage = Math.min(Math.max(page, 1), totalPages);
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;

      cards.forEach(function (card, index) {
        const isHidden = index < start || index >= end;
        card.classList.toggle("is-hidden", isHidden);

        if (!isHidden) {
          clearMotionStyles(card);
          card.classList.add("is-visible");
        }
      });

      pagination.querySelectorAll("[data-page]").forEach(function (button) {
        const isCurrent = Number(button.dataset.page) === currentPage;
        button.classList.toggle("is-active", isCurrent);
        button.setAttribute("aria-current", isCurrent ? "page" : "false");
      });

      const previous = pagination.querySelector('[data-page-action="previous"]');
      const next = pagination.querySelector('[data-page-action="next"]');

      if (previous) {
        previous.disabled = currentPage === 1;
      }

      if (next) {
        next.disabled = currentPage === totalPages;
      }

      if (shouldScroll) {
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    renderPagination();
    showPage(1, false);

    pagination.addEventListener("click", function (event) {
      const button = event.target.closest("button");
      if (!button) {
        return;
      }

      if (button.dataset.pageAction === "previous") {
        showPage(currentPage - 1, true);
        return;
      }

      if (button.dataset.pageAction === "next") {
        showPage(currentPage + 1, true);
        return;
      }

      if (button.dataset.page) {
        showPage(Number(button.dataset.page), true);
      }
    });
  }

  function setupLuxuryLoader() {
    const page = document.body.dataset.page;

    if (page === "age" || page === "password") {
      return;
    }

    if (document.getElementById("page-loader")) {
      return;
    }

    const loader = document.createElement("div");
    loader.id = "page-loader";
    loader.className = "page-loader";
    loader.setAttribute("aria-hidden", "true");
    loader.innerHTML = `
      <div class="page-loader-mark">
        <span class="page-loader-spinner"></span>
        <span>Trader Growz</span>
      </div>
    `;
    document.body.appendChild(loader);

    function hideLoader() {
      loader.classList.add("is-hidden");
      window.setTimeout(function () {
        if (loader.parentNode && !document.body.classList.contains("is-leaving")) {
          loader.remove();
        }
      }, 560);
    }

    if (document.readyState === "complete") {
      window.setTimeout(hideLoader, 180);
    } else {
      window.addEventListener("load", function () {
        window.setTimeout(hideLoader, 180);
      }, { once: true });
      window.setTimeout(hideLoader, 900);
    }
  }

  function setupHeaderScroll() {
    const header = document.querySelector(".site-header");
    if (!header) {
      return;
    }

    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function hasFinePointer() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function shouldUseLiteMotion() {
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;
    const touchOrSmall = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 900px)").matches;

    return prefersReducedMotion() || touchOrSmall || cores <= 4 || memory <= 4;
  }

  function setupPerformanceMode() {
    document.body.classList.toggle("performance-lite", shouldUseLiteMotion());
  }

  function clearMotionStyles(element) {
    element.style.removeProperty("opacity");
    element.style.removeProperty("visibility");
    element.style.removeProperty("transform");
  }

  function setupRevealOnScroll() {
    if (window.gsap && window.ScrollTrigger && !shouldUseLiteMotion()) {
      return;
    }

    const selectors = [
      "main > section",
      ".product-card",
      ".category-card",
      ".release-product",
      ".info-card",
      ".testimonial-card",
      ".contact-card",
      ".cart-item",
      ".auth-panel",
      ".faq-accordion details",
      ".disclaimer-card",
      ".product-detail-media",
      ".product-detail-copy"
    ].join(",");

    const nodes = Array.from(document.querySelectorAll(selectors)).filter(function (node) {
      return !node.classList.contains("reveal-on-scroll");
    });

    if (!nodes.length) {
      return;
    }

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });

    nodes.forEach(function (node, index) {
      node.classList.add("reveal-on-scroll");
      node.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 45}ms`);
      observer.observe(node);
    });

    window.setTimeout(function () {
      nodes.forEach(function (node) {
        node.classList.add("is-visible");
      });
    }, 900);
  }

  function setupRippleEffects() {
    document.addEventListener("pointerdown", function (event) {
      const target = event.target.closest(".btn-primary, .btn-secondary, .promo-shop-btn, .newsletter-submit, .pagination-btn, .cart-qty-btn, .cart-remove, .social-nav-link, .cart-icon-link, .home-promo-close");
      if (!target || target.disabled) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple-ink";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);

      window.setTimeout(function () {
        ripple.remove();
      }, 680);
    });
  }

  function setupPageTransitions() {
    document.addEventListener("click", function (event) {
      const link = event.target.closest("a[href]");
      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      const target = link.getAttribute("target");

      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        target === "_blank" ||
        link.hasAttribute("download") ||
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const url = new URL(href, window.location.href);
      const isSamePageHash = url.pathname === window.location.pathname && url.hash;

      if (url.origin !== window.location.origin || isSamePageHash) {
        return;
      }

      event.preventDefault();
      document.body.classList.add("is-leaving");
      setupLuxuryLoader();

      if (window.gsap && !shouldUseLiteMotion()) {
        window.gsap.to("main, footer", {
          autoAlpha: 0,
          y: 8,
          duration: 0.5,
          ease: "power2.in",
          onComplete: function () {
            window.location.href = url.href;
          }
        });
        return;
      }

      window.setTimeout(function () {
        window.location.href = url.href;
      }, 500);
    });
  }

  function setupGsapHoverEffects(gsap) {
    if (!hasFinePointer() || shouldUseLiteMotion()) {
      return;
    }

    const buttons = gsap.utils.toArray(".btn-primary, .btn-secondary, .promo-shop-btn, .newsletter-submit, .social-nav-link, .cart-icon-link, .pagination-btn, .cart-qty-btn, .cart-remove");
    buttons.forEach(function (button) {
      button.addEventListener("mouseenter", function () {
        gsap.to(button, { scale: 1.018, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      });

      button.addEventListener("mouseleave", function () {
        gsap.to(button, { scale: 1, duration: 0.5, ease: "power2.out", clearProps: "scale", overwrite: "auto" });
      });
    });
  }

  function setupGsapAnimations() {
    const page = document.body.dataset.page;

    if (page === "age" || page === "password") {
      return false;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || shouldUseLiteMotion()) {
      return false;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ overwrite: "auto" });
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true
    });
    document.body.classList.add("gsap-enhanced");

    gsap.fromTo("main, footer", {
      autoAlpha: 0,
      y: 10
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.56,
      ease: "power2.out",
      clearProps: "opacity,visibility,transform"
    });

    const header = document.querySelector(".site-header");
    if (header) {
      gsap.from(header, {
        autoAlpha: 0,
        y: -18,
        duration: 0.62,
        ease: "power2.out"
      });
    }

    if (document.querySelector(".promo-hero")) {
      const heroTargets = [
        ".promo-hero-panel",
        ".promo-hero-panel .promo-eyebrow",
        ".promo-hero-panel h1",
        ".promo-hero-panel h2",
        ".promo-hero-panel p:not(.promo-eyebrow)",
        ".promo-shop-btn",
        ".promo-hero-panel .btn-primary",
        ".promo-hero-panel .btn-secondary"
      ].join(",");
      function clearHeroIntroStyles() {
        gsap.killTweensOf(heroTargets);
        gsap.set(heroTargets, { clearProps: "opacity,visibility,transform" });
      }

      const heroTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      heroTimeline
        .from(".promo-hero-panel", { autoAlpha: 0, y: 24, duration: 0.68 })
        .from(".promo-hero-panel .promo-eyebrow", { autoAlpha: 0, y: 12, duration: 0.52 }, "-=0.34")
        .from(".promo-hero-panel h1, .promo-hero-panel h2", { autoAlpha: 0, y: 24, duration: 0.68, stagger: 0.08 }, "-=0.26")
        .from(".promo-hero-panel p:not(.promo-eyebrow)", { autoAlpha: 0, y: 14, duration: 0.56 }, "-=0.3")
        .from(".promo-shop-btn, .promo-hero-panel .btn-primary, .promo-hero-panel .btn-secondary", { autoAlpha: 0, scale: 0.96, duration: 0.56, stagger: 0.06 }, "-=0.2");
      heroTimeline.eventCallback("onComplete", clearHeroIntroStyles);
      window.setTimeout(clearHeroIntroStyles, 1800);

    } else if (document.querySelector(".page-hero")) {
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .from(".page-hero .badge", { autoAlpha: 0, y: 12, duration: 0.52 })
        .from(".page-hero h1", { autoAlpha: 0, y: 22, duration: 0.64 }, "-=0.18")
        .from(".page-hero p, .page-hero .btn-primary, .page-hero .btn-secondary", { autoAlpha: 0, y: 14, scale: 0.98, duration: 0.56, stagger: 0.06 }, "-=0.22");
    } else if (document.querySelector(".product-detail-wrap")) {
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .from(".product-detail-media", { autoAlpha: 0, x: -22, duration: 0.66 })
        .from(".product-detail-copy .badge", { autoAlpha: 0, y: 12, duration: 0.52 }, "-=0.34")
        .from(".product-detail-title", { autoAlpha: 0, y: 22, duration: 0.64 }, "-=0.2")
        .from(".product-detail-price, .product-detail-description, .product-fact, .product-buy-row", { autoAlpha: 0, y: 14, duration: 0.54, stagger: 0.045 }, "-=0.26");
    } else if (document.querySelector(".auth-panel")) {
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .from(".auth-logo", { autoAlpha: 0, y: 14, scale: 0.98, duration: 0.54 })
        .from(".auth-panel", { autoAlpha: 0, y: 28, scale: 0.98, duration: 0.62 }, "-=0.28")
        .from(".auth-panel h1, .auth-panel p, .auth-panel form, .auth-panel .error-message", { autoAlpha: 0, y: 12, duration: 0.52, stagger: 0.06 }, "-=0.28");
    }

    const sectionTargets = gsap.utils.toArray("main > section:not(.promo-hero):not(.page-hero):not(.product-detail-wrap), .faq-copy, .newsletter-content, .guarantee-item, .testimonial-card, .contact-card, .cart-item, .disclaimer-card, .product-meta-strip");
    if (sectionTargets.length) {
      ScrollTrigger.batch(sectionTargets, {
        start: "top 88%",
        once: true,
        batchMax: 8,
        onEnter: function (batch) {
          gsap.fromTo(batch, {
            y: 14
          }, {
            y: 0,
            duration: 0.56,
            stagger: 0.04,
            ease: "power2.out",
            clearProps: "transform"
          });
        }
      });
    }

    const cardTargets = gsap.utils.toArray(".product-card:not(.is-hidden), .category-card, .release-product");
    if (cardTargets.length) {
      ScrollTrigger.batch(cardTargets, {
        start: "top 90%",
        once: true,
        batchMax: 9,
        onEnter: function (batch) {
          gsap.fromTo(batch, {
            y: 12
          }, {
            y: 0,
            duration: 0.54,
            stagger: 0.04,
            ease: "power2.out",
            clearProps: "transform"
          });
        }
      });
    }

    setupGsapHoverEffects(gsap);
    return true;
  }

  window.addToCart = function (productName, price) {
    const cart = getCart();
    const existingItem = cart.find(function (item) {
      return item.name === productName;
    });

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: productName,
        price: price,
        quantity: 1
      });
    }

    saveCart(cart);
    setCartMessage(`${productName} added to cart.`);
  };

  document.addEventListener("DOMContentLoaded", function () {
    const page = document.body.dataset.page;

    resetAccessIfRequested();
    setupLuxuryLoader();
    setupPerformanceMode();
    setupHeaderScroll();
    setupRippleEffects();
    setupPageTransitions();
    setupFloatingTelegram();
    setupFloatingLuffa();

    if (page === "age") {
      setupAgeGate();
      return;
    }

    if (page === "password") {
      setupPasswordGate();
      return;
    }

    protectPage();

    if (redirectHiddenCatalog()) {
      return;
    }

    setupMobileNavigation();
    updateCartCount();

    if (page === "cart") {
      setupCartPage();
    }

    if (page === "home") {
      setupHomePromo();
      setupCategoryCarousel();
      setupNewReleasesCarousel();
    }

    setupProductPagination();
    setupGsapAnimations();
    setupRevealOnScroll();
  });
})();
