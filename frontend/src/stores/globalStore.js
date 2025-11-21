import { create } from "zustand";
import { usePlayerStore } from "./playerStore";

const initialGlobalState = {
  interfaceLanguage: "en",
};

export const useGlobalStore = create((set, get) => ({
  ...initialGlobalState,

  autoLogin: async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const storedToken = usePlayerStore.getState().authToken;

    const token = tokenFromUrl || storedToken;
    if (!token) return false;

    const success = await usePlayerStore.getState().logIn(token);

    if (tokenFromUrl) {
      window.history.replaceState({}, "", window.location.pathname);
    }

    return success;
  },

  // Interface language settings
  setInterfaceSelectedLanguage: (lang) => {
    set({ interfaceLanguage: lang });
    const updatedInterfaceLanguage = get().interfaceLanguage;
    console.log("Selected game language: ", updatedInterfaceLanguage);
  },
}));
