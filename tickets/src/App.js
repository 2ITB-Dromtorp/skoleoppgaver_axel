import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Home = ({ tickets, closeTicket, deleteTicket }) => (
  <div className="main-content">
    <div className="box-container">
      {tickets.map((ticket, index) => (
        <div className="box" key={index}>
          <h2>{ticket.title}</h2>
          <p>E-post: {ticket.email}</p>
          <p>Telefon: {ticket.phone}</p>
          <p>Beskrivelse: {ticket.description}</p>
          <p>Status: {ticket.status}</p>
          {ticket.status !== 'Stengt' && (
            <>
              <button className="close-button" onClick={() => closeTicket(index)}>
                Lukk Ticket
              </button>
            </>
          )}
          <button className="delete-button" onClick={() => deleteTicket(index)}>
            Slett Ticket
          </button>
        </div>
      ))}
    </div>
  </div>
);

const LagTicket = ({ addTicket }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+'); // Start med '+'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Normal'); // Standard status er 'Normal'

  const handleSubmit = () => {
    // Sjekk om noen påkrevde felt mangler
    if (!email || !phone || !title || !description) {
      // Vis en nettleser popup (alert) med en melding på norsk
      alert('Vennligst fyll ut alle påkrevde felt.');
      return;
    }

    // Opprett et nytt ticket-objekt
    const newTicket = {
      email,
      phone,
      title,
      description,
      status,
    };

    // Legg til det nye ticketet i tilstanden
    addTicket(newTicket);

    // Tøm skjemafeltene
    setEmail('');
    setPhone('+'); // Tilbakestill telefon til å starte med '+'
    setTitle('');
    setDescription('');
    setStatus('Normal'); // Tilbakestill status til 'Normal'

    // Vis en suksess-popupmelding på norsk
    alert('Ticket opprettet vellykket.');
  };

  return (
    <div className="form-container">
      <h1>Lag Ticket</h1>
      <label className="input-label">
        E-post:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
      </label>
      <br />
      <label className="input-label">
        Telefon:
        <input
          type="text"
          value={phone}
          onChange={(e) => {
            let sanitizedValue = e.target.value;

            // Forsikre deg om at det starter med '+' og inneholder bare ett '+'
            if (!sanitizedValue.startsWith("+")) {
              sanitizedValue = "+" + sanitizedValue;
            }

            if ((sanitizedValue.match(/\+/g) || []).length > 1) {
              sanitizedValue = "+" + sanitizedValue.replace(/\+/g, '');
            }

            sanitizedValue = sanitizedValue.replace(/[^0-9\s+]/g, ''); // Tillat bare tall, mellomrom og ett '+'

            // Fjern ekstra mellomrom
            sanitizedValue = sanitizedValue.replace(/\s+/g, ' ');

            setPhone(sanitizedValue);
          }}
          className="input-field"
        />
      </label>
      <br />
      <label className="input-label">
        Tittel:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" />
      </label>
      <br />
      <label className="input-label">
        Beskrivelse:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field description-field"
        />
      </label>
      <br />
      <label className="input-label">
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input-field">
          <option value="Normal">Normal</option>
          <option value="Haster">Haster</option>
          <option value="Ekstra Haster">Ekstra Haster</option>
        </select>
      </label>
      <br />
      <div className="center-button">
        <button type="button" onClick={handleSubmit} className="create-ticket-button">
          Opprett Ticket
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [tickets, setTickets] = useState(() => {
    const storedTickets = localStorage.getItem('tickets');
    return storedTickets ? JSON.parse(storedTickets) : [];
  });

  useEffect(() => {
    // Save tickets to localStorage whenever it changes
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Funksjon for å legge til et nytt ticket i tilstanden
  const addTicket = (ticket) => {
    const updatedTickets = [...tickets, ticket];
    setTickets(updatedTickets);
  };

  // Funksjon for å lukke et ticket
  const closeTicket = (index) => {
    const updatedTickets = [...tickets];
    updatedTickets[index].status = 'Stengt';
    setTickets(updatedTickets);
  };

  // Funksjon for å slette et ticket
  const deleteTicket = (index) => {
    const updatedTickets = [...tickets];
    updatedTickets.splice(index, 1);
    setTickets(updatedTickets);
  };
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-left">
            <Link to="/" className="header-link">
              VTH
            </Link>
          </div>
          <div className="header-right">
            <Link to="/lag-ticket" className="header-button">
              Lag Ticket
            </Link>
          </div>
        </header>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>

        <Routes>
          <Route
            path="/"
            element={<Home tickets={tickets} closeTicket={closeTicket} deleteTicket={deleteTicket} />}
          />
          <Route
            path="/lag-ticket"
            element={<LagTicket addTicket={addTicket} />}
          />
        </Routes>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <footer className="App-footer">
          <div className="footer-content">
            <div>
              <p>E-post: hello@vitrengerhjelp.no</p>
              <p>Telefon: +47 92468545 / 41106421</p>
            </div>
            <div>
              <p>Mosesvei 34</p>
              <p>1448 Drøbak</p>
              <p>Norway</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
