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
    <div>
      {!gameOver && (
        <>
          <Timer />
          <BaseWord />
          <PlayerWord />
          <Controls />
          <FoundWords />
          <PlayerScore />
        </>
      )}
      {gameOver && <GameOver />}
    </div>
  );
}

export default GameBoard;
