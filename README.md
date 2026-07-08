# ShopEase E-Commerce Website

ShopEase is a lightweight e-commerce storefront built with HTML, CSS, JavaScript, and Bootstrap. It loads product data from a local JSON file, renders product cards dynamically, and supports search, category filtering, price sorting, and a cart stored in `localStorage`.

## Features

- Responsive product grid built with Bootstrap
- Dynamic product rendering from `data/products.json`
- Search by product name, brand, or category
- Filter products by category
- Sort products by price low to high or high to low
- Add products to cart with a badge counter
- Toast notification when items are added to the cart
- Lazy-loaded product images with fallback handling

## Project Structure

```text
index.html
assets/
  css/
    style.css
  js/
    script.js
    components/
      ProductCard.js
data/
  products.json
media/
  products/
```

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Bootstrap 5
- Bootstrap Icons

## How It Works

- `index.html` loads Bootstrap from a CDN and starts the app with `assets/js/script.js`.
- `script.js` fetches product data from `data/products.json`, applies filters, and updates the product grid.
- `ProductCard.js` converts each product object into a reusable card template.
- Cart items are saved in browser `localStorage` under the key `shopease_cart`.

## Product Data Format

Each product in `data/products.json` uses this shape:

```json
{
  "id": 1,
  "title": "Apple iPhone 15",
  "category": "Mobiles",
  "brand": "Apple",
  "mrp": 79999,
  "discountPrice": 72999,
  "rating": 4.8,
  "imageSrc": "media/products/img1.jpg"
}
```

## Running the Project

Because the app uses `fetch()`, it should be opened through a local web server rather than directly from the file system.

### Option 1: VS Code Live Server

1. Install the Live Server extension.
2. Open `index.html`.
3. Click **Go Live**.

### Option 2: Simple HTTP Server

If you have Node.js installed:

```bash
npx http-server
```

Then open the local URL shown in the terminal.

## Notes

- `cart.html`, `product.html`, and related pages are referenced by the UI, so make sure they exist if you expand the project.
- If product images do not load, check the file paths inside `data/products.json`.

## License

No license file is currently included in this repository.