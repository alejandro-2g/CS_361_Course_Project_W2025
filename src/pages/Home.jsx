import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [exchangeRates, setExchangeRates] = useState({});
    const baseCurrency = "USD"; // Change if needed

    useEffect(() => {
        // Fetch live exchange rates
        axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
            .then(response => setExchangeRates(response.data.rates))
            .catch(error => console.error("Error fetching exchange rates:", error));
    }, []);

    return (
        <div className="home-container">
            <h1>Live Exchange Rates</h1>
            <p>Base Currency: <strong>{baseCurrency}</strong></p>
            
            <div className="exchange-rates">
                {exchangeRates["EUR"] && <p>EUR: {exchangeRates["EUR"]}</p>}
                {exchangeRates["GBP"] && <p>GBP: {exchangeRates["GBP"]}</p>}
                {exchangeRates["JPY"] && <p>JPY: {exchangeRates["JPY"]}</p>}
                {exchangeRates["CAD"] && <p>CAD: {exchangeRates["CAD"]}</p>}
                {exchangeRates["AUD"] && <p>AUD: {exchangeRates["AUD"]}</p>}
            </div>

            <Link to="/convert">
                <button className="convert-btn">Go to Converter</button>
            </Link>
        </div>
    );
};

export default Home;
