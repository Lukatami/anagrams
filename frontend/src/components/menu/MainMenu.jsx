import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../../../backend/src/data/texts.js";
import { useEffect, useState } from "react";
import Language from "./Language.jsx";
import Difficulty from "./Difficulty.jsx";

import "./mainMenu.css";

function MainMenu({}) {
  const {
    player,
    language,
    difficulty,
    setPlayerName,
    setGameStage,
    resetPlayer,
  } = useGlobalStore();

  const [localName, setLocalName] = useState("");

  useEffect(() => {
    setLocalName(player.name);
  }, [player.name]);

  const text = texts[language];

  function handlePlayerNameSubmit(e) {
    e.preventDefault();
    if (!localName.trim()) {
      alert(text.enterName);
      return;
    }
    setPlayerName(localName.trim());
  }

  function handleStartGame() {
    if (!player.name) {
      alert(text.enterName);
      return;
    }
    if (!difficulty) {
      alert(text.chooseDifficulty);
      return;
    }
    setGameStage();
  }

  function handleResetName() {
    setLocalName("");
    resetPlayer();
  }

  return (
    <div className="mainMenu">
      <h1>{text.title}</h1>

      <Language />

      <div className="name-input">
        <p>{text.enterName}</p>
        <form onSubmit={handlePlayerNameSubmit}>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            placeholder={text.enterName}
          />
          <button type="submit">✅</button>
        </form>
        <button onClick={handleResetName}>❌</button>
      </div>

      <Difficulty />

      <div className="start-button">
        <button
          onClick={handleStartGame}
          disabled={!player.name || !difficulty}
        >
          {text.startGame}
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
