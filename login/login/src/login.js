// login.js
import React, { useState } from "react";
import './App.css';

export default function Login() {

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitted');
  }

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <div className="additional-options">
          <div className="remember-me">
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>

        <button type="submit">Log in</button>

        <div className="register-link">
          Don't have an account? <a href="#">Register</a>
        </div>
      </form>
    </div>
  );
}
