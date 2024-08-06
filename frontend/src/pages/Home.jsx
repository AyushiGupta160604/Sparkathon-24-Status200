import React from 'react';
import './home.css';

const Home = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$10.00', description: 'Description of Product 1' },
    { id: 2, name: 'Product 2', price: '$20.00', description: 'Description of Product 2' },
    { id: 3, name: 'Product 3', price: '$30.00', description: 'Description of Product 3' },
    // Add more products as needed
  ];

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const NavBar = () => (
  <nav className="navbar">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
      <li><a href="/cart">Cart</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
);

const ProductCard = ({ product }) => (
  <div className="product-card">
    <h2>{product.name}</h2>
    <p>{product.price}</p>
    <p>{product.description}</p>
    <button>Add to Cart</button>
  </div>
);

export default Home;