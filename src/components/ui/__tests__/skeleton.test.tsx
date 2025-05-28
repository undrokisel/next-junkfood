import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../skeleton'; // Убедитесь, что путь к вашему компоненту правильный

describe('Skeleton компонент', () => {
  test('рендерит Skeleton с базовыми классами', () => {
    render(<Skeleton data-testid='skeleton' />);

    const skeletonDiv = screen.getByTestId('skeleton');

    // Проверяем, что элемент отрисовался
    expect(skeletonDiv).toBeInTheDocument();

    // Проверяем наличие базовых классов
    expect(skeletonDiv).toHaveClass('animate-pulse');
    expect(skeletonDiv).toHaveClass('rounded-md');
    expect(skeletonDiv).toHaveClass('bg-black/10');
  });

  test('применяет переданный className вместе с базовыми классами', () => {
    render(<Skeleton data-testid='skeleton' className='custom-class' />);

    const skeletonDiv = screen.getByTestId('skeleton');

    // Проверяем, что базовые классы присутствуют
    expect(skeletonDiv).toHaveClass('animate-pulse');
    expect(skeletonDiv).toHaveClass('rounded-md');

    // Проверяем, что пользовательский класс также применяется
    expect(skeletonDiv).toHaveClass('custom-class');
  });

  test('прокидывает дополнительные пропсы', () => {
    render(<Skeleton data-testid='skeleton' aria-label='loading' />);

    const skeletonDiv = screen.getByTestId('skeleton');

    // Проверяем, что атрибут aria-label передан
    expect(skeletonDiv).toHaveAttribute('aria-label', 'loading');
  });
});
