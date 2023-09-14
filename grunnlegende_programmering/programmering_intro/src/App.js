import logo from './logo.svg';
import './App.css';
import Piler from './Piler';
import Klokke from './Klokke';
import Oppgave4 from './Oppgave4';
import Oppgave3 from './Oppgave3';
import Oppgave2 from './Oppgave2';
import Oppgave1 from './Oppgave1';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Oppgave1 />
        <Oppgave2 />
        <Oppgave3 />
        <Oppgave4 />
        <Klokke />
        <Piler />
      </header>
    </div>
  );
}

export default App;