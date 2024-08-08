import React, { useState } from 'react';
import './css/register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        title: '',
        firstname: '',
        lastname: '',
        countryCode: '',
        phone: '',
        password: '',
        email: '',
        agreement: false,
        register: false,
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
      };
    
      return (
        <div className="containerRegister">
          <form className="formRegister" onSubmit={handleSubmit}>
            <h2>Create your personal account</h2>
            <p>
              You are about to create your account. This will allow us to offer you a personalized and tailored experience online, provide you with products, services and information you request from us, communicate with you, and give you access to exclusive services and benefits reserved for registered members to our customer database.
            </p>
            <label htmlFor="title"></label>
            <select id="titleRegister" name="title" value={formData.title} onChange={handleChange} required>
              <option disabled value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Not prefer to say">Not prefer to say</option>
            </select>
            <br /><br />
            <label htmlFor="firstname"></label>
            <input type="text" id="firstname" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
            <label htmlFor="lastname"></label>
            <input type="text" id="lastname" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
            <br /><br />
            <label htmlFor="mobile"></label>
            <select id="countryCode" name="countryCode" value={formData.countryCode} onChange={handleChange} required>
              <option disabled value="">Country Code</option>
              <option value="91">91</option>
              <option value="92">92</option>
              <option value="93">93</option>
              <option value="94">94</option>
              <option value="95">95</option>
              <option value="96">96</option>
              <option value="101">101</option>
              <option value="97">97</option>
              <option value="98">98</option>
              <option value="99">99</option>
              <option value="100">100</option>
              <option value="102">102</option>
            </select>
            <input type="tel" id="phone" name="phone" placeholder="phone:99876####" value={formData.phone} onChange={handleChange} required />
            <br /><br />
            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" placeholder="Password*" value={formData.password} onChange={handleChange} required />
            <br /><br />
            <label htmlFor="email"></label>
            <input type="email" id="emailRegister" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <br />
            <p>
              By clicking on 'Register', you confirm that you have read and understood our <u>Privacy Statement</u>, and you want to register and accept our terms and services.
            </p>
            <label htmlFor="Button"></label>
            <input type="submit" value="Register" id="ButtonRegister" />
          </form>
        </div>
      );
};


export default Register;