import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../stores/globalStore.js";
import { texts } from "../../data/texts.js";

function SettingsButton() {
  const navigate = useNavigate();
  const { interfaceLanguage } = useGlobalStore();
  const text = texts[interfaceLanguage];

  function handleShowSetting() {
    navigate("/settings");
  }

  return <button onClick={handleShowSetting}>{text.settings}</button>;
}

export default SettingsButton;
