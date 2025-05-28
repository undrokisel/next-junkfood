import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChooseShaurmaForm } from '../choose-shaurma-form'; // заменить на правильный путь
import { getShaurmaDetails } from '@/shared/lib';
import { useShaurmaOptions } from '@/hooks';

// Типы из Prisma
type Ingredient = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

type ProductVariant = {
  id: number;
  price: number;
  size: number | null;
  doughType: number | null;
  productId: number;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

// Mock библиотечных модулей
jest.mock('@/hooks', () => ({
  useShaurmaOptions: jest.fn(),
}));

jest.mock('@/shared/lib', () => ({
  getShaurmaDetails: jest.fn(),
  arrangeImgUrl: (url: string) => url,
}));

const mockIngredients: Ingredient[] = [
  {
    id: 1,
    name: 'Сыр',
    imageUrl: '/cheese.png',
    price: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Огурцы',
    imageUrl: '/cucumber.png',
    price: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockVariants: ProductVariant[] = [
  {
    id: 1,
    price: 200,
    size: 1,
    doughType: 1,
    productId: 1,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    price: 220,
    size: 1,
    doughType: 2,
    productId: 1,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Подготовим моки для хука
const mockUseShaurmaOptions = (overrides = {}) => {
  (useShaurmaOptions as jest.Mock).mockReturnValue({
    type: 1,
    selectedIngredients: new Set<number>(),
    currentItemId: 1,
    setType: (val: number) =>
      mockUseShaurmaOptions({ ...overrides, type: val }),
    addIngredient: (id: number) =>
      mockUseShaurmaOptions({
        ...overrides,
        selectedIngredients: new Set([id]),
      }),
    ...overrides,
  });
};

// Подготовим мок для getShaurmaDetails
const mockGetShaurmaDetails = (price = 250, details = 'Тонкое тесто') => {
  (getShaurmaDetails as jest.Mock).mockReturnValue({
    totalPrice: price,
    textDetails: details,
  });
};

describe('ChooseShaurmaForm Component', () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    mockUseShaurmaOptions();
    mockGetShaurmaDetails();
  });

  test('рендерит название шаурмы и описание', () => {
    render(
      <ChooseShaurmaForm
        name='Классическая'
        description='С овощами и соусом'
        imageUrl='https://shaurma.jpg'
        ingredients={mockIngredients}
        variants={mockVariants}
        onSubmit={onSubmitMock}
      />
    );

    expect(screen.getByText('Классическая')).toBeInTheDocument();
    expect(screen.getByText('С овощами и соусом')).toBeInTheDocument();
  });

  test('рендерит ингредиенты как баджи', () => {
    render(
      <ChooseShaurmaForm
        name='Классическая'
        description='С овощами и соусом'
        imageUrl='https://shaurma.jpg'
        ingredients={mockIngredients}
        variants={mockVariants}
        onSubmit={onSubmitMock}
      />
    );

    mockIngredients.forEach((ingredient) => {
      expect(screen.getByText(ingredient.name)).toBeInTheDocument();
    });
  });

  test('показывает цену и вызывает onSubmit при клике', () => {
    mockGetShaurmaDetails(300, 'Тонкое тесто');
    mockUseShaurmaOptions();

    render(
      <ChooseShaurmaForm
        name='Классическая'
        description='С овощами и соусом'
        imageUrl='https://shaurma.jpg'
        ingredients={mockIngredients}
        variants={mockVariants}
        onSubmit={onSubmitMock}
      />
    );

    expect(screen.getByText('Добавить в корзину за 300 ₽')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Добавить в корзину за 300 ₽'));
    expect(onSubmitMock).toHaveBeenCalledWith(1, []);
  });

  test('добавляет ингредиент при клике по нему', () => {
    const addIngredientMock = jest.fn();
    mockUseShaurmaOptions({ addIngredient: addIngredientMock });

    render(
      <ChooseShaurmaForm
        name='Классическая'
        description='С овощами и соусом'
        imageUrl='https://shaurma.jpg'
        ingredients={mockIngredients}
        variants={mockVariants}
        onSubmit={onSubmitMock}
      />
    );

    fireEvent.click(screen.getByText('Сыр'));
    expect(addIngredientMock).toHaveBeenCalledWith(1);
  });
});
