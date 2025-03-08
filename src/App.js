import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function ClickingSigns() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedTime, setSelectedTime] = useState(30);
  const [size, setSize] = useState(80); // ✅ New state for random size

  // Timer countdown
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted]);

  // Move the sign randomly every second
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setPosition({
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, timeLeft]);

  // Handle click: increase score & randomize size
  const handleClick = () => {
    if (gameStarted && !gameOver) {
      setScore((prev) => prev + 1);
      setSize(Math.random() * 100 + 20); // ✅ Random size between 50px and 100px
    }
  };

  const startGame = () => {
    setTimeLeft(selectedTime);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setSize(80); // Reset size
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setTimeLeft(selectedTime);
    setSize(80); // Reset size
  };

  return (
    <div className="container">
      {!gameStarted ? (
        <>
          <img src="/sign.png" alt="Game Logo" className="game-logo" />
          <h1>Clicking Signs</h1>
          <div className="game-setup">
            <label>Select Time: </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(Number(e.target.value))}
            >
              <option value={30}>30 seconds</option>
              <option value={60}>60 seconds</option>
            </select>
            <button onClick={startGame}>Start Game</button>
          </div>
        </>
      ) : (
        <>
          <h1 className="score">Score: {score}</h1>
          <h2 className="time-left">Time Left: {timeLeft}s</h2>
          {gameOver ? (
            <div className="game-over">
              <h2>Sign Over! Signs clicked: {score}</h2>
              <button onClick={restartGame}>Restart Game</button>
            </div>
          ) : (
            <motion.img
              src="/sign.png"
              alt="Click Target"
              className="sign"
              style={{
                top: position.top,
                left: position.left,
                width: `${size}px`,
                height: `${size}px`,
              }}
              onClick={handleClick}
              whileTap={{ scale: 0.9 }}
            />
          )}
        </>
      )}
    </div>
  );
}
