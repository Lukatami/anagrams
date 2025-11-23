import { useNavigate } from "react-router-dom";
import { usePlayerStore } from "../../stores/playerStore.js";
import PlayerName from "./PlayerName.jsx";

function UserProfile() {
  const navigate = useNavigate();
  const { logOut, deletePlayerAccount } = usePlayerStore();

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible!"
    );

    if (!confirmDelete) return;

    try {
      await deletePlayerAccount();
      alert("Your account has been deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      alert("Failed to delete account!");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg text-white space-y-6">
      <h2 className="text-2xl font-bold text-white text-center mb-2">
        User Profile
      </h2>
      <PlayerName />
      <div className="flex flex-col gap-4 pt-4">
        <button
          className="w-full py-2 bg-blue-500/80 hover:bg-blue-500 
                     text-white rounded-xl transition font-medium"
          onClick={handleLogOut}
        >
          Log Out
        </button>
        <button
          className="w-full py-2 bg-red-600/80 hover:bg-red-600
                     text-white rounded-xl transition font-medium"
          onClick={handleDeleteClick}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
