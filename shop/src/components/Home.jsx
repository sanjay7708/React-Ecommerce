body {
  background-color: #fafafa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  color: #333;
}

/* Container */
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 25px;
  padding: 40px 20px;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}

/* Product Card */
.product-card {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
}

.product-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  background-color: #f2f2f2;
  transition: transform 0.3s ease;
}

.product-card:hover img {
  transform: scale(1.05);
}

/* Text */
.product-card h3 {
  font-size: 1.05rem;
  margin: 12px 0 6px;
  padding: 0 12px;
  color: #2c3e50;
  font-weight: 600;
}

.product-card .price {
  font-weight: bold;
  color: #e67e22;
  margin: 0 0 14px;
  padding: 0 12px;
  font-size: 1.05rem;
}

/* No results page */
.no-results {
  text-align: center;
  padding: 40px;
}

.no-results h3 {
  font-size: 1.2rem;
  color: #444;
}

.back-btn {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 18px;
  background: #2c3e50;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
}

.back-btn:hover {
  background: #1b2836;
}

/* Loading & Error */
.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.1rem;
}

/* 📱 Tablet Responsive */
@media (max-width: 900px) {
  .products-container {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .product-card img {
    height: 200px;
  }
}

/* 📱 Mobile Responsive */
@media (max-width: 600px) {
  .products-container {
    padding: 20px 12px;
    gap: 15px;
  }

  .product-card img {
    height: 170px;
  }

  .product-card h3 {
    font-size: 0.95rem;
  }

  .product-card .price {
    font-size: 0.95rem;
  }
}

/* 📱 Very Small Screens (350px and below) */
@media (max-width: 380px) {
  .products-container {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .product-card img {
    height: 150px;
  }
}
