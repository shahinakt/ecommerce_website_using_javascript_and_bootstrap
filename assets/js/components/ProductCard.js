export function ProductCard(product) {
    return `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
            <div class="card h-100">

                <a href="product.html?id=${product.id}">
                    <img
                        src="${product.imageSrc}"
                        class="card-img-top"
                        alt="${product.title}">
                </a>

                <div class="card-body d-flex flex-column">

                    <small class="text-secondary">
                        ${product.category}
                    </small>

                    <h6 class="card-title mt-2">
                        ${product.title}
                    </h6>

                    <div class="mb-2">
                        <span class="text-warning">
                            <i class="bi bi-star-fill"></i>
                            ${product.rating}
                        </span>
                    </div>

                    <div class="mb-3">
                        <span class="fs-5 fw-bold text-dark">
                            ₹${product.discountPrice}
                        </span>

                        <span class="text-decoration-line-through text-muted ms-2">
                            ₹${product.mrp}
                        </span>
                    </div>

                    <div class="mt-auto d-grid gap-2">

                        <button
                            class="btn btn-primary add-cart"
                            data-id="${product.id}">
                            <i class="bi bi-cart-plus"></i>
                            Add to Cart
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