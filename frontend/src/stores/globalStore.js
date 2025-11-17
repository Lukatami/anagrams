import { create } from "zustand";
import { nanoid } from "nanoid";

export const useGlobalStore = create((set) => ({
  player: {
    name: "",
    id: "",
  },
  language: "en",
  difficulty: "medium",
  appStage: "main",

  setPlayerName: (name) => {
    const trimmedName = name.trim();

    set((state) => {
      if (!trimmedName) {
        return {
          player: { name: "", id: "" },
        };
      }

      const newId = state.player.id || nanoid(6);

      return {
        player: {
          name: trimmedName,
          id: newId,
        },
      };
    });
  },

  resetPlayer: () => {
    set({
      player: { name: "", id: "" },
    });
  },

  setSelectedLanguage: (lang) => {
    set({ language: lang });
  },

  setSelectedDifficulty: (diff) => {
    set({ difficulty: diff });
  },

  setGameStage: () => {
    set({ appStage: "game" });
  },

  resetGame: () => {
    set({
      player: { name: "", id: "" },
      difficulty: "medium",
      appStage: "main",
    });
  },
}));
