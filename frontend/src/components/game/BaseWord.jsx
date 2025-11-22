import { useGameStore } from "../../stores/gameStore.js";
import { useWordsStore } from "../../stores/wordsStore.js";

function BaseWord() {
  const { currentGame } = useGameStore();
  const { availableLetters, addLetter, usedLetters } = useWordsStore();

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg gap-6">
      <div className="text-2xl font-bold text-red-500 drop-shadow-lg select-none">
        Base Word: {currentGame.baseWord}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {availableLetters.map((letter, index) => {
          const isUsed = usedLetters.has(index);

          return (
            <button
              key={`${letter}-${index}`}
              onClick={() => !isUsed && addLetter(letter, index)}
              disabled={isUsed}
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition 
                ${
                  isUsed
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
                }
              `}
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
