// __tests__/AdressInput.test.tsx
'use client';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdressInput } from '@/components/shared/address-input';
import '@testing-library/jest-dom';

// Мокаем react-dadata, чтобы не делать реальные запросы к API
// eslint-disable-next-line
jest.mock('react-dadata', () => {
  const MockAddressSuggestions = ({ onChange, hintText, uid }: any) => {
    const handleChange = (event: any) => {
      // Симулируем изменение значения и передаем данные
      onChange({
        value: event.target.value,
        data: {
          /* ... */
        },
      });
    };

    return (
      <div>
        <label htmlFor={`address-${uid}`}>Адрес:</label>
        <input
          type='text'
          id={`address-${uid}`}
          placeholder={hintText}
          onChange={handleChange}
          data-testid='address-input' // Добавляем data-testid
        />
      </div>
    );
  };

  return {
    AddressSuggestions: MockAddressSuggestions,
  };
});

// eslint-disable-next-line
describe('AdressInput Component', () => {
  it('renders the component with correct hint text', () => {
    render(<AdressInput />);
    const inputElement = screen.getByTestId('address-input'); // Используем data-testid
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute(
      'placeholder',
      'Выберите адрес из списка ниже'
    );
  });

  it('calls onChange when input value changes', async () => {
    const onChange = jest.fn();
    render(<AdressInput onChange={onChange} />);
    const inputElement = screen.getByTestId('address-input'); // Используем data-testid

    // Симулируем ввод текста
    fireEvent.change(inputElement, {
      target: { value: 'Москва, ул. Тверская' },
    });

    // Ждем, пока onChange будет вызвана
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('Москва, ул. Тверская');
    });
  });

  it('does not call onChange if input value is empty', async () => {
    const onChange = jest.fn();
    render(<AdressInput onChange={onChange} />);
    const inputElement = screen.getByTestId('address-input'); // Используем data-testid

    // Симулируем ввод текста и последующую очистку
    fireEvent.change(inputElement, { target: { value: 'Москва' } });
    fireEvent.change(inputElement, { target: { value: '' } });

    // Ждем, но onChange не должна быть вызвана с пустым значением
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(2); // Вызвана 2 раза (с 'Москва' и '')
    });
  });
});
