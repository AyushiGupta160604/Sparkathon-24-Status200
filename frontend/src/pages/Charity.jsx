import React, { useState, useEffect } from 'react';
import './css/Charity.css';


const Charity = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    donationType: '',
    comments: '',
    amount: '',
    paymentMethod: ''
  });

  useEffect(() => {
    if (!document.getElementById('razorpay-script')) {
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute('data-payment_button_id', 'pl_O1bWfWqEYMeKK7');
      script.id = 'razorpay-script';
      script.async = true;
      document.getElementById('razorpay-button-container').appendChild(script);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handlepay = () => {
    alert('Your act of kindness will help millions! Thanks for being a part of this')
  }

  return (
    <div className="donation-form-container">
      <h2 className="form-title" id="formDonation">Make a Donation</h2>
      <form onSubmit={handleSubmit} className="donation-form">
        <div className="form-group">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" id='headingCharity'>Donation Category</label>
          <div className="radio-group">
            <label>
              <input
                type="checkbox"
                name="donationType"
                value="Education"
                checked={formData.donationType === 'Education'}
                onChange={handleInputChange}
              />
              Education
            </label>
            <label>
              <input
                type="checkbox"
                name="donationType"
                value="Clothing"
                checked={formData.donationType === 'Clothing'}
                onChange={handleInputChange}
              />
              Clothing
            </label>
            <label>
              <input
                type="checkbox"
                name="donationType"
                value="Healthcare"
                checked={formData.donationType === 'Healthcare'}
                onChange={handleInputChange}
              />
              Healthcare
            </label>
            <label>
              <input
                type="checkbox"
                name="donationType"
                value="Others"
                checked={formData.donationType === 'Others'}
                onChange={handleInputChange}
              />
              Others
            </label>
          </div>
        </div>

        <div className="form-group" id='textB'>
          <textarea
            id="comments"
            name="comments"
            placeholder="Comments"
            rows="4"
            value={formData.comments}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" id='textB'>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Donation Amount (USD)"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="credit_card">Credit or Debit Card</option>
            <br />
            <br />
            <option value="paypal" >Paypal</option>
          </select>
        </div>

        <div className="form-group" id="razorpay-button-container"></div>


        <button type="submit" className="submit-btn" onClick={handlepay}>
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default Charity;
