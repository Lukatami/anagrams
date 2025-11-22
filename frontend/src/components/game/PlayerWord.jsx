import { useWordsStore } from "../../stores/wordsStore.js";

function PlayerWord() {
  const { playerWord, playerWordScore, isCorrect } = useWordsStore();

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg flex flex-col items-center gap-2 mt-4">
      <h3 className="text-xl font-bold text-red-500 drop-shadow-lg select-none">
        Current Word: {playerWord}
      </h3>
      {playerWord && (
        <p
          className={`text-lg font-semibold ${
            isCorrect ? "text-emerald-300" : "text-red-400"
          }`}
        >
          Score: {playerWordScore} {isCorrect ? "✓" : ""}
        </p>
      )}
    </div>
  );
}

export default PlayerWord;
