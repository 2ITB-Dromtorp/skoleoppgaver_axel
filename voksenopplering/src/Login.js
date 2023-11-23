// Login.js

import React, { useState } from 'react';
import { useUser } from './UserContext';

const Login = ({ onClose }) => {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    // For simplicity, just call the login function with some user data
    login({ username });
    onClose(); // Close the login popup after successful login
  };

  return (
    <div className="login-prompt">
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="header-button login-button" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
};

export default Login;
