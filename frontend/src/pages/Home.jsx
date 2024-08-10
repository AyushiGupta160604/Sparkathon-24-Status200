import React from 'react';
import './css/home.css';

const Home = () => {
    const products = [
        { id: 1, name: 'Product 1', price: '$10.00', description: 'Description of Product 1' },
        { id: 2, name: 'Product 2', price: '$20.00', description: 'Description of Product 2' },
        { id: 3, name: 'Product 3', price: '$30.00', description: 'Description of Product 3' },
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
