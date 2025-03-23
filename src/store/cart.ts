import { Api } from '@/services/api-client';
import { create } from 'zustand';
import { getCartDetails } from '@/shared/lib';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { CreateCartItemValues } from '@/services/dto/cart.dto';

export type ICartItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  shaurmaSize?: number | null;
  doughType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  // получение товаров из корзины
  fetchCartItems: () => Promise<void>;

  // Запрос на обновление количества товара
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  //   Запрос на добавление товара в корзину
  //   addCartItem: (values: CreateCartItemValues) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;

  //   Запрос на удаление товара из корзины
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>(
  (
    set
    // get
  ) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
      try {
        set({ error: false, loading: true });
        const data = await Api.cart.getCart();
        set(getCartDetails(data));
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },

    removeCartItem: async (id: number) => {
      try {
        set((state) => ({
          error: false,
          loading: true,
          items: state.items.map((item) =>
            item.id === id ? { ...item, disabled: true } : item
          ),
        }));
        const data = await Api.cart.removeCartItem(id);
        set(getCartDetails(data));
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
        set({ error: true });
      } finally {
        set((state) => ({
          loading: false,
          items: state.items.map((item) => ({ ...item, disabled: false })),
        }));
      }
    },
    updateItemQuantity: async (id: number, quantity: number) => {
      try {
        set({ error: false, loading: true });
        const data = await Api.cart.updateItemQuantity(id, quantity);
        set(getCartDetails(data));
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },
    addCartItem: async (values: CreateCartItemValues) => {
      try {
        set({ error: false, loading: true });
        const data = await Api.cart.addCartItem(values);
        set(getCartDetails(data));
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },
  })
);
