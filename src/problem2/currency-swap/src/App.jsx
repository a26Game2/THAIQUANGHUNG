import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Holds the array of tokens, each with "currency" and "price"
  const [tokens, setTokens] = useState([]);

  // Form state
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  // Loading simulation (e.g. interacting with a backend)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('https://interview.switcheo.com/prices.json')
      .then((res) => res.json())
      .then((data) => {
        // 'data' is an array of objects like { currency: "SWTH", price: 0.0025 }
        setTokens(data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic checks
    if (!fromToken || !toToken || !amount) {
      alert('Please fill in all required fields');
      return;
    }

    const fromObj = tokens.find(t => t.currency === fromToken);
    const toObj = tokens.find(t => t.currency === toToken);

    if (!fromObj || !toObj) {
      alert('Invalid tokens (not found in the list).');
      return;
    }

    // Begin loading simulation
    setIsLoading(true);

    // Simulate a 2-second server request
    setTimeout(() => {
      const swapRate = fromObj.price / toObj.price;
      const swapResult = swapRate * parseFloat(amount);

      setResult(swapResult);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h2>Swap Currency</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>From:</label>
            <div className="token-select">
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
              >
                <option value="">--Select Token--</option>
                {tokens.map((item) => (
                  <option key={item.currency} value={item.currency}>
                    {item.currency}
                  </option>
                ))}
              </select>

              {fromToken && (
                <img
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${fromToken}.svg`}
                  alt={fromToken}
                  className="token-icon"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/20';
                  }}
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>To:</label>
            <div className="token-select">
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
              >
                <option value="">--Select Token--</option>
                {tokens.map((item) => (
                  <option key={item.currency} value={item.currency}>
                    {item.currency}
                  </option>
                ))}
              </select>

              {toToken && (
                <img
                  src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${toToken}.svg`}
                  alt={toToken}
                  className="token-icon"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/20';
                  }}
                />
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Amount (in {fromToken || '...'}):</label>
            <input
              type="number"
              placeholder="Enter swap amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Swap'}
          </button>
        </form>

        {result !== null && !isLoading && (
          <div className="swap-result">
            <h3>Swap Result:</h3>
            <p>
              {amount} {fromToken} = {result.toFixed(6)} {toToken}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
