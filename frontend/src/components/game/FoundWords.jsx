import { useGameStore } from "../../stores/gameStore.js";

function FoundWords() {
  const { currentGame } = useGameStore();

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg mt-6">
      <h3 className="text-xl font-bold text-red-500 mb-3 drop-shadow-lg">
        Found Words ({currentGame.foundWords.length})
      </h3>
      <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-2">
        {currentGame.foundWords.map((wordObj, index) => (
          <div
            key={index}
            className="px-3 py-1 bg-blue-500/30 rounded-lg text-white font-semibold text-lg shadow-sm"
          >
            {wordObj.word}{" "}
            <span className="text-emerald-300">(+{wordObj.score})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoundWords;
