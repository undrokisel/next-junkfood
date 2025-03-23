import React from 'react';

import { useSet } from 'react-use';
import { DoughType, ShaurmaSize } from '@/shared/constants/shaurma';
import { getAvailableShaurmaSizes } from '@/shared/lib';
import { ProductVariant } from '@prisma/client';
import { Variant } from '../components/shared/group-variants';

interface ReturnProps {
  size: ShaurmaSize;
  type: DoughType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;

  setSize: (size: ShaurmaSize) => void;
  setType: (size: DoughType) => void;
  addIngredient: (id: number) => void;
}

export const useShaurmaOptions = (items: ProductVariant[]): ReturnProps => {
  const [size, setSize] = React.useState<ShaurmaSize>(2);
  const [type, setType] = React.useState<DoughType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailableShaurmaSizes(type, items);

  const currentItemId = items.find(
    (item) => item.doughType === type && item.size === size
  )?.id;

  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize)
      setSize(Number(availableSize.value) as ShaurmaSize);
    // eslint-disable-next-line
  }, [type]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
