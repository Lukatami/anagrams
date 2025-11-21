import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialPlayerState = {
  playerId: "",
  playerName: "",
  playerEmail: "",
  avatarUrl: "",

  authToken: "",
  isGuest: true,
  isLoggedIn: false,

  loadingPlayer: false,
  playerError: null,

  totalGames: 0,
  totalScore: 0,

  gameHistory: [],
};

export const usePlayerStore = create(
  persist(
    (set, get) => ({
      ...initialPlayerState,

      logIn: async (token) => {
        if (!token) {
          console.error("No token provided for login");
          return false;
        }

        set({ loadingPlayer: true, playerError: null });

        try {
          const BASE_API_URL =
            import.meta.env.VITE_API_URL || "http://localhost:3000";

          const response = await fetch(`${BASE_API_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Authentication failed: ${response.status}`);
          }

          const userData = await response.json();

          set({
            playerId: userData.id || userData._id,
            playerName: userData.name,
            playerEmail: userData.email,
            avatarUrl: userData.avatarUrl,
            authToken: token,
            isGuest: false,
            isLoggedIn: true,
            loadingPlayer: false,
            playerError: null,
          });

          localStorage.setItem("auth_token", token);
          return true;
        } catch (error) {
          console.error("Login failed:", error);
          set({
            loadingPlayer: false,
            playerError: error.message,
          });
          return false;
        }
      },

      logOut: () => {
        localStorage.removeItem("auth_token");
        set(initialPlayerState);
      },

      checkAuth: async () => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
          return false;
        }

        return await get().logIn(token);
      },

      addGameToHistory: (gameData) => {
        set((state) => ({
          totalGames: state.totalGames + 1,
          totalScore: state.totalScore + gameData.totalScore,
          gameHistory: [
            ...state.gameHistory,
            {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              ...gameData,
            },
          ],
        }));
      },

      resetPlayerStats: () => {
        localStorage.removeItem("auth_token");
        set(initialPlayerState);
      },
    }),
    {
      name: "player-store",
      partialize: (state) => ({
        playerId: state.playerId,
        playerName: state.playerName,
        playerEmail: state.playerEmail,
        avatarUrl: state.avatarUrl,
        authToken: state.authToken,
        isGuest: state.isGuest,
        isLoggedIn: state.isLoggedIn,
        totalGames: state.totalGames,
        totalScore: state.totalScore,
        gameHistory: state.gameHistory,
      }),
    }
  )
);
