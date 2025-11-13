import { useState } from "react";
import { texts } from "../../data/texts.js";

const languages = [
  { code: "en", label: "English", flag: "GB" },
  { code: "ru", label: "Русский", flag: "RU" },
  { code: "es", label: "Espaniol", flag: "ES" },
];

const difficulties = ["easy", "medium", "hard"];

function MainMenu({ onStartGame, selectedLanguage, setSelectedLanguage }) {
  const [playerName, setPlayerName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const text = texts[selectedLanguage || "en"];

  const canStartGame =
    selectedLanguage && playerName.trim() !== "" && selectedDifficulty;

  const handleStartGame = () => {
    if (!canStartGame) return;
    onStartGame({
      playerName: playerName.trim(),
      language: selectedLanguage,
      selectedDifficulty,
    });
  };

  return (
    <div className="mainMenu">
      <h1>{text.title}</h1>
      <div className="flags">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLanguage(lang.code)}
          >
            {lang.flag}
            {lang.label}
          </button>
        ))}
      </div>
      <div className="name-input">
        <p>{text.enterName}</p>
        <input
          type="text"
          value={playerName}
          placeholder={text.enterName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </div>
      <div className="difficulty-selection">
        <p>{text.chooseDifficulty}</p>
        <div className="difficulty-buttons">
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
            ></button>
          ))}
        </div>
      </div>
      <div className="start-button">
        <button onClick={handleStartGame}>{text.startGame}</button>
      </div>
    </div>
  );
}

export default MainMenu;
