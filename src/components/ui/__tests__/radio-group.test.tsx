import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup, RadioGroupItem } from '../radio-group'; // Убедитесь, что путь к вашему компоненту правильный

describe('RadioGroup компонент', () => {
  test('выбор RadioGroupItem обновляет состояние RadioGroup', () => {
    render(
      <RadioGroup defaultValue='option1'>
        <RadioGroupItem value='option1'>Опция 1</RadioGroupItem>
        <RadioGroupItem value='option2'>Опция 2</RadioGroupItem>
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');

    // В начале option1 выбрана (data-state="checked" / aria-checked=true)
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    expect(radios[1]).toHaveAttribute('aria-checked', 'false');

    // Кликаем на option2
    fireEvent.click(radios[1]);

    // Теперь option2 выбрана, option1 нет
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
  });

  test('рендерит RadioGroupItem с классом', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value='option1' className='custom-class'>
          Опция 1
        </RadioGroupItem>
      </RadioGroup>
    );

    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveClass('custom-class');
  });
});
