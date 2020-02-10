import React from 'react';
import logo from './logo.svg';
import './App.css';
import Forecast from "./components/Forecast/Forecast";
import Logo from './components/Logo/Logo';

function App() {
  return (
    <div className="App">
    <header className="App-header">
    <Logo />
      <h1>React Weather App</h1>
    </header>
    <main>
      <Forecast />
    </main>
    <footer>
      Page created by Sunil
    </footer>
  </div>
  );
}

export default App;
