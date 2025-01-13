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

  // стоимость нестандартного тонкого лаваша (сырный, томатный)
  const doughPrice = 20;

  // стоимость шаурмы по размерам
  const shaurmaPrices = [190, 230, 270] as const;
  // виды теста
  const doughTypes = [1, 2, 3] as const;
  const shaurmaSizes = [1, 2, 3] as const;
  type ShaurmaSizeType = (typeof shaurmaSizes)[number];

  const genShaurmaVar = ({
    productId,
    price,
    size,
    doughType,
  }: {
    productId: number;
    price: number;
    size: ShaurmaSizeType;
    doughType: 1 | 2 | 3;
  }) => ({
    productId,
    price,
    size,
    doughType,
  });

  const variantsDoughType1 = [1, 2, 3].map((_, index) => {
    return genShaurmaVar({
      productId: shaurmasProducts[index].id,
      size: shaurmaSizes[index],
      price: shaurmaPrices[index],
      doughType: doughTypes[0],
    });
  });
  const variantsDoughType2 = [1, 2, 3].map((_, index) => {
    return genShaurmaVar({
      productId: shaurmasProducts[index].id,
      size: shaurmaSizes[index],
      price: shaurmaPrices[index] + doughPrice,
      doughType: doughTypes[1],
    });
  });
  const variantsDoughType3 = [1, 2, 3].map((_, index) => {
    return genShaurmaVar({
      productId: shaurmasProducts[index].id,
      size: shaurmaSizes[index],
      price: shaurmaPrices[index] + doughPrice,
      doughType: doughTypes[2],
    });
  });

  // под каждую размерную шаурму создаем вариации с тестом
  await prisma.productVariant.createMany({ data: variantsDoughType1 });
  await prisma.productVariant.createMany({ data: variantsDoughType2 });
  await prisma.productVariant.createMany({ data: variantsDoughType3 });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
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
