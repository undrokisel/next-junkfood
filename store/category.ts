// eslint-disable-next-line
import { create } from 'zustand';

interface Store {
  activeId: number;
  setActiveId: (activeId: number) => void;
}

export const useCategoryStore = create<Store>()((set) => ({
  activeId: 1,
  setActiveId: (activeId: number) => set({ activeId }),
}));
