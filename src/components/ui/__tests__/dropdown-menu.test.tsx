// __tests__/components/ui/dropdown-menu.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

describe('DropdownMenu Component', () => {
  it('рендерит DropdownMenuTrigger', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Открыть меню</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Пункт 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText(/открыть меню/i)).toBeInTheDocument();
  });

  it('открывает меню при клике на Trigger', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Открыть меню</DropdownMenuTrigger>
        <DropdownMenuContent data-testid='menu'>
          <DropdownMenuItem>Пункт 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText(/открыть меню/i);
    await userEvent.click(trigger);

    expect(screen.getByTestId('menu')).toBeInTheDocument();
  });

  it('вызывает onClick при выборе пункта меню', async () => {
    const onItemClick = jest.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Открыть меню</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onItemClick}>Пункт 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText(/открыть меню/i);
    await userEvent.click(trigger);

    const item = screen.getByText(/пункт 1/i);
    await userEvent.click(item);

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  it('рендерит DropdownMenuCheckboxItem и меняет состояние', async () => {
    const onCheckedChange = jest.fn();

    render(
      <DropdownMenu open modal={false}>
        <DropdownMenuTrigger>Открыть меню</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem onCheckedChange={onCheckedChange} checked>
            Выбранный пункт
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText(/открыть меню/i);
    await userEvent.click(trigger);

    const checkboxItem = screen.getByText(/выбранный пункт/i);
    await userEvent.click(checkboxItem);

    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it('принимает пользовательский className в DropdownMenuContent', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Открыть меню</DropdownMenuTrigger>
        <DropdownMenuContent className='custom-menu'>
          <DropdownMenuItem>Пункт</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText(/открыть меню/i);
    await userEvent.click(trigger);

    const content = screen.getByRole('menu');
    expect(content).toHaveClass('custom-menu');
  });

  it('рендерит DropdownMenuLabel с inset', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Открыть меню</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel inset>Скрытый заголовок</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText(/открыть меню/i);
    await userEvent.click(trigger);

    const label = screen.getByText(/скрытый заголовок/i);
    expect(label).toHaveClass('pl-8');
  });

  it('рендерит DropdownMenuSeparator как разделитель', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Открыть меню</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Пункт 1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Пункт 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText(/открыть меню/i);
    await userEvent.click(trigger);

    const separator = screen.getByRole('separator');
    expect(separator).toHaveClass('h-px bg-muted -mx-1 my-1');
  });

  it('рендерит DropdownMenuShortcut с правильным стилем', async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Открыть меню</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Отправить
            <DropdownMenuShortcut className='shortcut'>
              Ctrl+S
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const trigger = screen.getByText(/открыть меню/i);
    await userEvent.click(trigger);

    const shortcut = screen.getByText(/ctrl\+s/i);
    expect(shortcut).toHaveClass(
      'ml-auto text-xs tracking-widest opacity-60 shortcut'
    );
  });
});
