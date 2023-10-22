import "./App.css";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

let animationInstance = null;

export default function App() {
  const makeShot = (particleRatio, opts) => {
    animationInstance &&
      animationInstance({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio)
      });
  };
  const fire = () => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55
    });

    makeShot(0.2, {
      spread: 60
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  const getInstance = (instance) => {
    animationInstance = instance;
  };
    return (
      <div className="App">
      <h1> Oppgave 1 </h1>
          <button className="btn" onClick={() => fire()}>
           Click
          </button>
          <header className="App-header">
          <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
          </header>
        </div>
      );
}