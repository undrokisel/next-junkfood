import { sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { OrderSuccessTemplate } from '@/components/shared/email-templates';
import { CartItemDTO } from '@/services/dto/cart.dto';
import { PaymentCallbackData } from '../../../../../@types/yookassa';
import { prisma } from '../../../../../prisma/prisma-client';

// коллбек - обработка ответа от платежного сервиса об успешности оплаты
export async function POST(req: NextRequest) {
  try {
    // ответ от платежного сервиса
    const body = (await req.json()) as PaymentCallbackData;

    // ищем у себя в базе заказ, о котором речь
    const order = await prisma.order.findFirst({
      where: {
        // предварительно, ранее при отправке запроса на оплату,
        // необходимо передать платежному сервисвису в метадату
        // нужные нам данные,
        // по которым далее (сейчас) и будем искать у себя заказ
        id: Number(body.object.metadata.order_id),
      },
    });

    // все, что возвращается в ответах здесь,
    // будет возвращаться в платежный сервис
    // и там можно посмотреть в логах
    // и в принципе, без разницы, что возвращать платежному сервису
    if (!order) return NextResponse.json({ error: 'Order not found' });

    // получение из тела запроса платежного сервиса информации о статусе заказа
    const isSucceeded = body.object.status === 'succeeded';

    // обновление в базе статуса заказа
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.PAYD : OrderStatus.CANCELLED,
      },
    });

    // получение из модели заказа перечня товаров
    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    // уведомление email об успешной оплате
    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Твоя шаурма / Ваш заказ успешно оформлен 🎉',
        OrderSuccessTemplate({ orderId: order.id, items })
      );
      return NextResponse.json('Success');
    }
    // Письмо о неуспешной оплате
    return NextResponse.json({ error: 'Ошибка при оплате заказа' });
  } catch (error) {
    // eslint-disable-next-line
    console.log('[Checkout Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
