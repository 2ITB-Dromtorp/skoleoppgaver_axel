// App.js
import './App.css';
import Quiz from './quiz';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/" component={Quiz} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
