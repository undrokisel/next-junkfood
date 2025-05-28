// __tests__/shared/ui/textarea.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea Component', () => {
  it('принимает className и применяет его к textarea', () => {
    render(
      <Textarea className='custom-textarea' placeholder='Введите текст...' />
    );
    const textarea = screen.getByPlaceholderText(/введите текст/i);
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('рендерит placeholder', () => {
    render(<Textarea placeholder='Введите сообщение' />);
    const textarea = screen.getByPlaceholderText(/введите сообщение/i);
    expect(textarea).toBeInTheDocument();
  });

  it('поддерживает rows и cols', () => {
    render(<Textarea rows={5} cols={20} data-testid='sized-textarea' />);
    const textarea = screen.getByTestId('sized-textarea');

    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '20');
  });

  it('делает disabled при передаче соответствующего пропса', () => {
    render(<Textarea disabled data-testid='disabled-textarea' />);
    const textarea = screen.getByTestId('disabled-textarea');
    expect(textarea).toBeDisabled();
  });

  it('позволяет вводить текст', async () => {
    const onChangeMock = jest.fn();

    render(<Textarea onChange={onChangeMock} data-testid='text-input' />);

    const textarea = screen.getByTestId('text-input') as HTMLTextAreaElement;

    await userEvent.type(textarea, 'Привет, это тестовый текст');

    expect(textarea).toHaveValue('Привет, это тестовый текст');
    expect(onChangeMock).toHaveBeenCalled();
  });

  it('поддерживает defaultValue', () => {
    render(
      <Textarea
        defaultValue='Значение по умолчанию'
        data-testid='default-value'
      />
    );
    const textarea = screen.getByTestId('default-value');
    expect(textarea).toHaveValue('Значение по умолчанию');
  });

  it('не позволяет вводить текст, если disabled', async () => {
    const onChangeMock = jest.fn();

    render(
      <Textarea
        disabled
        defaultValue='Неизменный текст'
        data-testid='locked-textarea'
      />
    );

    const textarea = screen.getByTestId(
      'locked-textarea'
    ) as HTMLTextAreaElement;

    await userEvent.type(textarea, 'a');

    expect(textarea).toHaveValue('Неизменный текст');
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it('работает с autoFocus', () => {
    render(<Textarea autoFocus data-testid='autofocus-textarea' />);
    const textarea = screen.getByTestId('autofocus-textarea');
    expect(textarea).toHaveFocus();
  });
});
