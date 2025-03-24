import "./StreakIndicator.css";

export default function StreakIndicator({ streak }) {
  if (streak < 3) return null; // Only show if streak is 3 or more

  let streakClass = "streak"; // Default style
  if (streak >= 10) {
    streakClass += " hot"; // Streak 10+ (fire animation)
  } else if (streak >= 5) {
    streakClass += " high"; // Streak 5+ (orange-red)
  } else {
    streakClass += " medium"; // Streak 3+ (yellow)
  }

  return (
    <div className={streakClass}>
      <img className="xin" src="/xin.jpg" alt="Fire Icon" />
      <span className="streak-text">Streak:</span>
      <span>{streak}</span>
      <img className="xin" src="/xin.jpg" alt="Fire Icon" />
    </div>
  );
}
