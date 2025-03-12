import { create } from "zustand";

interface LoginModalStore {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));