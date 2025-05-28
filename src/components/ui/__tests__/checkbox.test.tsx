import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../checkbox';

describe('Checkbox Component', () => {
  test('рендерит не чекнутый бокс по умолчанию', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('переключает состояние чека  при клике', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');

    // первоначально нечекнутый
    expect(checkbox).not.toBeChecked();

    // клик-чек
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // клик-убрать состояние чекнутости
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('принимает кастомный класс', () => {
    const testClassName = 'custom-class';
    render(<Checkbox className={testClassName} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(testClassName);
  });

  test('неактивен, когда передан пропс disabled', () => {
    render(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('disabled:opacity-50');
  });

  test('корректно передает атрибут ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
