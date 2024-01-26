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
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
