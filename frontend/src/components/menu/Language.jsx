import { languages } from "../../../../backend/src/data/languages.js";
import { useGlobalStore } from "../../stores/globalStore.js";
import ReactCountryFlag from "react-country-flag";

function Language() {
  const { language, setSelectedLanguage } = useGlobalStore();

  function handleLanguageButtonClick(lang, e) {
    e.preventDefault();
    setSelectedLanguage(lang);
  }

  return (
    <div className="flags">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={(e) => handleLanguageButtonClick(lang.code, e)}
          className={language === lang.code ? "active" : ""}
        >
          <ReactCountryFlag countryCode={lang.flag} svg />
        </button>
      ))}
    </div>
  );
}

export default Language;
