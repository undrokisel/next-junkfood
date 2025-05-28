// __tests__/shared/ui/badge/badge.test.tsx
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge', () => {
  it('рендерит текст внутри badge', () => {
    render(<Badge>Новый</Badge>);
    expect(screen.getByText(/новый/i)).toBeInTheDocument();
  });

  it('принимает дополнительные атрибуты (например, title)', () => {
    render(<Badge title='tooltip'>With Title</Badge>);
    const badge = screen.getByTitle('tooltip');
    expect(badge).toHaveAttribute('title', 'tooltip');
  });
});
