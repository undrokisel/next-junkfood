import React from 'react';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { useCartStore } from '../store';
import { CreateCartItemValues } from '../services/dto/cart.dto';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
    // eslint-disable-next-line
  }, []);

  return cartState;
};
