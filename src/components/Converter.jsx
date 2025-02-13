import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [history, setHistory] = useState([]);

  // Fetch conversion history from backend
  useEffect(() => {
    axios.get("http://localhost:5001/api/history")
      .then(response => setHistory(response.data))
      .catch(error => console.error("Error fetching history:", error));
  }, []);

  const handleConvert = async () => {
    // Show a pop-up when the button is clicked
    alert("Currency converted! Waiting on microservice...");

    
    try {
      // Fetch exchange rate from your teammate's service
      const rateRes = await axios.get(`http://YOUR_TEAMMATE'S_BACKEND_URL/api/exchange-rate/${fromCurrency}`);
      const rate = rateRes.data.rates[toCurrency];

      // Send to Formatting Service
      const formatRes = await axios.post(`http://localhost:5001/api/format`, { 
        amount: parseFloat(amount), 
        rate, 
        targetCurrency: toCurrency 
      });

      setConvertedAmount(formatRes.data.formatted);

      // Save to History Service
      const historyRes = await axios.post(`http://localhost:5001/api/history`, {
        amount,
        from: fromCurrency,
        to: toCurrency,
        result: formatRes.data.formatted
      });

      setHistory([...history, historyRes.data.conversion]);

    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Enter amount" 
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <button onClick={handleConvert}>Convert</button>
      {convertedAmount && <h2>Converted: {convertedAmount}</h2>}

      <h2>Conversion History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry.amount} {entry.from} → {entry.result}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
