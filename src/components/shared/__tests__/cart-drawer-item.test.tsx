// __tests__/CartDrawerItem.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartDrawerItem } from '../cart-drawer-item';

// Mocking utility functions and components
jest.mock('@/shared/lib/utils', () => ({
  cn: (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' '),
}));

jest.mock('@/shared/lib/arrangeImgUrl', () => ({
  arrangeImgUrl: (url: string) => `mocked_${url}`,
}));

jest.mock('lucide-react', () => ({
  Trash2Icon: ({ onClick, size, className }: any) => (
    <svg
      data-testid='trash-icon'
      onClick={onClick}
      width={size}
      height={size}
      className={className}
    />
  ),
}));

jest.mock('../cart-item-details', () => ({
  Image: ({ src }: any) => (
    <img src={src} alt='Cart Item' data-testid='cart-item-image' />
  ),
  Info: ({ name, details, className }: any) => (
    <div data-testid='cart-item-info' className={className}>
      <div data-testid='cart-item-name'>{name}</div>
      <div data-testid='cart-item-details'>{details}</div>
    </div>
  ),
  Price: ({ value }: any) => <div data-testid='cart-item-price'>{value}</div>,
}));

jest.mock('@/components/shared/count-button', () => ({
  CountButton: ({ onClick, value, className }: any) => {
    const handleClick = () => {
      // Mock the logic to determine the type ('plus' or 'minus')
      onClick('plus');
    };

    return (
      <div
        data-testid='count-button'
        onClick={handleClick}
        className={className}
      >
        {value}
      </div>
    );
  },
}));

describe('CartDrawerItem Component', () => {
  const mockProps = {
    id: 1, // Добавляем id
    imageUrl: 'test.jpg',
    name: 'Test Product',
    details: 'Test Details',
    quantity: 2,
    price: 100,
    disabled: false,
    onClickCountButton: jest.fn(),
    onClickRemove: jest.fn(),
    className: 'test-class',
  };

  it('renders the component with correct data', () => {
    render(<CartDrawerItem {...mockProps} />);

    const image = screen.getByTestId('cart-item-image');
    expect(image).toHaveAttribute('src', 'mocked_test.jpg');

    const name = screen.getByTestId('cart-item-name');
    expect(name).toHaveTextContent('Test Product');

    const details = screen.getByTestId('cart-item-details');
    expect(details).toHaveTextContent('Test Details');

    const price = screen.getByTestId('cart-item-price');
    expect(price).toHaveTextContent('100');

    const countButton = screen.getByTestId('count-button');
    expect(countButton).toHaveTextContent('2');
  });

  it('applies additional className to the component', () => {
    const { container } = render(<CartDrawerItem {...mockProps} />);
    // Check if the root element has the correct class
    expect(container.firstChild).toHaveClass('flex');
    expect(container.firstChild).toHaveClass('bg-white');
    expect(container.firstChild).toHaveClass('p-5');
    expect(container.firstChild).toHaveClass('gap-6');
    expect(container.firstChild).toHaveClass('items-center');
  });
});
