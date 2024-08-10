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
            body: JSON.stringify({ email: email }), // Sending email as an object
        });

        if (response.ok) {
            const data = await response.json();

            if (data.redirectTo === '/profile') {
                // Redirect to profile page if user is registered
                window.location.href = '/profile';
            } else if (data.redirectTo === '/register') {
                // Redirect to register page if user is not registered
                window.location.href = '/register';
            } else {
                console.error('Unexpected redirect URL:', data.redirectTo);
            }
        } else {
            console.error('Login Failed');
            // Handle error response here, like showing an error message
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


