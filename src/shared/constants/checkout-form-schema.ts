import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Не менее 2-х символов' }),
  lastName: z.string().min(2, { message: 'Не менее 2-х символов' }),
  email: z.string().email({ message: 'Почта некорректна' }),
  phone: z.string().min(10, { message: 'Номер некорректный' }),
  address: z.string().min(5, { message: 'Адрес некорректный' }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
