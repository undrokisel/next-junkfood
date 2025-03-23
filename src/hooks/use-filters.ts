import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';

interface RangePriceProps {
  priceTo: number;
  priceFrom: number;
}

// interface QueryFilters extends RangePriceProps {
//   ingredients: string;
//   sizes: string;
//   dought: string;
// }

export interface Filters {
  selectedIngredients: Set<string>;
  selectedSizes: Set<string>;
  selectedDought: Set<string>;
  priceRange: RangePriceProps;
}

interface FiltersReturnProps extends Filters {
  setPriceRange: (name: keyof RangePriceProps, value: number) => void;
  toggleDought: (key: string) => void;
  toggleSizes: (key: string) => void;
  toggleIngredients: (key: string) => void;
}

export const useFilters = (): FiltersReturnProps => {
  const searchParams = useSearchParams();
  // const searchParams = useSearchParams() as unknown as Map<keyof Filters, string>;

  //   Фильтр ингредиентов
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  );

  //   Фильтр размеров
  const [selectedSizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  );

  //   Фильтр теста
  const [selectedDought, { toggle: toggleDought }] = useSet(
    new Set<string>(
      searchParams.get('dought') ? searchParams.get('dought')?.split(',') : []
    )
  );

  //   Фильтр стоимости
  const [priceRange, setPriceRange] = useState<RangePriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || 0,
    priceTo: Number(searchParams.get('priceTo')) || 1000,
  });

  //   const { priceFrom, priceTo } = priceRange;

  const updateRangePrice = (name: keyof RangePriceProps, value: number) => {
    setPriceRange((prevState) => ({ ...prevState, [name]: value }));
  };

  //   const filters = {
  //     ...priceRange,
  //     sizes: Array.from(selectedSizes),
  //     dought: Array.from(selectedDought),
  //     ingredients: Array.from(selectedIngredients),
  //   };

  return useMemo(
    () => ({
      // filters,
      selectedSizes,
      selectedDought,
      selectedIngredients,
      priceRange,

      setPriceRange: updateRangePrice,
      toggleDought,
      toggleSizes,
      toggleIngredients,
    }),
    // eslint-disable-next-line
    [selectedSizes, selectedDought, selectedIngredients, priceRange]
  );
};
