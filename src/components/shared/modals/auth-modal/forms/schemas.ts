import { z } from 'zod';

export const passwordSchema = z.string().min(4, {
  message: 'Минимум 4 символа',
});

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'Минимум 2 символа' }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof formLoginSchema>;
export type RegisterFormValues = z.infer<typeof formRegisterSchema>;
