import { useGameStore } from "../../stores/gameStore.js";
import { useWordsStore } from "../../stores/wordsStore.js";

function BaseWord() {
  const { currentGame } = useGameStore();
  const { availableLetters, addLetter, usedLetters } = useWordsStore();

  return (
    <div>
      <div>
        <h3>Base Word: {currentGame.baseWord}</h3>
      </div>
      <div>
        {availableLetters.map((letter, index) => {
          const isUsed = usedLetters.has(index);

          return (
            <button
              key={`${letter}-${index}`}
              className={`letter-button ${isUsed ? "used" : ""}`}
              onClick={() => !isUsed && addLetter(letter, index)}
              disabled={isUsed}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BaseWord;
