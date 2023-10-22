import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import eleverData from './profiles'; // Importer JSON-dataen

export default function Profile() {
  const navigate = useNavigate();
  const profileParams = useParams();

  // Finn den valgte elev basert på URL-parameteren
  const valgtElev = eleverData.elever.find(elev => elev.navn.toLowerCase() === profileParams.profile);

  if (valgtElev) {
    return (
      <>
        <div className='profile-container'>
          <div className='profile-box'>
          <h1>Dette er profilen til {valgtElev.navn}</h1>
            <p>Alder: {valgtElev.alder}</p>
            <p>Email: {valgtElev.email}</p>
            <p>Telefon: {valgtElev.Tlf}</p>
            <img src={valgtElev.image} alt={valgtElev.navn} />
            <br></br>
            <button class="button" onClick={() => navigate(-1)}>Tilbake til hovedmeny</button>
          </div>
        </div>
      </>
    );
  } else {
    // Håndter tilfelle hvor den valgte eleven ikke ble funnet
    return (
      <div>
        <p>Eleven ble ikke funnet.</p>
        <button class="button" onClick={() => navigate(-1)}>Tilbake til hovedmeny</button>
      </div>
    );
  }
}
