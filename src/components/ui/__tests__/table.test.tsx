import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '../table'; // Убедитесь, что путь к вашему компоненту правильный

describe('Table компонент', () => {
  test('рендерит Table с заголовком, телом и ячейками', () => {
    render(
      <Table>
        <TableCaption>Таблица данных</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Заголовок 1</TableHead>
            <TableHead>Заголовок 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ячейка 1</TableCell>
            <TableCell>Ячейка 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ячейка 3</TableCell>
            <TableCell>Ячейка 4</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Итого</TableCell>
            <TableCell>4</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    // Проверяем, что заголовок таблицы отображается
    expect(screen.getByText('Таблица данных')).toBeInTheDocument();

    // Проверяем, что заголовки отображаются
    expect(screen.getByText('Заголовок 1')).toBeInTheDocument();
    expect(screen.getByText('Заголовок 2')).toBeInTheDocument();

    // Проверяем, что ячейки отображаются
    expect(screen.getByText('Ячейка 1')).toBeInTheDocument();
    expect(screen.getByText('Ячейка 2')).toBeInTheDocument();
    expect(screen.getByText('Ячейка 3')).toBeInTheDocument();
    expect(screen.getByText('Ячейка 4')).toBeInTheDocument();

    // Проверяем, что ячейка итога отображается
    expect(screen.getByText('Итого')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  test('применяет классы к Table и его подкомпонентам', () => {
    render(
      <Table className='custom-table'>
        <TableHeader>
          <TableRow>
            <TableHead className='custom-head'>Заголовок 1</TableHead>
            <TableHead>Заголовок 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className='custom-cell'>Ячейка 1</TableCell>
            <TableCell>Ячейка 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    // Проверяем, что классы применяются
    const table = screen.getByRole('table');
    expect(table).toHaveClass('custom-table');

    const header = screen.getByText('Заголовок 1').closest('th');
    expect(header).toHaveClass('custom-head');

    const cell = screen.getByText('Ячейка 1').closest('td');
    expect(cell).toHaveClass('custom-cell');
  });
});
