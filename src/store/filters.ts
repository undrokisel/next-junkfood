import { create } from 'zustand';

interface FiltersState {
  priceFrom: number;
  priceTo: number;
  setPriceFrom: (priceFrom: number) => void;
  setPriceTo: (priceTo: number) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
  priceFrom: 0,
  priceTo: 1000,

  setPriceFrom: (priceFrom: number) => set({ priceFrom }),
  setPriceTo: (priceTo: number) => set({ priceTo }),
}));
