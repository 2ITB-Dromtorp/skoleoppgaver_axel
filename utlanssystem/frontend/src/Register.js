// Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [brukernavn, setBrukernavn] = useState('');
  const [passord, setPassord] = useState('');
  const [userid, setUserid] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.0.3:3500/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brukernavn: brukernavn,
          passord: passord,
          userid: userid
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful!");
        onRegister(brukernavn, passord); // Logs in the user after successful registration
        navigate('/equipment'); // Redirects to equipment page after login
      } else {
        alert("Registration failed: " + data.error); // Shows detailed error from the backend
      }
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        type="text"
        placeholder="User ID"
        value={userid}
        onChange={(e) => setUserid(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
