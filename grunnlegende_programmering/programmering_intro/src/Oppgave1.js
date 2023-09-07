import './App.css';

function A() {
    return (
        <div className='oppgaveBox'>
            <h2> Deloppgave 1 a) </h2>
            <p> Spørsmål: Hva skriver du i javascript dersom du vil gi variabelen test verdien 8? 
                Hvilken datatype er dette?</p>
            <p> Svar:
                let test = 8;
                Dette har datatype "number"
            </p>
        </div>
    );
}

function B() {
    return (
        <div className='oppgaveBox'>
            <h2> Deloppgave 1 b) </h2>
            <p> Spørsmål: Hva skriver du dersom du vil gi variabelen "test" verdien "testverdi"? Hvilken datatype er dette?</p>
            <p> Svar:
                var test = "testverdi";

                Dette har datatype "string"
            </p>
            
        </div>
    );
}

function C() {
    return (
        <div className='oppgaveBox'>
            <h2> Deloppgave 1 c) </h2>
            <p> Spørsmål: Hva skriver du derson du vil regne ut 2*3 og sette resultatet inn i variabelen "produkt"</p>
            <p> Svar: 
            var produkt = 2 * 3;
            </p>
            
        </div>
    );
}

function D() {
    return (
        <div className='oppgaveBox'>
            <h2> Deloppgave 1 d) </h2>
            <p> Spørsmål: Hva skriver du derson du vil regne ut verdien av brøken 2/3 og sette resoltatet inn i variabelen broek</p>
            <p> Svar:
            var broek = 2 / 3;
            </p>
            
        </div>
    );
}

function E() {
    var test1 = 8;
    var test = "testverdi";
    var produkt = 2 * 3;
    var broek = 2 / 3;
    return (
        <div className='oppgaveBox'>
            <h2> Deloppgave 1 e) </h2>
            <p> hhh</p>
            <p> A: {test1}</p>
            <p> B: {test}</p>
            <p> C: {produkt}</p>
            <p> D: {broek}</p>
        </div>
    );
}

export default function Oppgave1() {
    return (
        <div className="App">
          <h1> Oppgave 1 </h1>
          <header className="App-header">
            <A />
            <B />
            <C />
            <D />
            <E />
          </header>
        </div>
      );
}