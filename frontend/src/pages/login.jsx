import React, { useState } from 'react';
import './css/login.css'; // Ensure your CSS is imported here

const Login = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === '') {
      alert('Please fill out the email address.');
      return;
    }

    try {
      const response = await fetch(`/verify-email?email=${email}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { redirectTo } = await response.json();
      window.location.href = redirectTo;
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div className="container">
      <form id="loginpage" onSubmit={handleSubmit}>
        <h3 id="emailHeading">Enter your email</h3>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="Email"
          placeholder="Email address"
          value={email}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="submit"
          id="nextButton"
          value="NEXT"
          style={{ backgroundColor: 'black', color: 'white' }}
        />
      </form>
    </div>
  );
};

export default Login;

export default Login;
