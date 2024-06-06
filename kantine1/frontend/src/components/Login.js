//components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({
    epost: '',
    passord: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/login', credentials, { withCredentials: true });
      alert(response.data.message);
      navigate('/admin'); // Redirect to the admin page after successful login
    } catch (error) {
      alert('Login failed: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="epost" value={credentials.epost} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="passord" value={credentials.passord} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
