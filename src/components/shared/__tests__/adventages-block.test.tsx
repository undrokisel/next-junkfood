// __tests__/AdventagesBlock.test.tsx
'use client';

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdventagesBlock } from '@/components/shared/adventages-block';
import '@testing-library/jest-dom';

// Мокаем необходимые зависимости и утилиты
jest.mock('../animation/FadeLeft', () => ({
  FadeLeft: ({ children }: any) => (
    <div data-testid='fade-left'>{children}</div>
  ),
}));

jest.mock('../animation/FadeRight', () => ({
  FadeRight: ({ children }: any) => (
    <div data-testid='fade-right'>{children}</div>
  ),
}));

jest.mock('../animation/FadeVisible', () => ({
  FadeVisible: ({ children }: any) => (
    <div data-testid='fade-visible'>{children}</div>
  ),
}));

jest.mock('../advantage-card', () => ({
  AdvantageCard: ({ adventage }: any) => (
    <div data-testid='advantage-card'>
      {adventage.title} - {adventage.text}
    </div>
  ),
}));

jest.mock('@/shared/lib/utils', () => ({
  cn: (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' '),
}));

describe('AdventagesBlock Component', () => {
  const mockAdventages = [
    { imgUrl: 'img1.jpg', title: 'Title 1', text: 'Text 1' },
    { imgUrl: 'img2.jpg', title: 'Title 2', text: 'Text 2' },
    { imgUrl: 'img3.jpg', title: 'Title 3', text: 'Text 3' },
    { imgUrl: 'img4.jpg', title: 'Title 4', text: 'Text 4' },
  ];

  it('applies correct animations based on index', () => {
    render(<AdventagesBlock adventages={mockAdventages} />);

    const fadeLeftElement = screen.getByTestId('fade-left');
    const fadeRightElement = screen.getByTestId('fade-right');
    const fadeVisibleElements = screen.getAllByTestId('fade-visible');

    // Проверяем, что FadeLeft применен к первому элементу
    expect(fadeLeftElement).toBeInTheDocument();
    expect(fadeLeftElement).toContainElement(
      screen.getByText('Title 1 - Text 1')
    );

    // Проверяем, что FadeRight применен к третьему элементу
    expect(fadeRightElement).toBeInTheDocument();
    expect(fadeRightElement).toContainElement(
      screen.getByText('Title 3 - Text 3')
    );

    // Проверяем, что FadeVisible применен ко второму и четвертому элементам
    expect(fadeVisibleElements).toHaveLength(2);
    expect(fadeVisibleElements[0]).toContainElement(
      screen.getByText('Title 2 - Text 2')
    );
    expect(fadeVisibleElements[1]).toContainElement(
      screen.getByText('Title 4 - Text 4')
    );
  });
});
