import React from 'react';
import './css/home.css';

const Home = () => {
    const products = [
        { id: 1, name: 'Product 1', price: '$10.00', description: 'Description of Product 1' },
        { id: 2, name: 'Product 2', price: '$20.00', description: 'Description of Product 2' },
        { id: 3, name: 'Product 3', price: '$30.00', description: 'Description of Product 3' },
        { id: 4, name: 'Product 4', price: '$40.00', description: 'Description of Product 4' },
        { id: 5, name: 'Product 5', price: '$25.00', description: 'Description of Product 5' },
        { id: 6, name: 'Product 6', price: '$310.00', description: 'Description of Product 6' },
        { id: 7, name: 'Product 7', price: '$100.00', description: 'Description of Product 7' },
        { id: 8, name: 'Product 8', price: '$25.00', description: 'Description of Product 8' },
        { id: 9, name: 'Product 9', price: '$310.00', description: 'Description of Product 9' },
        { id: 10, name: 'Product 10', price: '$100.00', description: 'Description of Product 10' },
    ];

    const handleAddToCart = async (productId) => {
        try {
            const response = await fetch('http://localhost:7000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any authentication headers if required
                },
                body: JSON.stringify({ productId }),
            });

            if (response.ok) {
                console.log('Item added to cart');
            } else {
                console.error('Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    return (
        <div className="container">
            <h1>Products</h1>
            <div className="product-list">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product, onAddToCart }) => (
    <div className="product-card">
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
);

export default Home;
