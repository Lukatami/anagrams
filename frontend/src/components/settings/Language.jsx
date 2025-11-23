import ReactCountryFlag from "react-country-flag";

import { useGlobalStore } from "../../stores/globalStore.js";

import { languages } from "../../data/languages.js";
import { texts } from "../../data/texts.js";

function Language() {
  const { interfaceLanguage, setInterfaceSelectedLanguage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  function handleLanguageButtonClick(lang, e) {
    e.preventDefault();
    setInterfaceSelectedLanguage(lang);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <p className="text-lg font-semibold text-white drop-shadow">
        {text.chooseInterfaceLanguage}
      </p>
      <div className="flex gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={(e) => handleLanguageButtonClick(lang.code, e)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-xl shadow-md transition 
              hover:bg-white/20 
              ${
                interfaceLanguage === lang.code
                  ? "border-2 border-red-500 scale-110"
                  : "border border-white/20"
              }`}
          >
            <ReactCountryFlag
              countryCode={lang.flag}
              style={{
                width: "2rem",
                height: "2rem",
              }}
              svg
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Language;
