import React, { useState } from 'react';
import './App.css';
import Elev from './Elev';

export default function Home() {
    const initialElever = [
        "Andreas", "Ahmad", "Philip", "Gabriel", "Theodor",
        "Mattis", "Alva", "Silas", "Axel", "Vetle",
        "Kristoffer", "Johannes", "Elias", "Matheo"
    ];
    const [elever, setElever] = useState(initialElever);

    const randomize = () => {
        setElever(elever.sort(() => Math.random() - 0.5));
    }

    return (
        <div className="container">
            <button onClick={randomize}>Randomiser plassering</button>
            <div className='leftside'>
                <div className='box'>
                    <div className='sitteplasser'>
                        {elever.slice(0, 2).map(elev => <Elev name={elev} />)}
                    </div>
                    <div className='sitteplasser'>
                        {elever.slice(2, 3).map(elev => <Elev name={elev} />)}
                    </div>
                    <div className='sitteplasser'>
                        {elever.slice(3, 5).map(elev => <Elev name={elev} />)}
                    </div>
                </div>
            </div>
            <div className='rightside'>
                <div className='box'>
                    <div className='sitteplasser'>
                        {elever.slice(5, 8).map(elev => <Elev name={elev} />)}
                    </div>
                    <div className='sitteplasser'>
                        {elever.slice(8, 11).map(elev => <Elev name={elev} />)}
                    </div>
                    <div className='sitteplasser'>
                        {elever.slice(11).map(elev => <Elev name={elev} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
