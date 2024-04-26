// Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [brukernavn, setBrukernavn] = useState('');
  const [passord, setPassord] = useState('');

  const handleLogin = () => {
    // Perform login logic
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
    </div>
  );
};

export default Login;