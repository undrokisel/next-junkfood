// __tests__/components/ui/drawer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitForElementToBeRemoved } from '@testing-library/react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

describe('Drawer Component', () => {
  it('открывает Drawer при клике на DrawerTrigger', async () => {
    render(
      <Drawer>
        <DrawerTrigger>Открыть</DrawerTrigger>
        <DrawerContent data-testid='content'>
          <DrawerTitle style={{ display: 'none' }}>Заголовок</DrawerTitle>
          <DrawerDescription style={{ display: 'none' }}>
            Описание
          </DrawerDescription>
          <p>Основной контент</p>
          <DrawerClose>Закрыть</DrawerClose>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByText(/открыть/i);
    await userEvent.click(trigger);

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('закрывает Drawer при клике на Close', async () => {
    render(
      <Drawer>
        <DrawerTrigger>Открыть</DrawerTrigger>
        <DrawerContent data-testid='content'>
          <DrawerTitle style={{ display: 'none' }}>Заголовок</DrawerTitle>
          <DrawerDescription style={{ display: 'none' }}>
            Описание
          </DrawerDescription>
          <p>Контент</p>
          <DrawerClose>Закрыть</DrawerClose>
        </DrawerContent>
      </Drawer>
    );

    const trigger = screen.getByText(/открыть/i);
    await userEvent.click(trigger);
    const content = screen.getByTestId('content');
    expect(content).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /закрыть/i });
    await userEvent.click(closeButton);

    // Ждём удаления из DOM
    await waitForElementToBeRemoved(() => screen.queryByTestId('content'));
  });
});
