// __tests__/components/ui/command-dialog.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandShortcut,
} from '@/components/ui/command';

describe('CommandDialog Component', () => {
  it('рендерит CommandDialog с инпутом и списком', async () => {
    render(
      <CommandDialog open onOpenChange={() => {}}>
        <CommandInput placeholder='Поиск...' />
        <CommandList>
          <CommandEmpty>Не найдено</CommandEmpty>
          <CommandGroup heading='Пункты'>
            <CommandItem>Пункт 1</CommandItem>
            <CommandItem>Пункт 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );

    expect(screen.getByPlaceholderText(/поиск/i)).toBeInTheDocument();
    expect(screen.getByText(/пункт 1/i)).toBeInTheDocument();
    expect(screen.getByText(/пункт 2/i)).toBeInTheDocument();
  });

  it('фильтрует пункты через CommandInput', async () => {
    render(
      <CommandDialog open onOpenChange={() => {}}>
        <CommandInput data-testid='input' placeholder='Поиск...' />
        <CommandList>
          <CommandEmpty>Не найдено</CommandEmpty>
          <CommandGroup heading='Пункты'>
            <CommandItem value='пункт один'>Пункт 1</CommandItem>
            <CommandItem value='пункт два'>Пункт 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    await userEvent.type(input, 'пункт один');

    expect(screen.getByText(/пункт 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/пункт 2/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/не найдено/i)).not.toBeInTheDocument();
  });

  it('отображает "Не найдено", если ничего не совпадает', async () => {
    render(
      <CommandDialog open onOpenChange={() => {}}>
        <CommandInput data-testid='input' placeholder='Поиск...' />
        <CommandList>
          <CommandEmpty>Не найдено</CommandEmpty>
          <CommandGroup heading='Пункты'>
            <CommandItem>Пункт 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    await userEvent.type(input, 'никто не найдёт это');
    expect(screen.getByText(/не найдено/i)).toBeInTheDocument();
  });

  it('вызывает onSelect при выборе пункта', async () => {
    const onSelect = jest.fn();

    render(
      <CommandDialog open onOpenChange={() => {}}>
        <CommandInput placeholder='Поиск...' />
        <CommandList>
          <CommandGroup heading='Пункты'>
            <CommandItem onSelect={onSelect}>Пункт 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );

    const item = screen.getByText(/пункт 1/i);
    await userEvent.click(item);

    expect(onSelect).toHaveBeenCalledWith('Пункт 1');
  });

  it('принимает className в CommandList', async () => {
    render(
      <CommandDialog open onOpenChange={() => {}}>
        <CommandList className='custom-list'>
          <CommandGroup heading='Пункты'>
            <CommandItem>Пункт 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );

    const list = screen.getByRole('listbox');
    expect(list).toHaveClass('custom-list');
  });

  it('не отображает содержимое, если open={false}', () => {
    render(
      <CommandDialog open={false} onOpenChange={() => {}}>
        <CommandInput placeholder='Поиск...' />
        <CommandList>
          <CommandGroup heading='Пункты'>
            <CommandItem>Пункт 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );

    expect(screen.queryByPlaceholderText(/поиск/i)).not.toBeInTheDocument();
  });

  it('скрывает диалог при нажатии Escape', async () => {
    const onOpenChange = jest.fn();

    render(
      <CommandDialog open onOpenChange={onOpenChange}>
        <CommandInput placeholder='Поиск...' />
        <CommandList>
          <CommandGroup heading='Пункты'>
            <CommandItem>Пункт 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );

    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe('Command Subcomponents', () => {
  it('рендерит CommandShortcut с нужным классом', () => {
    render(<CommandShortcut className='shortcut'>Ctrl+Alt</CommandShortcut>);
    const shortcut = screen.getByText(/ctrl\+alt/i);
    expect(shortcut).toHaveClass(
      'ml-auto text-xs tracking-widest text-muted-foreground shortcut'
    );
  });

  it('рендерит CommandEmpty, когда нет совпадений', async () => {
    render(
      <CommandDialog open onOpenChange={() => {}}>
        <CommandInput data-testid='input' />
        <CommandList>
          <CommandEmpty>Ничего не найдено</CommandEmpty>
          <CommandGroup heading='Пункты'>
            <CommandItem value='test'>Пункт</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    );

    const input = screen.getByTestId('input') as HTMLInputElement;
    await userEvent.type(input, 'ничего не найдено');

    expect(screen.getByText(/ничего не найдено/i)).toBeInTheDocument();
  });
});
