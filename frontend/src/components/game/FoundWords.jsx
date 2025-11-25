import { useGameStore } from "../../stores/gameStore.js";
import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function FoundWords() {
  const { currentGame } = useGameStore();
    const { interfaceLanguage } = useGlobalStore();
  
    const text = texts[interfaceLanguage];

  return (
    <div className="relative w-full bg-white/8 backdrop-blur rounded-3xl shadow-lg p-4">
      <div className="absolute top-3 left-3 bg-white/10 px-3 py-1 rounded-full text-sm font-semibold text-white/90">
        {currentGame.foundWords.length} {text.found}
      </div>

      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {currentGame.foundWords.map((w, idx) => (
          <div
            key={idx}
            className="px-3 py-2 bg-blue-500/30 rounded-lg text-white font-semibold flex flex-col"
          >
            <div className="font-mono text-lg">{w.word}</div>
            <div className="text-sm text-emerald-300 mt-1">+{w.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoundWords;
