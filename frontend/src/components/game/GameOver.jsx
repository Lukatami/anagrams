import { useNavigate } from "react-router-dom";
import { useGameStore } from "../../stores/gameStore.js";
import { useWordsStore } from "../../stores/wordsStore.js";

function GameOver() {
  const navigate = useNavigate();
  const { currentGame, resetGameState, gameOver } = useGameStore();
  const { resetWordState } = useWordsStore();

  function handleClose() {
    resetGameState();
    resetWordState();
    navigate("/");
  }

  if (!gameOver) {
    return null;
  }

  return (
    <div>
      <div>
        <h2>Game Over!</h2>
        <p>Your final score: {currentGame.totalScore}</p>
        <button onClick={handleClose}>Return to Menu</button>
      </div>
    </div>
  );
}

export default GameOver;
