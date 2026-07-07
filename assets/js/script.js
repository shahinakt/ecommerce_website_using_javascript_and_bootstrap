import { ProductCard } from "./components/ProductCard.js";

// ─── State ────────────────────────────────────────────────────────────────────
let allProducts = [];

// ─── Fetch & Bootstrap ────────────────────────────────────────────────────────
async function loadProducts() {
    showLoading();

    try {
        const response = await fetch("products.json");
        if (!response.ok) throw new Error(`Server returned ${response.status}`);

        allProducts = await response.json();
        populateCategoryFilter();
        renderProducts(allProducts);

    } catch (error) {
        showError(error.message);
    }
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderProducts(products) {
    const container = document.getElementById("productContainer");

    if (products.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-search fs-1 text-muted d-block mb-3"></i>
                <h6 class="text-muted">No products found</h6>
                <p class="text-muted small">Try adjusting your search or filters.</p>
            </div>`;
        return;
    }

    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <p class="text-muted small mb-0">${products.length} product${products.length !== 1 ? "s" : ""} found</p>
        </div>
        <div class="row">
            ${products.map(ProductCard).join("")}
        </div>`;
}

function showLoading() {
    document.getElementById("productContainer").innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3 text-muted">Loading products…</p>
        </div>`;
}

function showError(message) {
    document.getElementById("productContainer").innerHTML = `
        <div class="text-center py-5">
            <i class="bi bi-exclamation-circle fs-1 text-danger d-block mb-3"></i>
            <h6 class="text-danger">Could not load products</h6>
            <p class="text-muted small">${message}</p>
            <p class="text-muted small">
                Make sure you're running a local server
                (e.g. VS Code Live Server or <code>npx http-server</code>).
            </p>
        </div>`;
}

// ─── Filters ──────────────────────────────────────────────────────────────────
function populateCategoryFilter() {
    const select = document.getElementById("categoryFilter");
    if (!select) return;

    const categories = [...new Set(allProducts.map(p => p.category))].sort();

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function applyFilters() {
    const searchTerm = (document.getElementById("searchInput")?.value ?? "")
        .trim()
        .toLowerCase();

    const selectedCategory = document.getElementById("categoryFilter")?.value ?? "";
    const sortOrder        = document.getElementById("priceSort")?.value ?? "";

    let result = allProducts.filter(product => {
        const matchesSearch =
            !searchTerm ||
            product.title.toLowerCase().includes(searchTerm)    ||
            product.brand.toLowerCase().includes(searchTerm)    ||
            product.category.toLowerCase().includes(searchTerm);

        const matchesCategory =
            !selectedCategory || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (sortOrder === "low")  result.sort((a, b) => a.discountPrice - b.discountPrice);
    if (sortOrder === "high") result.sort((a, b) => b.discountPrice - a.discountPrice);

    renderProducts(result);
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
const CART_KEY = "shopease_cart";

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const cart     = getCart();
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id:       product.id,
            title:    product.title,
            price:    product.discountPrice,
            imageSrc: product.imageSrc,
            qty:      1,
        });
    }

    saveCart(cart);
    updateCartBadge();
    showToast(product.title);
}

function updateCartBadge() {
    const cart  = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById("cartCount");
    if (!badge) return;

    badge.textContent = total;
    badge.style.display = total > 0 ? "" : "none";
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function showToast(productTitle) {
    // Remove any existing toast first
    document.getElementById("seToast")?.remove();

    const toast = document.createElement("div");
    toast.id = "seToast";
    toast.className = "position-fixed bottom-0 end-0 p-3";
    toast.style.zIndex = "9999";
    toast.innerHTML = `
        <div class="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-cart-check me-2"></i>
                    <strong>${productTitle}</strong> added to cart!
                </div>
                <button
                    type="button"
                    class="btn-close btn-close-white me-2 m-auto"
                    onclick="document.getElementById('seToast').remove()">
                </button>
            </div>
        </div>`;

    document.body.appendChild(toast);
    setTimeout(() => document.getElementById("seToast")?.remove(), 3000);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartBadge();

    // Search
    document.getElementById("searchInput")
        ?.addEventListener("input", applyFilters);

    // Category filter
    document.getElementById("categoryFilter")
        ?.addEventListener("change", applyFilters);

    // Price sort
    document.getElementById("priceSort")
        ?.addEventListener("change", applyFilters);

    // Cart — event delegation (works even after cards are re-rendered)
    document.getElementById("productContainer")
        ?.addEventListener("click", e => {
            const btn = e.target.closest(".add-cart");
            if (btn) addToCart(Number(btn.dataset.id));
        });
});