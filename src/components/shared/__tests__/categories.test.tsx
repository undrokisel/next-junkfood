import React from 'react';
import { render, screen } from '@testing-library/react';
import { Categories } from '../categories';

// Mock IntersectionObserver с полной типизацией
const mockIntersectionObserver = () => {
  window.IntersectionObserver = jest.fn(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
    takeRecords: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
  }));
};

// Mock window.matchMedia с addListener
beforeEach(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // <-- deprecated, но может использоваться
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

  mockIntersectionObserver();
});

const mockCategories = [
  { id: 1, name: 'electronics' },
  { id: 2, name: 'books' },
  { id: 3, name: 'clothes' },
  { id: 4, name: 'furniture' },
  { id: 5, name: 'toys' },
  { id: 6, name: 'food' },
  { id: 7, name: 'sports' },
];

describe('Categories Component', () => {
  test('рендерит кнопку "Ещё", если категорий больше maxBarLength', () => {
    render(<Categories categories={mockCategories} />);
    expect(screen.getByText('Ещё')).toBeInTheDocument();
  });

  test('ссылки имеют правильные href', () => {
    render(<Categories categories={mockCategories.slice(0, 2)} />);
    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveAttribute('href', '/#electronics');
    expect(links[1]).toHaveAttribute('href', '/#books');
  });

  test('первый символ названия категории заглавный', () => {
    render(<Categories categories={mockCategories.slice(0, 1)} />);
    const linkText = screen.getByText('Electronics');
    expect(linkText).toBeInTheDocument();
  });
});
