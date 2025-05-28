import React from 'react';
import { render, screen } from '@testing-library/react';
import { Select, SelectTrigger, SelectContent, SelectItem } from '../select'; // Убедитесь, что путь к вашему компоненту правильный

describe('Select компонент', () => {
  test('рендерит SelectTrigger с текстом', () => {
    render(
      <Select>
        <SelectTrigger>Выберите опцию</SelectTrigger>
        <SelectContent>
          <SelectItem value='option1'>Опция 1</SelectItem>
          <SelectItem value='option2'>Опция 2</SelectItem>
        </SelectContent>
      </Select>
    );

    // Проверяем, что текст триггера отображается
    expect(screen.getByText('Выберите опцию')).toBeInTheDocument();
  });
});
