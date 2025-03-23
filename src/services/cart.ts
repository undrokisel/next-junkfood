import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>('/api/cart')).data;
};

export const updateItemQuantity = async (
  itemId: number,
  quantity: number
): Promise<CartDTO> => {
  return (
    // eslint-disable-next-line
    (await axiosInstance.patch<CartDTO>('/api/cart/' + itemId, { quantity }))
      .data
  );
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  // eslint-disable-next-line
  return (await axiosInstance.delete<CartDTO>('/api/cart/' + id)).data;
};

export const addCartItem = async (
  values: CreateCartItemValues
): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>('/api/cart', values)).data;
};
