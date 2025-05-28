// __tests__/shared/ui/card.test.tsx
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card Component', () => {
  it('рендерит Card с правильным классом', () => {
    render(<Card data-testid='card'>Содержимое</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('rounded-lg border bg-card shadow-sm');
  });

  it('принимает пользовательский className в Card', () => {
    render(
      <Card className='custom-class' data-testid='card'>
        Содержимое
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('рендерит CardHeader с нужными классами', () => {
    render(<CardHeader data-testid='header'>Контент</CardHeader>);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('flex flex-col space-y-1.5 p-6');
  });

  it('рендерит CardTitle и применяет классы', () => {
    render(<CardTitle>Заголовок</CardTitle>);
    const title = screen.getByText(/заголовок/i);
    expect(title).toHaveClass('text-2xl font-semibold tracking-tight');
  });

  it('рендерит CardDescription с muted-foreground', () => {
    render(<CardDescription>Описание</CardDescription>);
    const description = screen.getByText(/описание/i);
    expect(description).toHaveClass('text-sm text-muted-foreground');
  });

  it('рендерит CardContent с pt-0', () => {
    render(<CardContent data-testid='content'>Тело</CardContent>);
    const content = screen.getByTestId('content');
    expect(content).toHaveClass('p-6 pt-0');
  });

  it('рендерит CardFooter с классом flex', () => {
    render(<CardFooter data-testid='footer'>Нижняя часть</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex items-center p-6 pt-0');
  });

  it('полная структура Card рендерится корректно', () => {
    render(
      <Card data-testid='card'>
        <CardHeader>
          <CardTitle data-testid='title'>Заголовок</CardTitle>
          <CardDescription data-testid='description'>Описание</CardDescription>
        </CardHeader>
        <CardContent data-testid='content'>Основное содержимое</CardContent>
        <CardFooter data-testid='footer'>Нижняя панель</CardFooter>
      </Card>
    );

    // Проверяем, что все части на месте
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('description')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();

    // Проверяем текст
    expect(screen.getByText(/заголовок/i)).toBeInTheDocument();
    expect(screen.getByText(/описание/i)).toBeInTheDocument();
    expect(screen.getByText(/основное содержимое/i)).toBeInTheDocument();
    expect(screen.getByText(/нижняя панель/i)).toBeInTheDocument();
  });
});
