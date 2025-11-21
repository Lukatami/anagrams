import { Navigate } from "react-router-dom";
import { useGameStore } from "../stores/gameStore";

function ProtectedGameRoute({ children }) {
  const { isGameActive, gameOver } = useGameStore();

  if (!isGameActive && !gameOver) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedGameRoute;
