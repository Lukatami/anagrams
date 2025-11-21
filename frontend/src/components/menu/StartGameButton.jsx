import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../stores/globalStore.js";
import { useGameStore } from "../../stores/gameStore.js";

import { texts } from "../../data/texts.js";

function StartGameButton() {
  const navigate = useNavigate();
  const { interfaceLanguage} =
    useGlobalStore();
  const { gameLanguage, gameDifficulty, startGame } = useGameStore();

  const text = texts[interfaceLanguage];

  async function handleStartGame() {
    try {
      await startGame(gameLanguage, gameDifficulty);
      navigate("/game");
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  }

  return <button onClick={handleStartGame}>{text.startGame}</button>;
}

export default StartGameButton;
