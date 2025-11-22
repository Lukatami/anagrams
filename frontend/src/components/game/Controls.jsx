import { useGameStore } from "../../stores/gameStore.js";
import { useWordsStore } from "../../stores/wordsStore.js";

function Controls() {
  const { currentGame, gameLanguage, gameDifficulty, submitWord, isGameActive } =
    useGameStore();
  const { playerWord, checkPlayerWord, resetPlayerWord, isCheckLoading } =
    useWordsStore();

  async function handleReadyButtonClick() {
    if (!isGameActive) return;
    if (playerWord.trim() && !isCheckLoading) {
      try {
        const isDuplicate = currentGame.foundWords.some(
          (foundWord) =>
            foundWord.word.toLowerCase() === playerWord.toLowerCase()
        );

        if (isDuplicate) {
          alert("This word has already been found!");
          resetPlayerWord();
          return;
        }

        const result = await checkPlayerWord(
          playerWord,
          gameLanguage,
          gameDifficulty
        );

        if (result.exists) {
          submitWord(playerWord, result.score);
          setTimeout(() => resetPlayerWord(), 1000);
        } else {
          alert("Word is not found in the dictionary!");
          resetPlayerWord();
        }
      } catch (error) {
        console.error("Error checking word:", error);
        alert("Error checking word!");
        resetPlayerWord();
      }
    }
  }

  function handleResetPlayerWordClick() {
    resetPlayerWord();
  }

  return (
    <div className="flex justify-center gap-6 mt-4">
      <button
        onClick={handleReadyButtonClick}
        disabled={!playerWord.trim() || isCheckLoading}
        className={`
          w-16 h-16 rounded-2xl font-bold text-2xl transition flex items-center justify-center
          ${playerWord.trim() && !isCheckLoading
            ? "bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white shadow-lg"
            : "bg-gray-600 text-gray-300 cursor-not-allowed"}
        `}
        title="Submit word"
      >
        {isCheckLoading ? "⏳" : "✅"}
      </button>
      <button
        onClick={handleResetPlayerWordClick}
        disabled={!playerWord.trim()}
        className={`
          w-16 h-16 rounded-2xl font-bold text-2xl transition flex items-center justify-center
          ${playerWord.trim()
            ? "bg-red-500 hover:bg-red-600 active:scale-95 text-white shadow-lg"
            : "bg-gray-600 text-gray-300 cursor-not-allowed"}
        `}
        title="Clear word"
      >
        ❌
      </button>
    </div>
  );
}

export default Controls;
