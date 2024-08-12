import React, { useEffect, useState } from 'react';
import './css/Cart.css'; // Assuming you have a Cart.css for styling

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7000/api/cart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Corrected the Authorization header
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data && Array.isArray(data.products)) {
                setCart(data.products);
            } else {
                console.error('Unexpected data format:', data);
                setCart([]);
            }
        })
        .catch(err => console.error('Error fetching cart:', err));
    }, []);

    const handleRemove = (productId) => {
        fetch('http://localhost:7000/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Corrected the Authorization header
            },
            body: JSON.stringify({ productId })
        })
        .then(res => res.json())
        .then(data => {
            if (data.products) {
                setCart(prevCart => prevCart.filter(item => item.productId && item.productId._id !== productId));
            }
        })
        .catch(err => console.error('Error removing item:', err));
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            if (item.productId) {
                return total + (parseFloat(item.productId.Price) * item.quantity);
            }
            return total;
        }, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
                cart.map((item) => (
                    item.productId && (
                        <div className="cart-item" key={item.productId._id}>
                            <img src={item.productId.Image} alt={item.productId.Brand} />
                            <div className="item-details">
                                <h3>{item.productId.Brand}</h3>
                                <p>{item.productId["Product Type"]}</p>
                                <p>Price: ${item.productId.Price}</p>
                                <button onClick={() => handleRemove(item.productId._id)} className="remove-button">
                                    Remove from Cart
                                </button>
                            </div>
                        </div>
                    )
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div className="total-price">
                <h3>Total Price: ${calculateTotalPrice()}</h3>
                <button className="pay-button">Proceed to Pay</button>
            </div>
        </div>
    );
};

export default Cart;
