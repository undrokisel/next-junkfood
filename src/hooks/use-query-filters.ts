import { useEffect, useRef } from 'react';
import QueryString from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
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
      // eslint-disable-next-line
    }

    isMounted.current = true;
    // eslint-disable-next-line
  }, [filters]);
};
