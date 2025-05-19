'use server';

import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { cookies } from 'next/headers';
import { hashSync } from 'bcrypt';
import {
  PayOrderTemplate,
  VerificationUserTemplate,
} from '@/components/shared/email-templates';
import { sendEmail, createPayment, getUserSession } from '@/shared/lib';
import { OrderStatus, Prisma } from '@prisma/client';
import { prisma } from '../../prisma/prisma-client';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) throw new Error('Cart token not found');

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) throw new Error('Cart not found');

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) throw new Error('Cart is empty');

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        // информация для выдачи/курьера
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,

        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),

        token: cartToken,

        // paymentType: PaymentType
        // deliveryType DeliveryType
        // paymentId String?
      },
    });

    /* Очищаем корзину */
    // Важно! не удаляем!
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // удаляем из связной таблицы товары, привязанные к корзине
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // создание ссылки для оплаты
    const paymentData = await createPayment({
      amount: order.totalAmount,
      descrition: `Оплата заказа # ${order.id}`,
      orderId: order.id,
    });

    if (!paymentData) throw new Error('Payment data not found');

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    await sendEmail(
      data.email,
      `Твоя Шаурма / Оплатите заказ № ${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      })
    );

    return paymentUrl;
  } catch (error) {
    // eslint-disable-next-line
    console.log('[CreateOrder] Server error', error);
    throw error;
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    // перед изменением профиля надо проверить, авторизован ли пользователь
    const currentUser = await getUserSession();

    if (!currentUser) throw new Error('Пользователь не найден');

    // получаем пользователя из базы,
    // пригодится только на случай, если по каким-то причинам
    // во входящих аргументах body не будет пароля
    // тогда пароль достанем отсюда
    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    // eslint-disable-next-line
    console.log('[updateUserInfo] Server error', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.email) throw new Error('Почта не подтверждена');
      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.email, 10),
      },
    });

    // генерация кода для последующей отправки
    // на почту для последующего подтверждения учетной записи
    const code = Math.floor(10000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Твоя шаурма / 📝 Подтверждение регистрации',
      VerificationUserTemplate({
        code,
      })
    );
  } catch (error) {
    // eslint-disable-next-line
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}

// Error: Attempted to call
// the default export of C:\react-projects\next-junkfood\node_modules\next\dist\client\link.js
// from the server but it's on the client.
// It's not possible to invoke a client function from the server,
// it can only be rendered as a Component or passed to props of a Client Component.

// ! Авторизуйтесь или выберите другую почту!
