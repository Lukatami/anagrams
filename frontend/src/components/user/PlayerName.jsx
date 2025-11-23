import { useState } from "react";
import { usePlayerStore } from "../../stores/playerStore.js";

function PlayerName() {
  const { playerName, updatePlayerName, isLoggedIn, isGuest } =
    usePlayerStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(playerName);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setEditedName(playerName);
    setIsEditing(true);
    setError("");
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(playerName);
    setError("");
  };

  const handleInputChange = (e) => {
    setEditedName(e.target.value);
    if (error) setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSaveClick();
    else if (e.key === "Escape") handleCancelClick();
  };

  const handleSaveClick = async () => {
    const trimmed = editedName.trim();

    if (!trimmed) {
      setError("Name cannot be empty");
      return;
    }

    if (trimmed === playerName) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await updatePlayerName(trimmed);
      setIsEditing(false);
      setError("");
    } catch (err) {
      setError(err.message || "Error updating name");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn || isGuest) {
    return (
      <p className="text-white/70 text-sm italic text-center">
        You are in guest mode
      </p>
    );
  }

  if (!isEditing) {
    return (
      <div className="flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-xl shadow">
        <div className="text-white text-lg font-medium">{playerName}</div>
        <button
          className="text-white/80 hover:text-white hover:scale-110 transition"
          onClick={handleEditClick}
        >
          ✏️
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl shadow space-y-3">
      {error && (
        <div className="text-red-400 text-sm font-medium bg-red-400/10 border border-red-400/40 px-3 py-1 rounded">
          {error}
        </div>
      )}

      <div>
        <input
          value={editedName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
          maxLength={50}
          disabled={isLoading}
          placeholder={"Enter your name"}
          className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white
                   placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        <div className="text-right text-xs text-white/60">
          {editedName.length}/50
        </div>

        <div className="flex gap-3 justify-end">
          <button
            className="px-4 py-2 bg-green-500/80 text-white rounded-lg hover:bg-green-500 
                     disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={handleSaveClick}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button
            className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 
                     disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={handleCancelClick}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerName;
