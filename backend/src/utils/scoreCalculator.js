function scoreCalculator(word, difficulty) {
  const length = word.length;

  if (
    (difficulty === "medium" && length === 3) ||
    (difficulty === "hard" && (length === 3 || length === 4))
  ) {
    return 0;
  }

  const baseScores = {
    3: 1,
    4: 2,
    5: 3,
    6: 4,
  };

  let baseScore = baseScores[length] || (length >= 7 ? 5 : 0);

  const multipliers = {
    easy: 1,
    medium: 1.5,
    hard: 2,
  };

  const multiplier = multipliers[difficulty] || 1;

  return Math.round(baseScore * multiplier);
}

// Test scoreCalculator()
function testScoreCalculator () {
    console.log("For 'easy' difficulty word 'cat' scores (1): " + scoreCalculator("cat", "easy")); 
    console.log("For 'medium' difficulty word 'cat' scores (0): " + scoreCalculator("cat", "medium"));
    console.log("For 'hard' difficulty word 'cat' scores (0): " + scoreCalculator("cat", "hard"));

    console.log("For 'easy' difficulty word 'home' scores (2): " + scoreCalculator("home", "easy"));
    console.log("For 'medium' difficulty word 'home' scores (3): " + scoreCalculator("home", "medium"));
    console.log("For 'hard' difficulty word 'home' scores (0): " + scoreCalculator("home", "hard"));

    console.log("For 'hard' difficulty word 'house' scores (6): " + scoreCalculator("house", "hard"));
    
    console.log("For 'easy' difficulty word 'international' scores (5): " + scoreCalculator("international", "easy"));
    console.log("For 'medium' difficulty word 'international' scores (8): " + scoreCalculator("international", "medium"));
    console.log("For 'hard' difficulty word 'international' scores (10): " + scoreCalculator("international", "hard"))
};
