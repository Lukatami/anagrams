import { useEffect } from "react";
import { useGameStore } from "../../stores/gameStore";

function Timer() {
  const { timeLeft, decrementTime, isGameActive, endGame, gameOver } =
    useGameStore();

  useEffect(() => {
    if (!isGameActive || gameOver || timeLeft <= 0) return;

    const timer = setInterval(() => decrementTime(), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isGameActive, gameOver, decrementTime]);

  useEffect(() => {
    if (timeLeft === 0 && isGameActive && !gameOver) {
      endGame();
    }
  }, [timeLeft, isGameActive, gameOver, endGame]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString()} : ${secs.toString()}`;
  }

  return (
    <div className="game-timer">
      <h3>Time Left: {formatTime(timeLeft)}</h3>
    </div>
  );
}

export default Timer;
