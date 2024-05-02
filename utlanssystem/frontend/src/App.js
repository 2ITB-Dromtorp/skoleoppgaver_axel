import './App.css';
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Equipment from './Equipment';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userID, setUserID] = useState('');

  const handleLogin = async (brukernavn, passord) => {
    try {
      const response = await fetch('http://192.168.0.3:3500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brukernavn: brukernavn,
          passord: passord
        })
      });
      const data = await response.json();
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
        setFullName(data.fullName);
        setUserID(data.userid); // Assuming the backend sends userID on login
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Router>
      <div>
        <h1>Viken utlån</h1>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate replace to="/equipment" />} />
          <Route path="/register" element={!isLoggedIn ? <Register onRegister={handleLogin} /> : <Navigate replace to="/equipment" />} />
          <Route path="/equipment" element={isLoggedIn ? <Equipment fullName={fullName} userID={userID} /> : <Navigate replace to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
