import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css/Cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [showPlaceOrder, setShowPlaceOrder] = useState(false);
    const [address, setAddress] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [error, setError] = useState(null); // Add state for error messages
    const navigate = useNavigate(); // Use the useNavigate hook

    useEffect(() => {
        fetch('http://localhost:7000/api/cart', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
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
        .catch(err => {
            console.error('Error fetching cart:', err);
            setError('Failed to load cart. Please try again later.');
        });
    }, []); // No dependencies needed for this effect

    const handleRemove = (productId) => {
        fetch('http://localhost:7000/api/cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ productId })
        })
        .then(res => res.json())
        .then(data => {
            if (data.products) {
                setCart(prevCart => prevCart.filter(item => item.productId && item.productId._id !== productId));
            }
        })
        .catch(err => {
            console.error('Error removing item:', err);
            setError('Failed to remove item. Please try again later.');
        });
    };
    

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            if (item.productId) {
                return total + (parseFloat(item.productId.Price) * item.quantity);
            }
            return total;
        }, 0).toFixed(2);
    };

    const handleProceedToPay = () => {
        setShowPayment(true);
    };

    const handlePaymentSelection = () => {
        setShowPlaceOrder(true);
    };

    const handlePlaceOrder = () => {
        if (!address) {
            alert('Please enter your address to place the order.');
            return;
        }
    
        console.log('Cart data being sent:', cart);
    
        fetch('http://localhost:7000/api/placeorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ cart, address, paymentMethod: 'Cash on Delivery' })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }
            return res.json();
        })
        .then(data => {
            if (data.success) {
                setOrderPlaced(true);
                navigate('/profile', { state: { order: data.order } });
            } else {
                setError(data.error || 'Failed to place order. Please try again later.');
            }
        })
        .catch(err => {
            console.error('Error placing order:', err);
            setError('Failed to place order. Please try again later.');
        });
    };
    

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {error && <p className="error-message">{error}</p>}
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
                {!showPayment && !showPlaceOrder && (
                    <button className="pay-button" onClick={handleProceedToPay}>Proceed to Pay</button>
                )}
                {showPayment && !showPlaceOrder && (
                    <div className="payment-option">
                        <h4>Select Payment Option</h4>
                        <input
                            type="radio"
                            id="cod"
                            name="paymentMethod"
                            value="Cash on Delivery"
                            onChange={handlePaymentSelection}
                        />
                        <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                )}
                {showPlaceOrder && (
                    <div className="address-section">
                        <h4>Enter Delivery Address</h4>
                        <textarea
                            placeholder="Enter your address here"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                        <button className="place-order-button" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                )}
            </div>
            {orderPlaced && (
                <div className="order-success">
                    <h3>Order placed successfully!</h3>
                    <p>Your order will be delivered to: {address}</p>
                </div>
            )}
        </div>
    );
};

export default Cart;
