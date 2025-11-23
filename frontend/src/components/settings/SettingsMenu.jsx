import Language from "./Language.jsx";

function SettingsMenu() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-3xl font-bold text-white drop-shadow mb-2">
        Settings
      </h2>
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
        <Language />
      </div>
    </div>
  );
}

export default SettingsMenu;
