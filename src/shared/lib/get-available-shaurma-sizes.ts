import { ProductVariant } from '@prisma/client';
import { Variant } from '@/components/shared/group-variants';
import { DoughType, shaurmaSizes } from '../constants/shaurma';

export const getAvailableShaurmaSizes = (
  type: DoughType,
  items: ProductVariant[]
): Variant[] => {
  const filteredShaurmasByType = items.filter(
    (item) => item.doughType === type
  );

  return shaurmaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredShaurmasByType.some(
      (shaurma) => Number(shaurma.size) === Number(item.value)
    ),
  }));
};
