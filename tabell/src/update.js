import React, { useState } from "react";
import axios from "axios";

export default function Update() {
  const [newHobby, setNewHobby] = useState("");
  const [elevID, setElevID] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`http://localhost:3500/updateuser/${newHobby}/${elevID}`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Ny hobby: </label>
        <input
          type="text"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
          placeholder="Skriv inn ny hobby"
        />
        <br />
        <label>ElevID: </label>
        <input
          type="number"
          value={elevID}
          onChange={(e) => setElevID(e.target.value)}
          placeholder="Skriv inn ElevID"
        />
        <br />
        <input type="submit" value="Oppdater Hobby" />
      </form>
      <p>{message}</p>
    </>
  );
}
