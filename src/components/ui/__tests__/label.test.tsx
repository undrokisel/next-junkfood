// __tests__/components/ui/label.test.tsx
import { render, screen } from '@testing-library/react';
import { Label } from '@/components/ui/label';

describe('Label Component', () => {
  it('рендерит label тег', () => {
    render(<Label>Текст метки</Label>);
    const label = screen.getByText(/текст метки/i);
    expect(label.tagName).toBe('LABEL');
  });

  it('применяет стандартные стили через cva', () => {
    render(<Label>Base styles</Label>);
    const label = screen.getByText(/base styles/i);
    expect(label).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
    );
  });

  it('принимает пользовательский className', () => {
    render(<Label className='custom-label'>Custom class</Label>);
    const label = screen.getByText(/custom class/i);
    expect(label).toHaveClass('custom-label');
  });

  it('поддерживает htmlFor для связывания с input', () => {
    render(
      <>
        <Label htmlFor='name-input'>Имя</Label>
        <input id='name-input' />
      </>
    );

    const label = screen.getByText(/имя/i);
    const input = screen.getByLabelText(/имя/i);

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('объединяет стандартные и пользовательские классы', () => {
    render(<Label className='bg-green-100 p-2'>Стиль и класс</Label>);
    const label = screen.getByText(/стиль и класс/i);
    expect(label).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-green-100 p-2'
    );
  });

  it('работает с disabled состоянием через peer', () => {
    render(
      <>
        <input id='disabled-input' disabled />
        <Label htmlFor='disabled-input' className='peer-disabled:opacity-70'>
          Метка (disabled)
        </Label>
      </>
    );

    const input = screen.getByLabelText(/метка/i);
    expect(input).toBeDisabled();
  });
});
