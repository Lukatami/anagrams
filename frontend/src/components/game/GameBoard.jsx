import { useGameStore } from "../../stores/gameStore";
import Timer from "./Timer";
import BaseWord from "./BaseWord";
import PlayerWord from "./PlayerWord";
import Controls from "./Controls";
import FoundWords from "./FoundWords";
import PlayerScore from "./PlayerScore";
import GameOver from "./GameOver";

function GameBoard() {
  const { gameOver, isGameActive } = useGameStore();

  if (!isGameActive && !gameOver) {
    return null;
  }

  return (
    <div className="game-board flex flex-col items-center w-full px-4 py-6 gap-6">
      {!gameOver && (
        <>
          <div className="w-full max-w-2xl">
          <Timer />
          </div>
          <BaseWord />
          <PlayerWord />
          <Controls />
          <FoundWords />
          <div className="w-full max-w-2xl">
          <PlayerScore />
          </div>
        </>
      )}
      {gameOver && <GameOver />}
    </div>
  );
}

export default GameBoard;
