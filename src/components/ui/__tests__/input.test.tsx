// __tests__/shared/ui/input.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('рендерит элемент input', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('принимает className и применяет его к инпуту', () => {
    render(<Input className='custom-input' placeholder='Тест' />);
    const input = screen.getByPlaceholderText(/тест/i);
    expect(input).toHaveClass('custom-input');
  });

  it('рендерит placeholder', () => {
    render(<Input placeholder='Введите имя' />);
    const input = screen.getByPlaceholderText(/введите имя/i);
    expect(input).toBeInTheDocument();
  });

  it('поддерживает type="password"', () => {
    render(<Input type='password' data-testid='password' />);
    const input = screen.getByTestId('password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('поддерживает type="email"', () => {
    render(<Input type='email' data-testid='email' />);
    const input = screen.getByTestId('email');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('делает disabled при передаче соответствующего пропса', () => {
    render(<Input disabled data-testid='disabled-input' />);
    const input = screen.getByTestId('disabled-input');
    expect(input).toBeDisabled();
  });

  it('отображает значение value', () => {
    render(
      <Input defaultValue='Значение по умолчанию' data-testid='default-value' />
    );
    const input = screen.getByTestId('default-value');
    expect(input).toHaveValue('Значение по умолчанию');
  });

  it('обновляется при изменении значения', async () => {
    const onChange = jest.fn();

    render(<Input onChange={onChange} data-testid='change-input' />);

    const input = screen.getByTestId('change-input');

    await userEvent.type(input, 'a');

    expect(onChange).toHaveBeenCalled();
  });
});
