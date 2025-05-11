import React, { useEffect, useState } from "react";
import "./SignPriceTicker.css";
import { FiRefreshCw } from "react-icons/fi";

export default function SignPriceTicker() {
  const [price, setPrice] = useState(null);
  const [prevPrice, setPrevPrice] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPrice = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=sign-global&vs_currencies=usd"
      );
      const data = await response.json();
      const newPrice = data["sign-global"]?.usd;

      setPrevPrice(price); // save current price before updating
      setPrice(newPrice);
    } catch (error) {
      console.error("Failed to fetch $SIGN price:", error);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600); // brief animation
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 15000);
    return () => clearInterval(interval);
  }, []);

  const getTrend = () => {
    if (prevPrice === null || price === null) return null;
    if (price > prevPrice) return <span className="trend up">↑</span>;
    if (price < prevPrice) return <span className="trend down">↓</span>;
    return <span className="trend">→</span>;
  };

  return (
    <div className="sign-price-ticker">
      <span className="price-text">
        $SIGN Price:{" "}
        {price !== null ? (
          <>
            ${price.toFixed(4)} {getTrend()}
          </>
        ) : (
          "Loading..."
        )}
      </span>
      <button
        className={`refresh-button ${isRefreshing ? "spinning" : ""}`}
        onClick={fetchPrice}
        aria-label="Refresh Price"
      >
        <FiRefreshCw size={18} />
      </button>
    </div>
  );
}
