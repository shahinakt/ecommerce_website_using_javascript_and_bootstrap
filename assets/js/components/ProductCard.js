export function ProductCard(product) {
    const discountPercent = Math.round(
        ((product.mrp - product.discountPrice) / product.mrp) * 100
    );

    const formattedPrice = product.discountPrice.toLocaleString("en-IN");
    const formattedMrp   = product.mrp.toLocaleString("en-IN");

    return `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
            <div class="card h-100 product-card">

                <a href="product.html?id=${product.id}" class="position-relative d-block overflow-hidden">
                    <img
                        src="${product.imageSrc}"
                        class="card-img-top product-img"
                        alt="${product.title}"
                        loading="lazy"
                        onerror="this.src='https://placehold.co/400x300?text=No+Image'">

                    ${discountPercent > 0
                        ? `<span class="badge bg-danger position-absolute top-0 end-0 m-2">
                               ${discountPercent}% OFF
                           </span>`
                        : ""}
                </a>

                <div class="card-body d-flex flex-column">

                    <small class="product-meta text-uppercase">
                        ${product.brand} &middot; ${product.category}
                    </small>

                    <h6 class="card-title mt-1 mb-2">
                        ${product.title}
                    </h6>

                    <div class="mb-2">
                        <span class="badge bg-success rating-badge">
                            <i class="bi bi-star-fill me-1"></i>${product.rating}
                        </span>
                    </div>

                    <div class="mb-3">
                        <span class="fs-5 fw-bold text-dark">
                            &#8377;${formattedPrice}
                        </span>
                        <span class="text-decoration-line-through text-muted ms-2 small">
                            &#8377;${formattedMrp}
                        </span>
                        <span class="text-success small ms-1 fw-semibold">
                            Save &#8377;${(product.mrp - product.discountPrice).toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div class="mt-auto d-grid gap-2">
                        <button
                            class="btn btn-primary add-cart"
                            data-id="${product.id}">
                            <i class="bi bi-cart-plus me-1"></i>Add to Cart
                        </button>

                        <a
                            href="product.html?id=${product.id}"
                            class="btn btn-outline-secondary">
                            View Details
                        </a>
                    </div>

                </div>
            </div>
        </div>
    `;
}