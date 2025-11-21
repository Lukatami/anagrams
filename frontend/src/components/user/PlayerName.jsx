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
    return <p>You are in guest mode</p>;
  }

  if (!isEditing) {
    return (
      <div>
        <div>
          <div>{playerName}</div>
          <button onClick={handleEditClick}>✏️</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {error && <div>{error}</div>}

      <div>
        <input
          value={editedName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
          maxLength={50}
          disabled={isLoading}
          placeholder={"Enter your name"}
        />
        <div>{editedName.length}/50</div>

        <div>
          <button onClick={handleSaveClick} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button onClick={handleCancelClick} disabled={isLoading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerName;
