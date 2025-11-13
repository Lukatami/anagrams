import { use, useState } from "react";
import GameBoard from "./components/game/GameBoard";
import MainMenu from "./components/menu/MainMenu";

function App() {
  const [gameSettings, setGameSettings] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  return (
    <>
      {!gameSetting ? (
        <MainMenu
          onStartGame={setGameSettings}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      ) : (
        <GameBoard
          playerName={gameSettings.playerName}
          language={gameSettings.language}
          difficulty={gameSettings.selectedDifficulty}
        />
      )}
    </>
  );
}

export default App;
