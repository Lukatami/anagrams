import { useNavigate, useLocation } from "react-router-dom";
import { useGlobalStore } from "../../stores/globalStore.js";
import { usePlayerStore } from "../../stores/playerStore.js";
import { texts } from "../../data/texts.js";

function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { interfaceLanguage } = useGlobalStore();
  const { playerName, isGuest, isLoggedIn } = usePlayerStore();

  const text = texts[interfaceLanguage];
  const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLoginClick = () => {
    const redirectUrl = encodeURIComponent(
      `${window.location.origin}/login-success`
    );
    const googleAuthUrl = `${BASE_API_URL}/api/auth/google?redirect=${redirectUrl}`;
    window.location.href = googleAuthUrl;
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleLeaderboardClick = () => {
    navigate("/leaderboard");
  };

  const isHomePage = location.pathname === "/";

  return (
    <header>
      <h1>{text.title}</h1>
      <nav>
        <button onClick={handleHomeClick}>🏠</button>
        <button onClick={handleLeaderboardClick}>🏆</button>
        <button onClick={handleSettingsClick}>⚙️</button>
        {isLoggedIn && !isGuest ? (
          <button onClick={handleProfileClick}>👤{playerName}</button>
        ) : (
          <button onClick={handleLoginClick}>🔐Log In</button>
        )}
      </nav>
    </header>
  );
}

export default AppHeader;
