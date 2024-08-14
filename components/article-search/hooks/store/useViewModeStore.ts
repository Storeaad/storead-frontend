import { create } from "zustand";

type ViewMode = "list" | "grid";

interface ViewModeStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useViewModeStore = create<ViewModeStore>((set) => ({
  viewMode: "list",
  setViewMode: (mode) => set({ viewMode: mode }),
}));
