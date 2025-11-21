import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";
import GameDifficulty from "./GameDifficulty.jsx";
import StartGameButton from "./StartGameButton.jsx";
import GameLanguage from "./GameLanguage.jsx";

function MainMenu({}) {
  const { interfaceLanguage } = useGlobalStore();

  const text = texts[interfaceLanguage];

  return (
    <div className="mainMenu">
      <GameDifficulty />
      <GameLanguage />
      <StartGameButton />
    </div>
  );
}

export default MainMenu;
