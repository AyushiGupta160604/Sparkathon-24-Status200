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
      const response = await fetch('http://localhost:7000/api/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(email),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Login Successful:', data);
          window.location.href = '/profile';
          // You can redirect the user or show a success message here
      } else {
          console.error('Login Failed');
          // Handle the error response here
      }
  } catch (error) {
      console.error('Error:', error);
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
          name="email"
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


