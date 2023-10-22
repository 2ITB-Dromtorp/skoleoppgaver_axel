import { useState } from 'react';

export default function DigitalClock() {

        let clock = new Date();
        let hh = clock.getHours();
        let mm = clock.getMinutes();
        let ss = clock.getSeconds();

        const [currentTime, newTime] = useState(new Date);

        console.log(hh, mm, ss);

        setInterval(() => {
            newTime(new Date);
        }, 1000);
    

    return (
        <div className="App">
          <header className="App-header">
            
            <h1>{console.log} </h1>
    
          </header>
        </div>
      );
}

