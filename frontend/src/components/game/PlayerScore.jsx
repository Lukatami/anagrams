import { useGameStore } from "../../stores/gameStore.js";

function PlayerScore() {
  const { currentGame } = useGameStore();

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg flex flex-col items-center gap-2 mt-4">
      <h2 className="text-2xl font-bold text-red-500 drop-shadow-lg">
        Total Score:{" "}
        <span className="text-emerald-300">{currentGame.totalScore}</span>
      </h2>
      <p className="text-white text-lg">
        Words Found:{" "}
        <span className="text-blue-300 font-semibold">
          {currentGame.foundWords.length}
        </span>
      </p>
    </div>
  );
}

export default PlayerScore;
