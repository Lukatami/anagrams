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
    <div className="controls">
      <button
        onClick={handleReadyButtonClick}
        disabled={!playerWord.trim() || isCheckLoading}
        className="control-button submit-button"
        title="Submit word"
      >
        {isCheckLoading ? "⏳" : "✅"}
      </button>
      <button
        onClick={handleResetPlayerWordClick}
        disabled={!playerWord.trim()}
        className="control-button reset-button"
        title="Clear word"
      >
        ❌
      </button>
    </div>
  );
}

export default Controls;
