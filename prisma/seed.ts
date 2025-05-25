import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hashSync } from 'bcrypt';
import { articles } from './seed_data/articles';
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

  await prisma.blog.createMany({
    data: articles,
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
      //  Ланчбокс с куриными крыльями - 1
      generateProductVariant({ productId: 1, price: 395 }),
      //  Ланчбокс с куриными нагетсами - 2
      generateProductVariant({ productId: 2, price: 365 }),

      //  Ролл Оригинальный - 3
      generateProductVariant({ productId: 3, price: 160 }),
      //  Ролл Сырный - 4
      generateProductVariant({ productId: 4, price: 180 }),

      //  Чизбургер - 5
      generateProductVariant({ productId: 5, price: 160 }),
      //  Гамбургер - 6
      generateProductVariant({ productId: 6, price: 180 }),

      //  Куриные крылышки - 7
      generateProductVariant({ productId: 7, price: 180 }),
      //  Куриные стрипсы - 8
      generateProductVariant({ productId: 8, price: 160 }),
      //  Куриные наггетсы - 9
      generateProductVariant({ productId: 9, price: 160 }),
      //  Куриные ножки - 10
      generateProductVariant({ productId: 10, price: 230 }),

      //  Соус Cырный - 11
      generateProductVariant({ productId: 11, price: 45 }),
      //  Соус Oстрый - 12
      generateProductVariant({ productId: 12, price: 45 }),
      //  Соус Барбекю - 13
      generateProductVariant({ productId: 13, price: 45 }),
      //  Соус Чесночный - 14
      generateProductVariant({ productId: 14, price: 45 }),
      //  Соус Терияки - 15
      generateProductVariant({ productId: 15, price: 45 }),
      //  Соус Томатный - 16
      generateProductVariant({ productId: 16, price: 45 }),

      //  Молочный коктейль Клубничный - 17
      generateProductVariant({ productId: 17, price: 130 }),
      //  Молочный коктейль Ванильный - 18
      generateProductVariant({ productId: 18, price: 130 }),

      //  Апельсиновый сок - 19
      generateProductVariant({ productId: 19, price: 80 }),
      //  Яблочный сок - 20
      generateProductVariant({ productId: 20, price: 80 }),

      //  Чай Lipton Зеленый в бутылке 0,5 л - 21
      generateProductVariant({ productId: 21, price: 140 }),
      //  Чай Lipton Лимон в бутылке 0,5 л - 22
      generateProductVariant({ productId: 22, price: 140 }),

      //  Эвервесс Кола в бутылке 0,5 л - 23
      generateProductVariant({ productId: 23, price: 160 }),
      //  Аква Минерале без газа 0,5 л - 24
      generateProductVariant({ productId: 24, price: 100 }),
      //  Аква Минерале с газом 0,5 л - 25
      generateProductVariant({ productId: 25, price: 100 }),
      //  Сок J7 яблочный 0,2 л - 26
      generateProductVariant({ productId: 26, price: 100 }),

      //  Кофе Глясe 0,2 л - 27
      generateProductVariant({ productId: 27, price: 180 }),
      //  Чай черный 0,2 л - 28
      generateProductVariant({ productId: 28, price: 80 }),
      //  Чай зеленый 0,2 л - 29
      generateProductVariant({ productId: 29, price: 80 }),
      //  Кофе Американо 0,2 л - 30
      generateProductVariant({ productId: 30, price: 130 }),
      //  Кофе Капучино 0,2 л - 31
      generateProductVariant({ productId: 31, price: 160 }),

      //  Картофель фри - 32
      generateProductVariant({ productId: 32, price: 130 }),
      //  Мороженое мягкое - 33
      generateProductVariant({ productId: 33, price: 130 }),
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
      // это шаурма, тесто стандарт, мини
      ingredients: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
    },
  });

  // сиды для сторис
  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: 'images/stories/gift.jpg',
        text: 'Розыгрыш 3000 руб.',
        objectFit: 'cover',
        textPosition: 'bottom',
        text_color: 'white',
        imgPosition: 'center',
      },
      // 2
      {
        previewImageUrl: 'images/stories/ice.png',
        text: '',
      },
      // 3
      {
        previewImageUrl: 'images/stories/big2.png',
        text: '',
        objectFit: 'cover',
      },
      // 4
      {
        previewImageUrl: 'images/stories/вакансия1.png',
        text: 'Ищем повара',
        objectFit: 'cover',
        textPosition: 'top',
        imgPosition: 'right',
        text_color: 'white',
        textSize: '1rem',
      },
      // 5
      {
        previewImageUrl: 'images/stories/cocktails1.png',
        objectFit: 'cover',
        textPosition: 'top',
      },
      // 6
      {
        previewImageUrl: 'images/stories/конкурс1.png',
        // text: 'Текст сторис',
        // text_color: 'amber-900',
        objectFit: 'cover',
        textPosition: 'top',
      },
      // 7
      {
        previewImageUrl: 'images/stories/разгон.png',
        text: '',
        text_color: 'amber-900',
        objectFit: 'cover',
        textPosition: 'top',
      },
      // 8
      {
        previewImageUrl: 'images/stories/скидки.png',
        objectFit: 'cover',
        textPosition: 'top',
        text: '',
        text_color: 'amber-900',
      },
      // 9
      {
        previewImageUrl: 'images/stories/супермен1.png',
        text: 'доставка - 40 мин',
        text_color: 'white',
        objectFit: 'cover',
        textPosition: 'bottom',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: 'images/stories/розыгрыш.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 2,
        sourceUrl: 'images/stories/ice1.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 3,
        sourceUrl: 'images/stories/big2.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 4,
        sourceUrl: 'images/stories/вакансия2.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 5,
        sourceUrl: 'images/stories/cocktails2.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 5,
        sourceUrl: 'images/stories/лето3.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 5,
        sourceUrl: 'images/stories/лето4.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 5,
        sourceUrl: 'images/stories/лето5.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 6,
        sourceUrl: 'images/stories/конкурс1.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 6,
        sourceUrl: 'images/stories/конкурс2.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 6,
        sourceUrl: 'images/stories/конкурс3.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 6,
        sourceUrl: 'images/stories/конкурс4.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 6,
        sourceUrl: 'images/stories/конкурс5.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 7,
        sourceUrl: 'images/stories/разгон.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 8,
        sourceUrl: 'images/stories/скидки.png',
        heading: '',
        subheading: '',
      },
      {
        storyId: 9,
        sourceUrl: 'images/stories/супермен1.png',
        heading: '',
        subheading: '',
      },
    ],
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
    // eslint-disable-next-line
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    // eslint-disable-next-line
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
