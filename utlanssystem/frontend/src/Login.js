// Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

const Login = ({ onLogin }) => {
  const [brukernavn, setBrukernavn] = useState('');
  const [passord, setPassord] = useState('');

  const handleLogin = () => {
    onLogin(brukernavn, passord);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Brukernavn"
        value={brukernavn}
        onChange={(e) => setBrukernavn(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passord"
        value={passord}
        onChange={(e) => setPassord(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/register">Register</Link> {/* Link to the register page */}
      </p>
    </div>
  );
};

export default Login;
