export function calculateStreakBonus(currentStreak) {
  if (currentStreak >= 10) {
    return 5; // Bonus points for streaks of 10+
  } else if (currentStreak >= 5) {
    return 2; // Bonus points for streaks of 5+
  }
  return 0; // No bonus for smaller streaks
}
