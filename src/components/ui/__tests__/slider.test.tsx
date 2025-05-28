import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from '../slider'; // Убедитесь, что путь к вашему компоненту правильный

describe('Slider компонент', () => {
  test('обновляет значение при изменении пропса value', () => {
    const { rerender } = render(
      <Slider min={0} max={100} step={1} value={[20, 80]} />
    );

    // Проверяем начальные значения
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('80')).toBeInTheDocument();

    // Обновляем значение
    rerender(<Slider min={0} max={100} step={1} value={[30, 70]} />);

    // Проверяем, что значения обновились
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();
  });

  test('форматирует метки с помощью formatLabel', () => {
    const formatLabel = (value: any) => `Value: ${value}`;
    render(
      <Slider
        min={0}
        max={100}
        step={1}
        value={[20, 80]}
        formatLabel={formatLabel}
      />
    );

    // Проверяем, что метки отображаются с форматом
    expect(screen.getByText('Value: 20')).toBeInTheDocument();
    expect(screen.getByText('Value: 80')).toBeInTheDocument();
  });
});
