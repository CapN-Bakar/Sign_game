import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./ClickingSigns.css";
import { TweetBtn } from "./TweetBtn";
import { calculateStreakBonus } from "../StreakBonus";
import StreakIndicator from "./StreakIndicator";
import "./Credits.css";
import CryptoTrivia from "./CryptoTrivia";
import CryptoQuiz from "./CryptoQuiz"; // 💡 New import
import SignPriceTicker from "./SignPriceTicker";
import SignTwitterFeed from "./SignTwitterFeed";

export default function ClickingSigns() {
  const [score, setScore] = useState(0);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedTime, setSelectedTime] = useState(30);
  const [size, setSize] = useState(80);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(0);

  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 || lives === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted, lives]);

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

  const handleClick = (event) => {
    event.stopPropagation();
    if (gameStarted && !gameOver) {
      const bonus = calculateStreakBonus(streak);
      setScore((prev) => prev + 1 + bonus);
      setStreak((prev) => prev + 1);
      setSize(Math.random() * 100 + 20);
    }
  };

  const handleMissClick = (event) => {
    const gameArea = document.querySelector(".game-area");
    const sign = document.querySelector(".sign");
    if (
      gameStarted &&
      !gameOver &&
      gameArea.contains(event.target) &&
      event.target !== sign
    ) {
      setStreak(0);
      setLives((prevLives) => (prevLives > 1 ? prevLives - 1 : 0));
      if (lives === 1) {
        setGameOver(true);
      }
    }
  };

  const startGame = () => {
    setTimeLeft(selectedTime);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setSize(80);
    setLives(5);
    setQuizCompleted(false);
  };

  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setTimeLeft(selectedTime);
    setSize(80);
    setLives(5);
    setStreak(0);
    setShowQuiz(false);
    setQuizCompleted(false);
  };

  const handleQuizCompletion = (isCorrect) => {
    setShowQuiz(false);
    setQuizCompleted(true);
    if (isCorrect) {
      setScore((prev) => prev + 10); // Bonus points
    }
  };

  return (
    <div className="container">
      {!gameStarted ? (
        <>
          <SignPriceTicker />
          <SignTwitterFeed />
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
            <button className="start-btn" onClick={startGame}>
              Start Game
            </button>
            <a href="https://x.com/rzzz48" className="credits">
              Made by: <span>@RZZZ48</span>
            </a>
          </div>
        </>
      ) : (
        <>
          <h1 className="score">Score: {score}</h1>
          <h2 className="time-left">Time Left: {timeLeft}s</h2>
          <h2 className="lives">Lives: {"❤️".repeat(lives)}</h2>
          <div className="streak-container">
            <StreakIndicator streak={streak} />
          </div>

          <div>
            <CryptoTrivia />
          </div>

          {gameOver ? (
            <div className="game-over">
              <h2>Game Over! Signs clicked: {score}</h2>
              <button onClick={restartGame}>Restart Game</button>
              <button
                className="tweet-sign-btn"
                onClick={() => TweetBtn(score)}
              >
                Tweet Sign
              </button>

              {!quizCompleted && !showQuiz && (
                <button className="quiz-btn" onClick={() => setShowQuiz(true)}>
                  Take quiz for extra points
                </button>
              )}

              {showQuiz && <CryptoQuiz onComplete={handleQuizCompletion} />}
            </div>
          ) : (
            <div className="game-area" onClick={handleMissClick}>
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
            </div>
          )}
        </>
      )}
    </div>
  );
}
