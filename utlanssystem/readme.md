# Viken Utlån System

## Prosjektoversikt

Dette prosjektet inneholder en implementasjon av et utlånssystem for Viken skole. Systemet lar brukere logge inn, se tilgjengelig utstyr, og låne utstyr. Frontenden er utviklet i React.js, og backenden bruker Node.js med Express. Data lagres i en MySQL-database.

## Teknologi Stack

- **Frontend**: React.js
- **Backend**: Node.js med Express
- **Database**: MySQL
- **Autentisering**: Bcrypt for passordhashing

## Kjøre Prosjektet Lokalt

### Forutsetninger

- Node.js installert
- MySQL-database kjører

### Backend Oppsett

1. Naviger til backend-mappen:
   ```bash
   cd backend
2. Installer nødvendige pakker:
npm install

3. Sørg for at serveren er konfigurert til å lytte på nettverkets IP-adresse (192.168.0.3) for å tillate tilkoblinger fra frontend maskinen. Endre lytteradressen i koden hvis nødvendig. For eksempel, hvis du bruker Express:

``` js
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

## Frontend oppsett
1. Naviger til frontend-mappen:
```bash
cd frontend
```
2. Installer nødvendige pakker
```bash
npm install
```
3. Oppdater API-endepunkter i frontend koden til å peke på backend-serverens IP-adresse (192.168.0.3). For eksempel:
```js
fetch('http://192.168.0.3:3500/equipment')
```
4. Start React-applikasjonen:
```bash
npm start
```

## Database Setup
Konfigurer din lokale MySQL-database i henhold til backendens database-tilkoblingsfiler. Bruk localhost som host i dine database tilkoblingsinstillinger siden databasen kjører på samme maskin som backend.

## Videreutvikling og Feilretting
- Feilretting i utlånssystemet: Systemet har et uferdig utlånssystem som krever videre feilsøking og utvikling for å håndtere utlån av utstyr korrekt.
- Forbedre brukergrensesnittet: Utvikle et mer intuitivt og brukervennlig grensesnitt for brukerinteraksjoner, spesielt for utlånsfunksjonene.
- Implementere robust autentisering: Vurdere å innføre JSON Web Tokens (JWT) for bedre sesjonshåndtering og autentisering.

Dette dokumentet gir en innføring i systemets funksjonalitet og instruksjoner for hvordan man kan sette opp og kjøre systemet lokalt, samt peker på områder hvor systemet trenger videreutvikling.

