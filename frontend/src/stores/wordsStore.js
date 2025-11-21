import { create } from "zustand";
import { scoreCalculator } from "../utils/scoreCalculator.js";

const initialWordsState = {
  isCheckLoading: false,
  loadingError: null,
  playerWord: "",
  isCorrect: false,
  playerWordScore: 0,
  availableLetters: [],
  selectedLetters: [],
  usedLetters: new Set(),
  isBaseWordLoading: false,
};

export const useWordsStore = create((set, get) => ({
  ...initialWordsState,

  setGameBaseWord: async (lang) => {
    set({ isBaseWordLoading: true, loadingError: null });

    try {
      const BASE_API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await fetch(
        `${BASE_API_URL}/api/basewords/random/${lang}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data?.baseWord || typeof data.baseWord !== "string") {
        throw new Error("Invalid word data received from server");
      }

      const baseWord = data.baseWord.toLowerCase();
      const baseWordId = data._id;
      const availableLetters = baseWord.split("");

      set({
        availableLetters: availableLetters,
        selectedLetters: [],
        playerWord: "",
        isCorrect: false,
        playerWordScore: 0,
        usedLetters: new Set(),
        loadingError: null,
        isBaseWordLoading: false,
      });

      return { baseWord: baseWord, baseWordId: baseWordId };
    } catch (e) {
      console.error("Failed to fetch base word:", e);
      set({
        loadingError: e.message,
        isBaseWordLoading: false,
      });
      throw e;
    }
  },

  addLetter: (letter, index) => {
    const { selectedLetters, playerWord, usedLetters } = get();

    if (usedLetters.has(index)) {
      return;
    }

    const newSelectedLetters = [...selectedLetters, { letter, index }];
    const newPlayerWord = playerWord + letter;
    const newUsedLetters = new Set([...usedLetters, index]);

    set({
      selectedLetters: newSelectedLetters,
      playerWord: newPlayerWord,
      usedLetters: newUsedLetters,
    });
  },

  checkPlayerWord: async (playerWord, gameLanguage, gameDifficulty) => {
    set({ isCheckLoading: true, isCorrect: false, loadingError: null });

    try {
      const BASE_API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await fetch(
        `${BASE_API_URL}/api/words/check/${playerWord}?lang=${gameLanguage}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const isExists = data.exists;

      const score = isExists ? scoreCalculator(playerWord, gameDifficulty) : 0;

      set({
        isCheckLoading: false,
        isCorrect: isExists,
        playerWordScore: score,
        loadingError: null,
      });

      return { exists: isExists, score };
    } catch (e) {
      console.error("Failed to check player word:", e);
      set({
        loadingError: e.message,
        isCheckLoading: false,
        isCorrect: false,
        playerWordScore: 0,
      });
      return { exists: false, score: 0 };
    }
  },

  resetPlayerWord: () => {
    set({
      playerWord: "",
      selectedLetters: [],
      usedLetters: new Set(),
      isCorrect: false,
      playerWordScore: 0,
    });
  },

  resetWordState: () => {
    set(initialWordsState);
  },
}));
