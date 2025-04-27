import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState({ text: 'Loading...', author: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // The deployed backend URL
  const BACKEND_URL = 'https://vit10-django.onrender.com';

  const fetchRandomQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/quote`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setQuote(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to fetch quote. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a quote when the component mounts
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Quote Generator</h1>
        
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
            <button onClick={fetchRandomQuote}>Try Again</button>
          </div>
        ) : (
          <div className="quote-container">
            <blockquote>
              <p>"{quote.text}"</p>
              <footer>— {quote.author}</footer>
            </blockquote>
            <button onClick={fetchRandomQuote}>Get Another Quote</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
