import React, { useState, useEffect } from 'react';

const Equipment = ({ fullName, userID }) => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      const response = await fetch('http://192.168.0.3:3500/equipment');
      const data = await response.json();
      setEquipment(data);
    };
    fetchEquipment();
  }, []);

  const handleBorrow = async (utstyrsID) => {
    try {
      const response = await fetch('http://192.168.0.3:3500/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ elevID: userID, utstyrsID })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Item borrowed successfully!');
      } else {
        alert('Failed to borrow item: ' + data.error);
      }
    } catch (error) {
      alert('Failed to borrow item: ' + error.message);
    }
  };

  return (
    <div className="equipment-container">
      <h2>Equipment List</h2>
      <h3>Welcome, {fullName}</h3>
      {equipment.map((eq, index) => (
        <div key={index} className="equipment-item">
          #{eq.utstyrsID} - {eq.Kategori} - {eq.Modell} - {eq.Pris}kr
          <button onClick={() => handleBorrow(eq.utstyrsID)}>Borrow</button>
        </div>
      ))}
    </div>
  );
};

export default Equipment;
