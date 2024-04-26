// Register.js
import React, { useState } from 'react';

const Register = ({ onRegister }) => {
  const [brukernavn, setBrukernavn] = useState('');
  const [passord, setPassord] = useState('');
  const [admin, setAdmin] = useState(false);
  const [userid, setUserid] = useState('');

  const handleRegister = () => {
    // Perform registration logic
    onRegister(brukernavn, passord, admin, userid);
  };

  return (
    <div>
      <h2>Registrer</h2>
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
      <input
        type="checkbox"
        checked={admin}
        onChange={(e) => setAdmin(e.target.checked)}
      />
      <label>Admin</label>
      <input
        type="text"
        placeholder="User ID"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
