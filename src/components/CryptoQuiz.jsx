import React, { useState, useEffect } from "react";
import "./CryptoQuiz.css"; // Make sure your CSS file is linked
import cryptoQuizQuestions from "./CryptoQuizQuestions"; // Ensure this path is correct

// Assuming you have heart icons or similar, otherwise use text
const LIVE_ICON = "❤️"; // Or "💚", "⭐", etc.
const MAX_LIVES = 3;

export default function CryptoQuiz({ onComplete }) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [lives, setLives] = useState(MAX_LIVES);
  const [isAnswered, setIsAnswered] = useState(false); // Prevent multiple clicks

  useEffect(() => {
    //reset state when componemt mounts
    setLives(MAX_LIVES);
    setSelected(null);
    setFeedback("");
    setIsAnswered(false);

    const availableQuestions = cryptoQuizQuestions.filter(
      (q) => q !== question
    ); // Avoid repeating immediately
    const pool =
      availableQuestions.length > 0 ? availableQuestions : cryptoQuizQuestions;
    const randomIndex = Math.floor(Math.random() * pool.length);
    setQuestion(pool[randomIndex]);
  }, []); // Runs only on mount

  const handleAnswer = (choice) => {
    // Prevent handling another answer while feedback is shown or if out of lives
    if (isAnswered || lives <= 0) return;

    setSelected(choice);
    setIsAnswered(true); // Mark as answered to prevent further clicks temporarily

    const isCorrect = choice === question.answer;

    if (isCorrect) {
      setFeedback("Correct! 🎉");
      // Wait, then notify parent of success
      setTimeout(() => {
        onComplete(true); // Pass true for correct answer point
      }, 1500); // Slightly shorter delay maybe?
    } else {
      // Incorrect Answer
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        // Out of lives
        setFeedback("Incorrect! Out of lives... 💔");
        // Wait slightly to show feedback, then notify parent of failure (no points)
        setTimeout(() => {
          onComplete(false); // Pass false for no points
        }, 1500);
      } else {
        // Incorrect, but lives remain
        setFeedback(
          `Oops! That's not it. ${newLives} ${
            newLives === 1 ? "life" : "lives"
          } left.`
        );
        // Re-enable answering after showing feedback
        setTimeout(() => {
          setSelected(null); // Clear selection
          setFeedback(""); // Clear feedback
          setIsAnswered(false); // Allow next attempt on the *same* question
          // Note: This design keeps the same question until answered correctly or lives run out.
          // If you want a new question after every wrong answer, you'd need different logic.
        }, 1500);
      }
    }
  };

  // Helper to display lives icons
  const renderLives = () => {
    let lifeIcons = [];
    for (let i = 0; i < MAX_LIVES; i++) {
      lifeIcons.push(
        <span
          key={i}
          style={{ opacity: i < lives ? 1 : 0.3, marginRight: "4px" }}
        >
          {LIVE_ICON}
        </span>
      );
    }
    return lifeIcons;
  };

  if (!question) return null; // Don't render if no question loaded yet

  return (
    <div className="quiz-modal">
      <div className="quiz-box">
        {/* Display Lives */}
        <div
          className="quiz-lives"
          style={{ marginBottom: "15px", fontSize: "1.2rem" }}
        >
          Lives: {renderLives()}
        </div>

        <h3>{question.question}</h3>
        <ul>
          {question.choices.map((choice, index) => (
            <li
              key={index}
              // Apply 'selected' class only if this choice is selected
              // Apply 'disabled' style visually if an answer was already submitted
              className={`${selected === choice ? "selected" : ""} ${
                isAnswered ? "disabled" : ""
              }`}
              onClick={() => handleAnswer(choice)}
              // Add inline style or CSS class for disabled look
              style={{
                cursor: isAnswered ? "not-allowed" : "pointer",
                opacity: isAnswered && selected !== choice ? 0.6 : 1,
              }}
            >
              {choice}
            </li>
          ))}
        </ul>
        {/* Display Feedback */}
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
}
