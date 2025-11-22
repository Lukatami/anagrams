import { useEffect } from "react";
import { useGameStore } from "../../stores/gameStore";

function Timer() {
  const { timeLeft, decrementTime, isGameActive, gameOver } = useGameStore();

  useEffect(() => {
    if (!isGameActive || gameOver || timeLeft <= 0) {
      return;
    }
    const timer = setInterval(() => {
      decrementTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameActive, gameOver, decrementTime]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString()} : ${secs.toString()}`;
  }

  let timerColor = "text-emerald-300";
  if (timeLeft <= 10) timerColor = "text-red-500";
  else if (timeLeft <= 30) timerColor = "text-yellow-300";

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg flex justify-center items-center mt-4">
      <h3
        className={`text-2xl font-bold drop-shadow-lg select-none ${timerColor}`}
      >
        Time Left: {formatTime(timeLeft)}
      </h3>
    </div>
  );
}

export default Timer;
