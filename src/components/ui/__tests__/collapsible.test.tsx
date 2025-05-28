// __tests__/components/ui/collapsible.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';

describe('Collapsible Component', () => {
  it('рендерит Collapsible в открытом состоянии', () => {
    render(
      <Collapsible open>
        <CollapsibleTrigger>Показать</CollapsibleTrigger>
        <CollapsibleContent>Скрытый текст</CollapsibleContent>
      </Collapsible>
    );

    const content = screen.getByText(/скрытый текст/i).parentElement;
    expect(content).not.toHaveAttribute('data-state', 'closed');
  });

  it('изменяет состояние при клике на CollapsibleTrigger', async () => {
    const onOpenChange = jest.fn();

    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Кликни меня</CollapsibleTrigger>
        <CollapsibleContent>Контент</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByText(/кликни меня/i);
    fireEvent.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('принимает className в CollapsibleTrigger', () => {
    render(
      <Collapsible>
        <CollapsibleTrigger className='custom-trigger'>
          Триггер
        </CollapsibleTrigger>
        <CollapsibleContent>Контент</CollapsibleContent>
      </Collapsible>
    );

    const trigger = screen.getByText(/триггер/i);
    expect(trigger).toHaveClass('custom-trigger');
  });
});
