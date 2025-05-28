// __tests__/AdvantageCard.test.tsx
'use client';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdvantageCard } from '@/components/shared/advantage-card';
import '@testing-library/jest-dom';

// Мокаем необходимые зависимости и утилиты
jest.mock('next/image', () => {
  const MockImage = (props: any) => <img {...props} />;
  return MockImage;
});

jest.mock('@/shared/lib/arrangeImgUrl', () => ({
  arrangeImgUrl: (url: string) => `mocked_${url}`,
}));

jest.mock('@/shared/lib/utils', () => ({
  cn: (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' '),
}));

describe('AdvantageCard Component', () => {
  const mockAdvantage = {
    imgUrl: 'test-image.jpg',
    title: 'Test Title',
    text: 'Test Description',
  };

  it('renders the component with correct data', () => {
    render(<AdvantageCard adventage={mockAdvantage} />);

    // Проверяем наличие элементов и их содержимое
    const titleElement = screen.getByText('Test Title');
    const textElement = screen.getByText('Test Description');
    const imageElement = screen.getByAltText('adventages card');

    expect(titleElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'mocked_test-image.jpg');
  });

  it('renders image with correct props', () => {
    render(<AdvantageCard adventage={mockAdvantage} />);
    const imageElement = screen.getByAltText('adventages card');

    expect(imageElement).toHaveAttribute('width', '300');
    expect(imageElement).toHaveAttribute('height', '300');
    expect(imageElement).toHaveClass('absolute');
    expect(imageElement).toHaveClass('inset-0');
    expect(imageElement).toHaveClass('object-cover');
    expect(imageElement).toHaveClass('h-full');
    expect(imageElement).toHaveClass('w-full');
    expect(imageElement).toHaveClass('z-0');
  });
});
