import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '../sheet'; // Убедитесь, что путь к вашему компоненту правильный

describe('Sheet компонент', () => {
  test('рендерит Sheet с заголовком и описанием', () => {
    render(
      <Sheet>
        <SheetTrigger>Открыть лист</SheetTrigger>
        <SheetContent>
          <SheetTitle>Заголовок листа</SheetTitle>
          <SheetDescription>Описание листа</SheetDescription>
        </SheetContent>
      </Sheet>
    );

    // Проверяем, что триггер отображается
    expect(screen.getByText('Открыть лист')).toBeInTheDocument();

    // Проверяем, что заголовок и описание не отображаются изначально
    expect(screen.queryByText('Заголовок листа')).not.toBeInTheDocument();
    expect(screen.queryByText('Описание листа')).not.toBeInTheDocument();
  });

  test('открывает Sheet при клике на триггер', () => {
    render(
      <Sheet>
        <SheetTrigger>Открыть лист</SheetTrigger>
        <SheetContent>
          <SheetTitle>Заголовок листа</SheetTitle>
          <SheetDescription>Описание листа</SheetDescription>
        </SheetContent>
      </Sheet>
    );

    // Кликаем на триггер
    fireEvent.click(screen.getByText('Открыть лист'));

    // Проверяем, что заголовок и описание отображаются
    expect(screen.getByText('Заголовок листа')).toBeInTheDocument();
    expect(screen.getByText('Описание листа')).toBeInTheDocument();
  });

  test('закрывает Sheet при клике на кнопку закрытия', () => {
    render(
      <Sheet>
        <SheetTrigger>Открыть лист</SheetTrigger>
        <SheetContent>
          <SheetClose>Закрыть</SheetClose>
          <SheetTitle>Заголовок листа</SheetTitle>
          <SheetDescription>Описание листа</SheetDescription>
        </SheetContent>
      </Sheet>
    );

    // Открываем лист
    fireEvent.click(screen.getByText('Открыть лист'));

    // Проверяем, что заголовок и описание отображаются
    expect(screen.getByText('Заголовок листа')).toBeInTheDocument();

    // Кликаем на кнопку закрытия
    fireEvent.click(screen.getByText('Закрыть'));

    // Проверяем, что заголовок и описание больше не отображаются
    expect(screen.queryByText('Заголовок листа')).not.toBeInTheDocument();
    expect(screen.queryByText('Описание листа')).not.toBeInTheDocument();
  });
});
