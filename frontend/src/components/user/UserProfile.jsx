import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "../../stores/playerStore.js";
import PlayerName from "./PlayerName.jsx";

function UserProfile() {
  const navigate = useNavigate();
  const { logOut } = usePlayerStore();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <div>
      <h2>User Profile</h2>
      <PlayerName />
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}

export default UserProfile;
