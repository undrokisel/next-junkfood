import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hashSync } from 'bcrypt';
import {
  categories,
  ingredients,
  products,
  shaurmasData,
  // users
} from './seed_data';

const prisma = new PrismaClient();

async function up() {
  // юзеры
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Админ Админов',
        email: 'admin@admin.admin',
        password: hashSync('admin', 10),
        role: 'ADMIN',
        verified: new Date(),
      },
      {
        fullName: 'Тест Тестович Тестов',
        email: 'test@test.test',
        password: hashSync('testtest', 10),
      },
    ],
  });

  // категории
  await prisma.category.createMany({
    data: categories,
  });

  // ингредиенты
  await prisma.ingredient.createMany({
    data: ingredients,
  });

  // продукты простые
  await prisma.product.createMany({
    data: products,
  });

  // продукты размерные
  // шаурма  мини, стандарт , богатырь
  // указаны только названия, а размеры,
  // цены, и варианты теста добавим в вариантах
  const shaurmasProducts = await Promise.all(
    shaurmasData.map(async (shaurmaData) => {
      const result = await prisma.product.create({
        data: shaurmaData,
      });
      return result;
    })
  );

  // из-за особенностей призмы
  // пришлось отдельно указать массивы цен на шаурмы,
  // отдельно массив с размерами и отдельно массив с видами теста
  // стоимость шаурмы по размерам
  const shaurmaPrices = [190, 230, 270] as const;
  // виды теста
  const doughTypes = [1, 2, 3] as const;
  const shaurmaSizes = [1, 2, 3] as const;

  // стоимость нестандартного тонкого лаваша (сырный, томатный)
  const doughPriceDefault = 20;

  // the same
  // const shaurmaTypesData = {
  //   typePrice: [
  //     {mini: 190},
  //     {standart: 230},
  //     {maxi: 270},
  //   ],
  //   doughTypesPrice: [
  //     {cheese: 30},
  //     {tomato: 30},
  //     {standart: 30},
  //   ]
  //  } as const

  type ShaurmaSizeType = (typeof shaurmaSizes)[number];

  const generateProductVariant = ({
    productId,
    price, // ?
    size,
    doughType,
  }: {
    productId: number;
    price: number;
    size?: ShaurmaSizeType;
    doughType?: 1 | 2 | 3;
  }) => ({
    productId,
    price,
    size,
    doughType,
  });

  // тип теста - 0
  // цена здесь зависит только от размера, связь очень косвенная
  // размеры всех видов
  const variantsDoughType1 = [1, 2, 3].map((_, index) => {
    return generateProductVariant({
      productId: shaurmasProducts[index].id,
      size: shaurmaSizes[index],
      price: shaurmaPrices[index],
      doughType: doughTypes[0],
    });
  });
  // тип теста - 1
  const variantsDoughType2 = [1, 2, 3].map((_, index) => {
    return generateProductVariant({
      productId: shaurmasProducts[index].id,
      size: shaurmaSizes[index],
      price: shaurmaPrices[index] + doughPriceDefault,
      doughType: doughTypes[1],
    });
  });
  // тип теста - 2
  const variantsDoughType3 = [1, 2, 3].map((_, index) => {
    return generateProductVariant({
      productId: shaurmasProducts[index].id,
      size: shaurmaSizes[index],
      price: shaurmaPrices[index] + doughPriceDefault,
      doughType: doughTypes[2],
    });
  });

  // под каждую размерную шаурму создаем вариации с тестом
  // то есть по сути пушим заготовки в продуктВариант
  // должно получиться 3 вида теста на 3 размера = 9 вариантов
  await prisma.productVariant.createMany({ data: variantsDoughType1 });
  await prisma.productVariant.createMany({ data: variantsDoughType2 });
  await prisma.productVariant.createMany({ data: variantsDoughType3 });

  // остальные продукты
  await prisma.productVariant.createMany({
    data: [
      generateProductVariant({ productId: 2, price: 100 }),
      generateProductVariant({ productId: 3, price: 110 }),
    ],
  });

  // ----------------------cart-------------------------------
  // сид для корзины
  await prisma.cart.createMany({
    data: [
      {
        token: '111111',
        totalAmount: 0,
        userId: 1,
      },
      {
        token: '222222',
        totalAmount: 0,
        userId: 2,
      },
    ],
  });
  // сид для элементов корзины
  await prisma.cartItem.create({
    data: {
      productVariantId: 1, // первый вариант товара.
      cartId: 1, // первая в списке корзин
      quantity: 2,
      totalPrice: 0,
      // это пицца, тесто стандарт, мини
      ingredients: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
