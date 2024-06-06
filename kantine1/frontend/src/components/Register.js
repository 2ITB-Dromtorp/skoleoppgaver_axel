//components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    fulltNavn: '',
    epost: '',
    passord: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/register', formData, { withCredentials: true });
      alert(response.data.message);
      navigate('/Login'); // Redirect to admin after successful registration
    } catch (error) {
      alert('Failed to register: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fulltNavn" value={formData.fulltNavn} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="epost" value={formData.epost} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="passord" value={formData.passord} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
