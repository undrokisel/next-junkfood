import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';

describe('Компонент Popover', () => {
  // Базовый тест рендеринга
  it('корректно рендерится с триггером и контентом', () => {
    render(
      <Popover>
        <PopoverTrigger>Открыть попап</PopoverTrigger>
        <PopoverContent>Тестовый контент попапа</PopoverContent>
      </Popover>
    );

    expect(screen.getByText('Открыть попап')).toBeInTheDocument();
    // Контент по умолчанию не должен быть виден
    expect(
      screen.queryByText('Тестовый контент попапа')
    ).not.toBeInTheDocument();
  });

  // Тест взаимодействия
  it('отображает контент при клике на триггер', async () => {
    render(
      <Popover>
        <PopoverTrigger>Открыть попап</PopoverTrigger>
        <PopoverContent>Тестовый контент попапа</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText('Открыть попап');
    fireEvent.click(trigger);

    // После клика контент должен появиться
    expect(
      await screen.findByText('Тестовый контент попапа')
    ).toBeInTheDocument();
  });

  // Тест пропсов
  describe('Пропсы PopoverContent', () => {
    it('применяет переданный className', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger>Триггер</PopoverTrigger>
          <PopoverContent className='custom-class'>Контент</PopoverContent>
        </Popover>
      );

      const content = screen.getByText('Контент');
      expect(content).toHaveClass('custom-class');
    });

    it('применяет кастомное выравнивание (align)', () => {
      render(
        <Popover defaultOpen>
          <PopoverTrigger>Триггер</PopoverTrigger>
          <PopoverContent align='start'>Контент</PopoverContent>
        </Popover>
      );

      const content = screen.getByText('Контент');
      expect(content).toHaveAttribute('data-align', 'start');
    });
  });

  // Тест доступности
  it('соответствует требованиям доступности', () => {
    render(
      <Popover>
        <PopoverTrigger aria-label='Открыть меню'>Триггер</PopoverTrigger>
        <PopoverContent>Контент</PopoverContent>
      </Popover>
    );

    expect(screen.getByLabelText('Открыть меню')).toBeInTheDocument();
  });
});
