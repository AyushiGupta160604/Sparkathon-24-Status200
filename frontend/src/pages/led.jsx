
import React, { useEffect, useState } from 'react';
import '../pages/css/home.css';

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

    const handleCharity = () =>{
        window.location.href = "/charity";
    }
    
    const handleAddToCart = (productId, brand, image, productType, price) => {
        // Update local cart state
        const updatedCart = [...cart, { productId, brand, image, productType, price }];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Send to backend (optional, if you want to keep cart in backend as well)
        fetch('http://localhost:7000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ productId })
        })
            .then(res => res.json())
            .then(data => console.log('Product added to cart:', data))
            .catch(err => console.error('Error adding to cart:', err));
    };

    return (
        <div>
            <header>
                <h1>  </h1>
            </header>

            <main id="productContainer">
                {products.map(product => (
                    <div key={product._id} className="product">
                        <img src={product.Image} alt={`Product Image: ${product.Brand}`} />
                        <div className="product-info">
                            <h2>{product.Brand}</h2>
                            <p>{product["Product Type"]}</p>
                            <p>Price: ${product.Price}</p>
                            <p>Rating: {product.Rating}</p>
                            <button 
                                className="add-to-cart-button"
                                onClick={() => handleAddToCart(product._id, product.Brand, product.Image, product["Product Type"], product.Price)}
                            >
                                Add to Cart
                            </button>
                            <br />
                            <br />
                            <button 
                                className="charity-button"
                                onClick={() => handleCharity()}
                            >
                                Charity
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
