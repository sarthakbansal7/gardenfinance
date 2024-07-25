import React, { useState } from 'react';

const SwapForm = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3001/swap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ privateKey, sendAmount: parseFloat(sendAmount) * 1e8 }),
    });

    const data = await res.json();
    setResponse(data.message || data.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Private Key:</label>
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Send Amount (BTC):</label>
        <input
          type="number"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Swap</button>
      {response && <p>{response}</p>}
    </form>
  );
};

export default SwapForm;
