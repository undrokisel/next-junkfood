import { useEffect } from 'react';
import QueryString from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.priceRange,
      ingredients: Array.from(filters.selectedIngredients),
      sizes: Array.from(filters.selectedSizes),
      dought: Array.from(filters.selectedDought),
    };

    const query = QueryString.stringify(params, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, { scroll: false });
  }, [filters, router]);
};
