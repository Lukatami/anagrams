import ReactCountryFlag from "react-country-flag";

import { useGlobalStore } from "../../stores/globalStore.js";
import { useGameStore } from "../../stores/gameStore.js";

import { languages } from "../../data/languages.js";
import { texts } from "../../data/texts.js";

function GameLanguage() {
  const { interfaceLanguage } = useGlobalStore();
  const { gameLanguage, setGameSelectedLanguage } = useGameStore();

  const text = texts[interfaceLanguage];

  function handleLanguageButtonClick(lang, e) {
    e.preventDefault();
    setGameSelectedLanguage(lang);
  }

  return (
    <div className="flags">
      <p>{text.chooseGameLanguage}:</p>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={(e) => handleLanguageButtonClick(lang.code, e)}
          className={gameLanguage === lang.code ? "active" : ""}
        >
          <ReactCountryFlag countryCode={lang.flag} svg />
        </button>
      ))}
    </div>
  );
}

export default GameLanguage;
