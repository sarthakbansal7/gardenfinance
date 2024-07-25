import React from 'react';
import SwapForm from './components/SwapForm';
import './styles/App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>BTC to WBTC Swap</h1>
      </header>
      <main>
        <SwapForm />
      </main>
    </div>
  );
};

export default App;
