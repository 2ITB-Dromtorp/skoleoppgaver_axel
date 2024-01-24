import React, { useState } from "react";
import axios from "axios";

export default function Delete() {
  const [elevID, setElevID] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .delete(`http://localhost:3500/delete/${elevID}`)
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>ElevID: </label>
        <input
          type="number"
          value={elevID}
          onChange={(e) => setElevID(e.target.value)}
          placeholder="Skriv inn ElevID"
        />
        <br />
        <input type="submit" value="Slett Elev" />
      </form>
      <p>{message}</p>
    </>
  );
}
