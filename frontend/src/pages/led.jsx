import React, { useEffect, useState } from 'react';
import '../pages/css/towel.css'; // Import CSS styles

const TableLampsPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        // Fetch product data
        fetch('http://localhost:7000/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <header>
                <h1>Towel Page</h1>
            </header>

            <main id="productContainer">
                {products.map(product => (
                    <div key={product.Image} className="product">
                        <img src={product.Image} alt={`Product Image: ${product.Brand}`} />
                        <div className="product-info">
                            <h2>{product.Brand}</h2>
                            <p>{product["Product Type"]}</p>
                            <p>Price: ₹{product.Price}</p>
                            <p>Rating: {product.Rating}</p>
                            <button 
                                className="add-to-cart-button"
                                onClick={() => addToCart(product.Brand, product.Image, product["Product Type"], product.Price)}
                            >
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                ))}
            </main>

            <footer>
                <p>&copy; 2024 Humble Home. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TableLampsPage;
