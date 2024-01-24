import axios from "axios";
import { useState } from "react";

export default function Insert() {
  const [newData, setNewData] = useState({
    Fornavn: "",
    Etternavn: "",
    DatamaskinID: "",
    Hobby: "",
    Klasse: "",
    Kjonn: ""
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3500/insert", newData)
      .then((response) => {
        setMessage(response.data);
        // Nullstill inputfeltene etter vellykket innsending
        setNewData({
          Fornavn: "",
          Etternavn: "",
          DatamaskinID: "",
          Hobby: "",
          Klasse: "",
          Kjonn: ""
        });
      })
      .catch((error) => {
        console.error("Feil ved innsetting av data:", error);
        setMessage("Feil ved innsetting av data.");
      });
  };

  return (
    <>
      <h2>Legg til ny elev</h2>
      <form onSubmit={handleSubmit}>
        <label>Fornavn:</label>
        <input
          type="text"
          name="Fornavn"
          value={newData.Fornavn}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Etternavn:</label>
        <input
          type="text"
          name="Etternavn"
          value={newData.Etternavn}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>DatamaskinID:</label>
        <input
          type="number"
          name="DatamaskinID"
          value={newData.DatamaskinID}
          onChange={handleInputChange}
          required
        />
        <br />
        <label>Hobby:</label>
        <input
          type="text"
          name="Hobby"
          value={newData.Hobby}
          onChange={handleInputChange}
        />
        <br />
        <label>Klasse:</label>
        <input
          type="number"
          name="Klasse"
          value={newData.Klasse}
          onChange={handleInputChange}
        />
        <br />
        <label>Kjonn:</label>
        <input
          type="text"
          name="Kjonn"
          value={newData.Kjonn}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Legg til elev</button>
      </form>
      <p>{message}</p>
    </>
  );
}
