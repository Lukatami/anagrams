import GameDifficulty from "./GameDifficulty.jsx";
import StartGameButton from "./StartGameButton.jsx";
import GameLanguage from "./GameLanguage.jsx";

function MainMenu() {
  return (
    <div className="main-menu">
      <h2>Setup your Game!</h2>
      <GameDifficulty />
      <GameLanguage />
      <StartGameButton />
    </div>
  );
}

export default MainMenu;
