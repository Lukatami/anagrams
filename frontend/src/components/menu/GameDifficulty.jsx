import { useGlobalStore } from "../../stores/globalStore.js";
import { useGameStore } from "../../stores/gameStore.js";
import { texts } from "../../data/texts.js";
import { difficulties } from "../../data/difficulties.js";

function GameDifficulty() {
  const { interfaceLanguage } = useGlobalStore();
  const { gameDifficulty, setGameSelectedDifficulty } = useGameStore();

  const text = texts[interfaceLanguage];

  function handleDifficultyButtonClick(diff, e) {
    e.preventDefault();
    setGameSelectedDifficulty(diff);
  }

  return (
    <div className="difficulty-selection">
      <p>{text.chooseDifficulty}:</p>
      <div className="difficulty-buttons">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={(e) => handleDifficultyButtonClick(diff, e)}
            className={gameDifficulty === diff ? "active" : ""}
          >
            {text.difficulties[diff]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameDifficulty;
