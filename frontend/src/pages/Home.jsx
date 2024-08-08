import React, { useState, useEffect } from 'react';
import './css/home.css';

const Home = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$10.00', description: 'Description of Product 1' },
    { id: 2, name: 'Product 2', price: '$20.00', description: 'Description of Product 2' },
    { id: 3, name: 'Product 3', price: '$30.00', description: 'Description of Product 3' },
    // Add more products as needed
  ];
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(" http://localhost:7000/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((error) => console.log("Error fetching message:", error));
  }, []);

  return (
    <div className="App">
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



const ProductCard = ({ product }) => (
  <div className="product-card">
    <h2>{product.name}</h2>
    <p>{product.price}</p>
    <p>{product.description}</p>
    <button>Add to Cart</button>
  </div>
);

export default Home;
