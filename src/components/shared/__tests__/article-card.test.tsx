// __tests__/ArticleCard.test.tsx
'use client';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleCard from '@/components/shared/article-card';
import '@testing-library/jest-dom';
import { ArticleType, Blog } from '@prisma/client';

// Мокаем необходимые зависимости и утилиты
jest.mock('next/image', () => {
  const MockImage = (props: any) =>
    props.src ? (
      <img {...props} data-testid='article-image' />
    ) : (
      <div data-testid='image-placeholder'></div>
    );
  return MockImage;
});

jest.mock('next/link', () => {
  const MockLink = (props: any) => (
    <a href={props.href} data-testid='article-link'>
      {props.children}
    </a>
  );
  return MockLink;
});

jest.mock('../animation/FadeVisible', () => ({
  FadeVisible: ({ children }: any) => (
    <div data-testid='fade-visible'>{children}</div>
  ),
}));

jest.mock('@/shared/lib/arrangeImgUrl', () => ({
  arrangeImgUrl: (url: string) => `mocked_${url}`,
}));

jest.mock('@/shared/lib/utils', () => ({
  cn: (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' '),
}));

describe('ArticleCard Component', () => {
  const mockArticle = {
    id: 123,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-05'),
    imgSrc: 'test-image.jpg',
    readingTime: '5',
    title: 'Test Article Title',
    type: ArticleType.KITCHEN,
    slug: '',
    description: '',
    paragraphs: [],
  };

  it('renders the component with correct data', () => {
    render(<ArticleCard art={mockArticle} />);

    // Проверяем наличие основных элементов
    const articleLink = screen.getByTestId('article-link');
    const articleImage = screen.getByTestId('article-image');
    const articleType = screen.getByText('Кухня');
    const articleTitle = screen.getByText('Test Article Title');
    const articleDate = screen.getByText('01.01.2024');
    const articleReadingTime = screen.getByText('Время чтения: 5 мин.');

    expect(articleLink).toBeInTheDocument();
    expect(articleLink).toHaveAttribute('href', '/blog/123');
    expect(articleImage).toBeInTheDocument();
    expect(articleImage).toHaveAttribute('src', 'mocked_test-image.jpg');
    expect(articleImage).toHaveAttribute('alt', 'Test Article Title');
    expect(articleType).toBeInTheDocument();
    expect(articleTitle).toBeInTheDocument();
    expect(articleDate).toBeInTheDocument();
    expect(articleReadingTime).toBeInTheDocument();
  });

  it('applies correct CSS classes to the container', () => {
    render(<ArticleCard art={mockArticle} />);
    const articleLink = screen.getByTestId('article-link');
    const articleDiv = articleLink.firstChild;

    expect(articleDiv).toHaveClass('flex');
    expect(articleDiv).toHaveClass('flex-col');
    expect(articleDiv).toHaveClass('gap-[10px]');
    expect(articleDiv).toHaveClass('max-w-[413px]');
    expect(articleDiv).toHaveClass('sm:rounded-[40px]');
    expect(articleDiv).toHaveClass('rounded-[30px]');
    expect(articleDiv).toHaveClass('p-1');
    expect(articleDiv).toHaveClass('pb-8');
    expect(articleDiv).toHaveClass('bg-green-100');
    expect(articleDiv).toHaveClass('transition-all');
    expect(articleDiv).toHaveClass('duration-300');
    expect(articleDiv).toHaveClass('hover:scale-105');
    expect(articleDiv).toHaveClass('hover:shadow-lg');
    expect(articleDiv).toHaveClass('focus:scale-105');
    expect(articleDiv).toHaveClass('focus:shadow-lg');
    expect(articleDiv).toHaveClass('hover:bg-amber-100');
    expect(articleDiv).toHaveClass('focus:bg-amber-100');
  });

  it('renders with FadeVisible animation', () => {
    render(<ArticleCard art={mockArticle} />);
    const fadeVisibleElement = screen.getByTestId('fade-visible');
    expect(fadeVisibleElement).toBeInTheDocument();
  });
});
