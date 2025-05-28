import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '../../../../prisma/prisma-client';

export async function GET(req: NextRequest) {
  try {
    // const userId = 1;
    const token = req.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ totalAmount: 0, items: [] });

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productVariant: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    // eslint-disable-next-line
    console.log('[CART_GET] Server error', error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: 'Не удалось получить корзину get' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) token = crypto.randomUUID();

    const userCart = await findOrCreateCart(token);

    // данные, передаваемые от клиента
    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
        // каждый ингредиент в массиве от клиента
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    });

    // Если товар был найден, делаем +1
    if (findCartItem)
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    else
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    // eslint-disable-next-line
    console.log('[CART_POST] Server error', error);
    Sentry.captureException(error);
    return NextResponse.json(
      { message: 'Не удалось получить корзину post' },
      { status: 500 }
    );
  }
}
