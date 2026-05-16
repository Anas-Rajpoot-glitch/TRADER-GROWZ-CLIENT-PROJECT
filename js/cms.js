(function () {
  const CATALOG_URL = "data/catalog.json";
  const DRAFT_KEY = "traderGrowzCmsDraft";
  const FALLBACK_IMAGE = "images/trader-growz-logo-icon-20260424.png";
  const categories = [
    { id: "flower", label: "Flower" },
    { id: "concentrates", label: "Concentrates" },
    { id: "edibles", label: "Edibles" },
    { id: "mushies", label: "Mushies" },
    { id: "dispos-carts", label: "Dispos/Carts" }
  ];

  const state = {
    catalog: null,
    category: "flower",
    selectedSlug: null,
    query: "",
    statusFilter: "active",
    fileHandle: null,
    dirty: false,
    message: "Loading catalog..."
  };

  const nodes = {};

  function $(selector) {
    return document.querySelector(selector);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-") || "product";
  }

  function emptyCatalog() {
    return {
      version: 1,
      updatedAt: new Date().toISOString(),
      site: { name: "Trader Growz", currency: "USD" },
      categories: categories.map(function (category) {
        return {
          id: category.id,
          label: category.label,
          page: category.id === "dispos-carts" ? "dispos.html" : `${category.id}.html`,
          products: []
        };
      })
    };
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function normalizeList(value) {
    if (Array.isArray(value)) {
      return value.map(function (item) {
        return String(item || "").trim();
      }).filter(Boolean);
    }

    if (typeof value === "string") {
      return value.split(/\r?\n|,/).map(function (item) {
        return item.trim();
      }).filter(Boolean);
    }

    return [];
  }

  function normalizeFacts(value) {
    return asArray(value).map(function (item) {
      if (Array.isArray(item)) {
        return {
          label: String(item[0] || "").trim(),
          value: String(item[1] || "").trim()
        };
      }

      return {
        label: String(item && item.label || "").trim(),
        value: String(item && item.value || "").trim()
      };
    }).filter(function (item) {
      return item.label && item.value;
    });
  }

  function normalizeProduct(product, categoryId, index) {
    const title = String(product.title || product.name || "").trim();
    const slug = slugify(product.slug || title || `product-${index + 1}`);

    return {
      status: product.status === "inactive" || product.active === false ? "inactive" : "active",
      slug,
      title: title || slug.replace(/-/g, " "),
      brand: String(product.brand || categoryLabel(categoryId)).trim(),
      price: String(product.price || "$0.00").trim(),
      compareAt: product.compareAt ? String(product.compareAt).trim() : null,
      minimumLabel: product.minimumLabel ? String(product.minimumLabel).trim() : null,
      cartPrice: product.cartPrice ? String(product.cartPrice).trim() : null,
      image: String(product.image || FALLBACK_IMAGE).trim(),
      gallery: normalizeList(product.gallery),
      video: product.video ? String(product.video).trim() : null,
      alt: String(product.alt || title || slug.replace(/-/g, " ")).trim(),
      description: product.description ? String(product.description).trim() : "",
      facts: normalizeFacts(product.facts)
    };
  }

  function normalizeCatalog(input) {
    const catalog = emptyCatalog();
    catalog.version = Number(input && input.version) || 1;
    catalog.updatedAt = input && input.updatedAt || new Date().toISOString();
    catalog.site = input && input.site || catalog.site;

    categories.forEach(function (category) {
      const target = categoryRecord(catalog, category.id);
      let source = [];

      if (Array.isArray(input && input.categories)) {
        const match = input.categories.find(function (item) {
          return item && item.id === category.id;
        });
        source = asArray(match && match.products);
      } else if (input && input.categories && input.categories[category.id]) {
        const match = input.categories[category.id];
        source = Array.isArray(match) ? match : asArray(match.products);
      } else if (input && input[category.id]) {
        const match = input[category.id];
        source = Array.isArray(match) ? match : asArray(match.products);
      }

      target.products = source.map(function (product, index) {
        return normalizeProduct(product, category.id, index);
      });
    });

    return catalog;
  }

  function categoryLabel(categoryId) {
    const match = categories.find(function (category) {
      return category.id === categoryId;
    });
    return match ? match.label : categoryId;
  }

  function categoryRecord(catalog, categoryId) {
    return catalog.categories.find(function (category) {
      return category.id === categoryId;
    });
  }

  function currentCategory() {
    return categoryRecord(state.catalog, state.category);
  }

  function currentProducts() {
    const category = currentCategory();
    return category ? category.products : [];
  }

  function filteredProducts() {
    const query = state.query.trim().toLowerCase();

    return currentProducts().filter(function (product) {
      const matchesStatus = state.statusFilter === "all" || product.status === state.statusFilter;
      const text = `${product.title} ${product.brand} ${product.slug} ${product.price}`.toLowerCase();
      return matchesStatus && (!query || text.includes(query));
    });
  }

  function findSelectedProduct() {
    return currentProducts().find(function (product) {
      return product.slug === state.selectedSlug;
    }) || null;
  }

  function ensureSelection() {
    if (findSelectedProduct()) {
      return;
    }

    const first = filteredProducts()[0] || currentProducts()[0] || null;
    state.selectedSlug = first ? first.slug : null;
  }

  function activeCount(categoryId) {
    const category = categoryRecord(state.catalog, categoryId);
    return category ? category.products.filter(function (product) {
      return product.status !== "inactive";
    }).length : 0;
  }

  function totalCount() {
    return categories.reduce(function (sum, category) {
      return sum + activeCount(category.id);
    }, 0);
  }

  function renderToolbar() {
    nodes.status.textContent = state.message;
    nodes.counts.textContent = `${totalCount()} active products`;
  }

  function renderTabs() {
    nodes.tabs.innerHTML = categories.map(function (category) {
      return `
        <button type="button" class="cms-tab${category.id === state.category ? " is-active" : ""}" data-category="${escapeHtml(category.id)}">
          ${escapeHtml(category.label)}
          <span>${activeCount(category.id)} active</span>
        </button>
      `;
    }).join("");
  }

  function productImage(product) {
    return product.image || FALLBACK_IMAGE;
  }

  function renderProductList() {
    const products = filteredProducts();

    if (!products.length) {
      nodes.productList.innerHTML = `
        <div class="cms-empty">
          <div><strong>No products found</strong><span>Change the filter or add a product.</span></div>
        </div>
      `;
      return;
    }

    nodes.productList.innerHTML = products.map(function (product) {
      return `
        <article class="cms-product${product.slug === state.selectedSlug ? " is-selected" : ""}" data-slug="${escapeHtml(product.slug)}">
          <img src="${escapeHtml(productImage(product))}" alt="${escapeHtml(product.alt || product.title)}" onerror="this.src='${FALLBACK_IMAGE}'">
          <div>
            <h2>${escapeHtml(product.title)}</h2>
            <p>${escapeHtml(product.brand)} - ${escapeHtml(product.price)} - ${escapeHtml(product.status)}</p>
          </div>
          <div class="cms-product-actions">
            <button type="button" class="cms-icon-btn" data-action="up" aria-label="Move up">Up</button>
            <button type="button" class="cms-icon-btn" data-action="down" aria-label="Move down">Dn</button>
            <button type="button" class="cms-icon-btn danger" data-action="remove" aria-label="Remove product">Del</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function formatGallery(product) {
    return asArray(product.gallery).join("\n");
  }

  function formatFacts(product) {
    return asArray(product.facts).map(function (fact) {
      return `${fact.label}: ${fact.value}`;
    }).join("\n");
  }

  function renderEditor() {
    const product = findSelectedProduct();

    if (!product) {
      nodes.editor.innerHTML = `
        <div class="cms-empty">
          <div><strong>No product selected</strong><span>Add a product or choose one from the list.</span></div>
        </div>
      `;
      return;
    }

    nodes.editor.innerHTML = `
      <div class="cms-editor-header">
        <div>
          <p class="cms-kicker">${escapeHtml(categoryLabel(state.category))}</p>
          <h2>Edit Product</h2>
        </div>
        <div class="cms-editor-actions">
          <button type="button" id="duplicate-product" class="cms-button ghost">Duplicate</button>
          <button type="button" id="remove-product" class="cms-button danger">Remove</button>
        </div>
      </div>

      <form id="cms-product-form" class="cms-form">
        <div class="cms-preview">
          <img id="preview-image" src="${escapeHtml(productImage(product))}" alt="${escapeHtml(product.alt || product.title)}" onerror="this.src='${FALLBACK_IMAGE}'">
          <div>
            <h2 id="preview-title">${escapeHtml(product.title)}</h2>
            <p id="preview-brand">${escapeHtml(product.brand)}</p>
            <p id="preview-price">${escapeHtml(product.price)}</p>
          </div>
        </div>

        <div class="cms-form-grid">
          <label class="cms-field">
            <span>Category</span>
            <select name="category">${categories.map(function (category) {
              return `<option value="${escapeHtml(category.id)}"${category.id === state.category ? " selected" : ""}>${escapeHtml(category.label)}</option>`;
            }).join("")}</select>
          </label>
          <label class="cms-field">
            <span>Status</span>
            <select name="status">
              <option value="active"${product.status !== "inactive" ? " selected" : ""}>Active</option>
              <option value="inactive"${product.status === "inactive" ? " selected" : ""}>Inactive</option>
            </select>
          </label>
          <label class="cms-field full">
            <span>Product Name</span>
            <input name="title" type="text" value="${escapeHtml(product.title)}" required>
          </label>
          <label class="cms-field">
            <span>Slug</span>
            <input name="slug" type="text" value="${escapeHtml(product.slug)}" required>
          </label>
          <label class="cms-field">
            <span>Brand / Tier</span>
            <input name="brand" type="text" value="${escapeHtml(product.brand)}" required>
          </label>
          <label class="cms-field">
            <span>Price</span>
            <input name="price" type="text" value="${escapeHtml(product.price)}" required>
          </label>
          <label class="cms-field">
            <span>Compare At</span>
            <input name="compareAt" type="text" value="${escapeHtml(product.compareAt || "")}">
          </label>
          <label class="cms-field">
            <span>Minimum Label</span>
            <input name="minimumLabel" type="text" value="${escapeHtml(product.minimumLabel || "")}">
          </label>
          <label class="cms-field">
            <span>Cart Price</span>
            <input name="cartPrice" type="text" value="${escapeHtml(product.cartPrice || "")}">
          </label>
          <label class="cms-field">
            <span>Image Path</span>
            <input name="image" type="text" value="${escapeHtml(product.image)}" required>
          </label>
          <label class="cms-field">
            <span>Video Path</span>
            <input name="video" type="text" value="${escapeHtml(product.video || "")}">
          </label>
          <label class="cms-field full">
            <span>Alt Text</span>
            <input name="alt" type="text" value="${escapeHtml(product.alt || "")}">
          </label>
          <label class="cms-field full">
            <span>Description</span>
            <textarea name="description">${escapeHtml(product.description || "")}</textarea>
          </label>
          <label class="cms-field full">
            <span>Gallery Paths</span>
            <textarea name="gallery">${escapeHtml(formatGallery(product))}</textarea>
          </label>
          <label class="cms-field full">
            <span>Facts</span>
            <textarea name="facts">${escapeHtml(formatFacts(product))}</textarea>
          </label>
        </div>
        <button type="submit" class="cms-button primary">Save Product</button>
      </form>
    `;

    bindEditorForm(product);
  }

  function render() {
    ensureSelection();
    renderToolbar();
    renderTabs();
    renderProductList();
    renderEditor();
  }

  function setMessage(message) {
    state.message = message;
    renderToolbar();
  }

  function saveDraft() {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(state.catalog));
  }

  function markDirty(message) {
    state.catalog.updatedAt = new Date().toISOString();
    state.dirty = true;
    saveDraft();
    state.message = message || "Draft saved.";
    render();
  }

  function uniqueSlug(categoryId, wantedSlug, currentProduct) {
    const category = categoryRecord(state.catalog, categoryId);
    const base = slugify(wantedSlug);
    const taken = new Set(category.products.filter(function (product) {
      return product !== currentProduct;
    }).map(function (product) {
      return product.slug;
    }));

    if (!taken.has(base)) {
      return base;
    }

    let index = 2;
    let next = `${base}-${index}`;
    while (taken.has(next)) {
      index += 1;
      next = `${base}-${index}`;
    }
    return next;
  }

  function parseFacts(value) {
    return String(value || "").split(/\r?\n/).map(function (line) {
      const trimmed = line.trim();
      if (!trimmed) {
        return null;
      }

      const splitAt = trimmed.indexOf(":");
      if (splitAt === -1) {
        return { label: "Detail", value: trimmed };
      }

      return {
        label: trimmed.slice(0, splitAt).trim(),
        value: trimmed.slice(splitAt + 1).trim()
      };
    }).filter(function (fact) {
      return fact && fact.label && fact.value;
    });
  }

  function parseLines(value) {
    return String(value || "").split(/\r?\n/).map(function (line) {
      return line.trim();
    }).filter(Boolean);
  }

  function collectForm(form, currentProduct) {
    const data = new FormData(form);
    const targetCategory = String(data.get("category") || state.category);
    const wantedSlug = data.get("slug") || data.get("title");

    return {
      category: targetCategory,
      status: String(data.get("status") || "active"),
      slug: uniqueSlug(targetCategory, wantedSlug, currentProduct),
      title: String(data.get("title") || "").trim(),
      brand: String(data.get("brand") || "").trim(),
      price: String(data.get("price") || "").trim(),
      compareAt: String(data.get("compareAt") || "").trim() || null,
      minimumLabel: String(data.get("minimumLabel") || "").trim() || null,
      cartPrice: String(data.get("cartPrice") || "").trim() || null,
      image: String(data.get("image") || "").trim() || FALLBACK_IMAGE,
      gallery: parseLines(data.get("gallery")),
      video: String(data.get("video") || "").trim() || null,
      alt: String(data.get("alt") || "").trim(),
      description: String(data.get("description") || "").trim(),
      facts: parseFacts(data.get("facts"))
    };
  }

  function bindEditorForm(product) {
    const form = $("#cms-product-form");
    const duplicate = $("#duplicate-product");
    const remove = $("#remove-product");
    const title = form.querySelector('[name="title"]');
    const slug = form.querySelector('[name="slug"]');
    const brand = form.querySelector('[name="brand"]');
    const price = form.querySelector('[name="price"]');
    const image = form.querySelector('[name="image"]');
    const previewImage = $("#preview-image");
    const previewTitle = $("#preview-title");
    const previewBrand = $("#preview-brand");
    const previewPrice = $("#preview-price");

    function updatePreview() {
      previewTitle.textContent = title.value || "Untitled product";
      previewBrand.textContent = brand.value || "Trader Growz";
      previewPrice.textContent = price.value || "$0.00";
      previewImage.src = image.value || FALLBACK_IMAGE;
    }

    title.addEventListener("input", function () {
      if (!slug.value || slug.value.startsWith("new-product")) {
        slug.value = slugify(title.value);
      }
      updatePreview();
    });
    [brand, price, image].forEach(function (input) {
      input.addEventListener("input", updatePreview);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const currentProduct = findSelectedProduct();
      if (!currentProduct) {
        return;
      }

      const values = collectForm(form, currentProduct);
      const targetCategory = values.category;
      delete values.category;

      if (targetCategory !== state.category) {
        const sourceProducts = currentProducts();
        const sourceIndex = sourceProducts.indexOf(currentProduct);
        if (sourceIndex >= 0) {
          sourceProducts.splice(sourceIndex, 1);
        }
        categoryRecord(state.catalog, targetCategory).products.unshift(currentProduct);
        state.category = targetCategory;
      }

      Object.assign(currentProduct, values);
      if (!currentProduct.alt) {
        currentProduct.alt = currentProduct.title;
      }
      state.selectedSlug = currentProduct.slug;
      markDirty(`${currentProduct.title} saved.`);
    });

    duplicate.addEventListener("click", function () {
      duplicateProduct(product);
    });

    remove.addEventListener("click", function () {
      removeProduct(product.slug);
    });
  }

  function makeProduct() {
    const id = Date.now();
    return {
      status: "active",
      slug: `new-product-${id}`,
      title: "New Product",
      brand: categoryLabel(state.category),
      price: "$0.00",
      compareAt: null,
      minimumLabel: null,
      cartPrice: null,
      image: FALLBACK_IMAGE,
      gallery: [],
      video: null,
      alt: "New Product",
      description: "",
      facts: []
    };
  }

  function addProduct() {
    const product = makeProduct();
    currentProducts().unshift(product);
    state.selectedSlug = product.slug;
    state.statusFilter = "all";
    markDirty("New product added.");
  }

  function duplicateProduct(product) {
    const copy = JSON.parse(JSON.stringify(product));
    copy.title = `${product.title} Copy`;
    copy.slug = uniqueSlug(state.category, `${product.slug}-copy`, null);
    currentProducts().unshift(copy);
    state.selectedSlug = copy.slug;
    state.statusFilter = "all";
    markDirty(`${copy.title} added.`);
  }

  function removeProduct(slug) {
    const product = currentProducts().find(function (item) {
      return item.slug === slug;
    });
    if (!product || !window.confirm(`Remove ${product.title} from the catalog?`)) {
      return;
    }

    const products = currentProducts();
    const index = products.indexOf(product);
    products.splice(index, 1);
    state.selectedSlug = null;
    markDirty(`${product.title} removed.`);
  }

  function moveProduct(slug, direction) {
    const products = currentProducts();
    const index = products.findIndex(function (product) {
      return product.slug === slug;
    });
    const nextIndex = index + direction;

    if (index < 0 || nextIndex < 0 || nextIndex >= products.length) {
      return;
    }

    const item = products[index];
    products.splice(index, 1);
    products.splice(nextIndex, 0, item);
    state.selectedSlug = item.slug;
    markDirty(`${item.title} moved.`);
  }

  function serializeCatalog() {
    const output = normalizeCatalog(state.catalog);
    output.updatedAt = new Date().toISOString();
    return `${JSON.stringify(output, null, 2)}\n`;
  }

  function downloadCatalog() {
    const blob = new Blob([serializeCatalog()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "catalog.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setMessage("catalog.json exported.");
  }

  async function saveCatalogFile() {
    if (!("showSaveFilePicker" in window)) {
      downloadCatalog();
      return;
    }

    try {
      if (!state.fileHandle) {
        state.fileHandle = await window.showSaveFilePicker({
          suggestedName: "catalog.json",
          types: [{ description: "JSON", accept: { "application/json": [".json"] } }]
        });
      }
      const writable = await state.fileHandle.createWritable();
      await writable.write(serializeCatalog());
      await writable.close();
      localStorage.removeItem(DRAFT_KEY);
      state.dirty = false;
      setMessage("Catalog saved to file.");
    } catch (error) {
      if (error && error.name !== "AbortError") {
        setMessage("File save failed. Export is still available.");
      }
    }
  }

  function importCatalogData(data, message) {
    state.catalog = normalizeCatalog(data);
    state.category = "flower";
    state.selectedSlug = null;
    state.dirty = true;
    state.message = message || "Catalog imported.";
    saveDraft();
    render();
  }

  async function openCatalogFile() {
    if (!("showOpenFilePicker" in window)) {
      nodes.importInput.click();
      return;
    }

    try {
      const handles = await window.showOpenFilePicker({
        types: [{ description: "JSON", accept: { "application/json": [".json"] } }],
        multiple: false
      });
      state.fileHandle = handles[0];
      const file = await state.fileHandle.getFile();
      const data = JSON.parse(await file.text());
      importCatalogData(data, "Catalog file opened.");
    } catch (error) {
      if (error && error.name !== "AbortError") {
        setMessage("Could not open that JSON file.");
      }
    }
  }

  async function loadPublishedCatalog() {
    const response = await fetch(`${CATALOG_URL}?v=${Date.now()}`);
    if (!response.ok) {
      throw new Error("Catalog not found");
    }
    return response.json();
  }

  async function resetDraft() {
    if (state.dirty && !window.confirm("Reset the draft and reload the published catalog?")) {
      return;
    }

    localStorage.removeItem(DRAFT_KEY);
    state.fileHandle = null;
    try {
      const data = await loadPublishedCatalog();
      state.catalog = normalizeCatalog(data);
      state.category = "flower";
      state.selectedSlug = null;
      state.dirty = false;
      state.message = "Published catalog loaded.";
      render();
    } catch {
      state.catalog = emptyCatalog();
      state.message = "Published catalog was not found. Empty draft loaded.";
      render();
    }
  }

  function bindGlobalEvents() {
    nodes.tabs.addEventListener("click", function (event) {
      const button = event.target.closest("[data-category]");
      if (!button) {
        return;
      }
      state.category = button.dataset.category;
      state.selectedSlug = null;
      render();
    });

    nodes.productList.addEventListener("click", function (event) {
      const actionButton = event.target.closest("[data-action]");
      const productNode = event.target.closest("[data-slug]");
      if (!productNode) {
        return;
      }

      const slug = productNode.dataset.slug;
      if (actionButton) {
        const action = actionButton.dataset.action;
        if (action === "remove") {
          removeProduct(slug);
        } else if (action === "up") {
          moveProduct(slug, -1);
        } else if (action === "down") {
          moveProduct(slug, 1);
        }
        return;
      }

      state.selectedSlug = slug;
      render();
    });

    nodes.search.addEventListener("input", function () {
      state.query = nodes.search.value;
      state.selectedSlug = null;
      render();
    });

    nodes.statusFilter.addEventListener("change", function () {
      state.statusFilter = nodes.statusFilter.value;
      state.selectedSlug = null;
      render();
    });

    $("#add-product").addEventListener("click", addProduct);
    $("#export-json").addEventListener("click", downloadCatalog);
    $("#save-file").addEventListener("click", saveCatalogFile);
    $("#open-file").addEventListener("click", openCatalogFile);
    $("#import-json").addEventListener("click", function () {
      nodes.importInput.click();
    });
    $("#reset-draft").addEventListener("click", resetDraft);

    nodes.importInput.addEventListener("change", async function () {
      const file = nodes.importInput.files[0];
      if (!file) {
        return;
      }

      try {
        const data = JSON.parse(await file.text());
        importCatalogData(data, "Catalog imported.");
      } catch {
        setMessage("Import failed. Choose a valid catalog JSON file.");
      } finally {
        nodes.importInput.value = "";
      }
    });
  }

  async function init() {
    nodes.status = $("#cms-status");
    nodes.counts = $("#cms-counts");
    nodes.tabs = $("#category-tabs");
    nodes.productList = $("#product-list");
    nodes.editor = $("#product-editor");
    nodes.search = $("#product-search");
    nodes.statusFilter = $("#status-filter");
    nodes.importInput = $("#import-input");

    bindGlobalEvents();

    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        state.catalog = normalizeCatalog(JSON.parse(draft));
        state.dirty = true;
        state.message = "Draft restored.";
        render();
        return;
      } catch {
        localStorage.removeItem(DRAFT_KEY);
      }
    }

    try {
      const data = await loadPublishedCatalog();
      state.catalog = normalizeCatalog(data);
      state.message = "Published catalog loaded.";
    } catch {
      state.catalog = emptyCatalog();
      state.message = "Catalog file not found. Empty draft loaded.";
    }

    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
