// App.js
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';

function App() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3500');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogin = async (brukernavn, passord) => {
    try {
      const response = await fetch('http://localhost:3500/login', {
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
      console.log(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = async (brukernavn, passord, admin, userid) => {
    try {
      const response = await fetch('http://localhost:3500/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brukernavn: brukernavn,
          passord: passord,
          admin: admin,
          userid: userid
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <h1>Data from MySQL Database</h1>
      <ul>
        {data.length > 0 && data.map((item, index) => (
          <li key={index}>{item.Fornavn} - {item.Etternavn}</li>
        ))}
      </ul>

      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {!isLoggedIn && <Register onRegister={handleRegister} />}
    </div>
  );
}

export default App;
