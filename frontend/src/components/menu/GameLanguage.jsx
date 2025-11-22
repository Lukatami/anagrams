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
    <div className="flex flex-col items-center w-full">
      <p className="text-white/90 text-lg font-semibold mb-4 text-center">
        {text.chooseGameLanguage}:
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={(e) => handleLanguageButtonClick(lang.code, e)}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center transition
              ${
                gameLanguage === lang.code
                  ? "bg-red-500 shadow-lg scale-105"
                  : "bg-white/20 hover:bg-white/30"
              }
            `}
          >
            <ReactCountryFlag
              style={{ width: "1.5em", height: "1.5em" }}
              countryCode={lang.flag}
              svg
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameLanguage;
