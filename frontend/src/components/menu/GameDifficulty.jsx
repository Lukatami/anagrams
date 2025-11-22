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
    <div className="flex flex-col items-center w-full">
      <p className="text-white/90 text-lg font-semibold mb-4">
        {text.chooseDifficulty}
      </p>
      <div className="flex gap-4 flex-wrap justify-center w-full">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={(e) => handleDifficultyButtonClick(diff, e)}
            className={`
              px-6 py-3 rounded-xl font-semibold transition 
              border-2 
              ${
                gameDifficulty === diff
                  ? "bg-red-500 text-white border-red-500 shadow-lg scale-105"
                  : "bg-white/20 text-white border-white/30 hover:bg-white/30 hover:border-white/50"
              }
            `}
          >
            {text.difficulties[diff]}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameDifficulty;
