import { ProductCard } from "./components/ProductCard.js";

const product = {
    id: 1,
    title: "Sample Product",
    category: "Electronics",
    brand: "Sample Brand",
    mrp: 1000,
    discountPrice: 800,
    rating: 4.5,
    imageSrc: "media/products/img1.jpg"
}

console.log(ProductCard(product));

// const container = document.getElementById("productContainer");

// products.forEach(product => {
//     container.innerHTML += ProductCard(product);
// });