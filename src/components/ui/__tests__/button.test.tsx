// __tests__/components/ui/button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('рендерит текст внутри кнопки', () => {
    render(<Button>Нажми меня</Button>);
    expect(screen.getByText(/Нажми меня/i)).toBeInTheDocument();
  });

  it('применяет variant "destructive" к кнопке', () => {
    render(<Button variant='destructive'>Кнопка</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive text-destructive-foreground');
  });

  it('применяет размер "lg"', () => {
    render(<Button size='lg'>Кнопка</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-11 rounded-md px-8');
  });

  it('не отображает children при loading={true}', () => {
    render(<Button loading>Загрузка</Button>);
    expect(screen.queryByText(/Загрузка/i)).not.toBeInTheDocument();
  });

  it('поддерживает asChild, рендерит span вместо button', () => {
    render(
      <Button asChild>
        <span>Custom Element</span>
      </Button>
    );
    const span = screen.getByText('Custom Element');
    expect(span.tagName).toBe('SPAN');
  });
});
