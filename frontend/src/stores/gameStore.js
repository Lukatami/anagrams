import { create } from "zustand";
import { useWordsStore } from "./wordsStore";
import { usePlayerStore } from "./playerStore";

// Initial Game State
const initialGameState = {
  gameDifficulty: "medium", // "medium" for test
  gameLanguage: "ru", // "ru" for test

  isGameLoading: false,
  loadingError: null,

  isGameActive: false,
  gameOver: false,
  timeLeft: 480,

  currentGame: {
    startTime: null,
    baseWord: "",
    baseWordId: "",
    foundWords: [],
    totalScore: 0,
    difficulty: "",
    language: "",
  },
};

// Service function to define time depends of difficulty
function getTimeByDifficulty(diff) {
  const timeByDifficulty = {
    easy: 600,
    medium: 5, // 5 sec for test
    hard: 300,
  };
  return timeByDifficulty[diff] || 480;
}

// Declare useGameStore hook
export const useGameStore = create((set, get) => ({
  ...initialGameState,

  // startGame method
  startGame: async (lang, diff) => {
    // Set initial states for StartGame method
    set({
      // Game is loading
      isGameLoading: true,
      loadingError: null,
      // Use selected lang and diff to set game flow
      gameLanguage: lang,
      gameDifficulty: diff,
      timeLeft: getTimeByDifficulty(diff),
      // Game is active
      isGameActive: true,
      gameOver: false,
      // Set settings and initial states for currentGame
      currentGame: {
        startTime: new Date(),
        baseWord: "",
        baseWordId: "",
        foundWords: [],
        totalScore: 0,
        difficulty: diff,
        language: lang,
      },
    });

    // Try/Catch block
    try {
      // Limited use of wordsStore with setGameBaseWord method
      const { setGameBaseWord } = useWordsStore.getState();
      const baseWordData = await setGameBaseWord(lang);

      // Set baseWord for the currentGame
      set((state) => ({
        currentGame: {
          ...state.currentGame,
          baseWord: baseWordData.baseWord,
          baseWordId: baseWordData.baseWordId,
        },
      }));
    } catch (error) {
      console.error("Failed to start game:", error);

      // If error set new error.message and deactivate game
      set({
        loadingError: error.message,
        isGameActive: false,
      });
      throw error;
    } finally {
      // Finally unset GameLoading state
      set({ isGameLoading: false });
    }
  },

  // submitWord method
  submitWord: (playerWord, score) => {
    // Declate timestamp outside of set states
    const ts = new Date();
    // Set states using prev state
    set((state) => {
      // Adding wordObj to current array of foundWords
      const newFoundWords = [
        ...state.currentGame.foundWords,
        {
          word: playerWord,
          score: score,
          timestamp: ts,
        },
      ];

      // Recalculate totalScore adding wordObj score
      const newTotalScore = state.currentGame.totalScore + score;

      return {
        // Update currentGame stats with newFoundWords and totalScore
        currentGame: {
          ...state.currentGame,
          foundWords: newFoundWords,
          totalScore: newTotalScore,
        },
      };
    });
  },

  // endGame method
  endGame: async () => {
    // get currentGame state
    const { currentGame } = get();

    // If baseWord empty = no game = nothing to save
    if (currentGame.baseWord) {
      try {
        // Limited use of playerStore with addGameToHistory method
        const { addGameToHistory } = usePlayerStore.getState();
        await addGameToHistory(currentGame);

        const { isLoggedIn, authToken } = usePlayerStore.getState();
        if (isLoggedIn && authToken) {
          await get().saveGameToServer(currentGame, authToken);
        }
      } catch (error) {
        console.error("Failed to save game history:", error);
      }
    }
    // Deactivate Game
    set({ gameOver: true });
  },

  saveGameToServer: async (gameData, token) => {
    try {
      const BASE_API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${BASE_API_URL}/api/gamesessions/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          baseWord: gameData.baseWordId,
          foundWords: gameData.foundWords.map((foundWord) => ({
            word: foundWord.word,
            score: foundWord.score,
          })),
          totalScore: gameData.totalScore,
          difficulty: gameData.difficulty,
          language: gameData.language,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }

      const savedGame = await response.json();
      console.log("Game successfully saved to server:", savedGame);
      return savedGame;
    } catch (e) {
      console.error("Error saving game to server:", e);
    }
  },

  // setGameSelectedLanguage method
  setGameSelectedLanguage: (lang) => {
    set({ gameLanguage: lang });
    console.log("Selected game language: ", lang);
  },

  // setGameSelectedDifficulty method
  setGameSelectedDifficulty: (diff) => {
    set({ gameDifficulty: diff });
    console.log("Selected game difficulty: ", diff);
  },

  // decrementTime method
  decrementTime: () => {
    // get gameActive and timeLeft states
    const { isGameActive, timeLeft } = get();

    // If game is not active return
    if (!isGameActive) return;

    // If time is over
    if (timeLeft <= 1) {
      // call endGame method to saveHistory and deactivate game
      get().endGame();
      // set timeLeft to 0
      set({ timeLeft: 0 });
      return;
    }
    // Decrement
    set({ timeLeft: timeLeft - 1 });
  },

  // resetGameState method
  resetGameState: () => {
    // return all states to initial state
    set(initialGameState);
    console.log("Game state reset complete");
  },
}));
