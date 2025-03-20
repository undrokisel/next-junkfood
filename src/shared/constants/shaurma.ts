export const mapShaurmaSize = {
  1: 'Мини',
  2: 'Стандарт',
  3: 'Богатырская',
} as const;

export const mapDoughType = {
  1: 'Традиционое',
  2: 'Сырное',
  3: 'Томатное',
} as const;

export const shaurmaSizes = Object.entries(mapShaurmaSize).map(
  ([value, name]) => ({
    name,
    value,
  })
);

export const doughTypes = Object.entries(mapDoughType).map(([value, name]) => ({
  name,
  value,
}));

export type ShaurmaSize = keyof typeof mapShaurmaSize;
export type DoughType = keyof typeof mapDoughType;
