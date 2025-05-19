// шаурма идет отдельным файлом
export const products = [
  // ------------------------
  // category 1 'шаурма'
  // ------------------------
  // ------------------------
  // category 2 'комбо'
  // ------------------------
  {
    name: 'Ланчбокс с куриными крыльями',
    imageUrl: 'images/products/combo/boxf_fly.avif',
    categoryId: 2,
    description:
      'Ланчбокс с хрустящими куриными крыльями — идеальный сытный перекус с сочным мясом и золотистой корочкой.',
  },
  {
    name: 'Ланчбокс с куриными нагетсами',
    imageUrl: 'images/products/combo/box_pieces.avif',
    categoryId: 2,
    description:
      'Ланчбокс с куриными нагетсами — нежные кусочки курицы в хрустящей панировке, готовые к употреблению.',
  },
  // category 3 'роллы'
  // ------------------------
  {
    name: 'Ролл Оригинальный',
    imageUrl: 'images/products/rolls/roll1.png',
    categoryId: 3,
    description:
      'Ролл Оригинальный — классическая комбинация свежих ингредиентов в мягкой тортилье.',
  },
  {
    name: 'Ролл Сырный',
    imageUrl: 'images/products/rolls/roll2.png',
    categoryId: 3,
    description:
      'Ролл Сырный — ароматный ролл с расплавленным сыром и пикантной начинкой.',
  },

  // ------------------------
  // category 4 'бургеры'
  // ------------------------
  {
    name: 'Чизбургер',
    imageUrl: 'images/products/burgers/cheeseburger.webp',
    categoryId: 4,
    description:
      'Чизбургер — сочная котлета с плавленым сыром, свежими овощами и фирменным соусом.',
  },
  {
    name: 'Гамбургер',
    imageUrl: 'images/products/burgers/gumburger.webp',
    categoryId: 4,
    description:
      'Гамбургер — традиционный бургер с говяжьей котлетой, луком и овощами в мягкой булочке.',
  },

  // ------------------------
  // category 5 'курица'
  // ------------------------
  {
    name: 'Куриные крылышки',
    imageUrl: 'images/products/chicken/fly.webp',
    categoryId: 5,
    description:
      'Куриные крылышки — аппетитные кусочки с хрустящей кожей и нежным мясом внутри.',
  },
  {
    name: 'Куриные стрипсы',
    imageUrl: 'images/products/chicken/strips.webp',
    categoryId: 5,
    description:
      'Куриные стрипсы — длинные полоски куриного филе в золотистой панировке, хрустящие снаружи и сочные внутри.',
  },
  {
    name: 'Куриные наггетсы',
    imageUrl: 'images/products/chicken/nuggets.webp',
    categoryId: 5,
    description:
      'Куриные наггетсы — миниатюрные кусочки курицы в хрустящей корочке, идеальные для быстрого перекуса.',
  },
  {
    name: 'Куриные ножки',
    imageUrl: 'images/products/chicken/legs.png',
    categoryId: 5,
    description:
      'Куриные ножки — сочные запеченные или жареные ножки с ароматными специями.',
  },

  // ------------------------
  // category 6 'соусы'
  // ------------------------
  {
    name: 'Соус Cырный',
    imageUrl: 'images/products/sauses/cheese.png',
    categoryId: 6,
    description:
      'Соус Сырный — густой сливочный соус с насыщенным сырным вкусом, дополняющий любое блюдо.',
  },
  {
    name: 'Соус Oстрый',
    imageUrl: 'images/products/sauses/hot.png',
    categoryId: 6,
    description:
      'Соус Острый — пикантная заправка с перцем для любителей ярких вкусовых ощущений.',
  },
  {
    name: 'Соус Барбекю',
    imageUrl: 'images/products/sauses/barbequ.png',
    categoryId: 6,
    description:
      'Соус Барбекю — копченый сладковато-пряный соус, идеальный для мяса и закусок.',
  },
  {
    name: 'Соус Чесночный',
    imageUrl: 'images/products/sauses/garlic.png',
    categoryId: 6,
    description:
      'Соус Чесночный — ароматный соус с ярким чесночным вкусом, идеальный дополнение к мясу и закускам.',
  },
  {
    name: 'Соус Терияки',
    imageUrl: 'images/products/sauses/teriyaki.webp',
    categoryId: 6,
    description:
      'Соус Терияки — сладко-соленый азиатский соус с нотками имбиря и кунжута для маринования или глазирования.',
  },
  {
    name: 'Соус Томатный',
    imageUrl: 'images/products/sauses/tomato.png',
    categoryId: 6,
    description:
      'Соус Томатный — насыщенный соус на основе томатов с травами, подходит для бургеров и пасты.',
  },

  // ------------------------
  // category 7 'холодные напитки'
  // ------------------------

  {
    name: 'Молочный коктейль Клубничный',
    imageUrl: 'images/products/colddrinks/milkstrawberry.webp',
    categoryId: 7,
    description:
      'Молочный коктейль Клубничный — нежный коктейль с натуральным клубничным вкусом и сливочной текстурой.',
  },
  {
    name: 'Молочный коктейль Ванильный',
    imageUrl: 'images/products/colddrinks/milkvanilla.webp',
    categoryId: 7,
    description:
      'Молочный коктейль Ванильный — классический ванильный десерт в стакане с бархатистой консистенцией.',
  },
  {
    name: 'Апельсиновый сок',
    imageUrl: 'images/products/colddrinks/orangejuice.webp',
    categoryId: 7,
    description:
      'Апельсиновый сок — свежий напиток с витаминами и ярким вкусом спелых апельсинов.',
  },
  {
    name: 'Яблочный сок',
    imageUrl: 'images/products/colddrinks/applejuice.webp',
    categoryId: 7,
    description:
      'Яблочный сок — освежающий сок из сочных яблок с натуральной сладостью.',
  },
  {
    name: 'Чай Lipton Зеленый в бутылке 0,5 л',
    imageUrl: 'images/products/colddrinks/liptongreen.png',
    categoryId: 7,
    description:
      'Чай Lipton Зеленый в бутылке 0,5 л — освежающий зеленый чай с легким травяным послевкусием.',
  },
  {
    name: 'Чай Lipton Лимон в бутылке 0,5 л',
    imageUrl: 'images/products/colddrinks/liptonlemon.png',
    categoryId: 7,
    description:
      'Чай Lipton Лимон в бутылке 0,5 л — чай с цитрусовой кислинкой и освежающим ароматом лимона.',
  },
  {
    name: 'Эвервесс Кола в бутылке 0,5 л',
    imageUrl: 'images/products/colddrinks/evervesskola.png',
    categoryId: 7,
    description:
      'Эверессс Кола в бутылке 0,5 л — газированный напиток с классическим вкусом колы для бодрости.',
  },
  {
    name: 'Аква Минерале без газа 0,5 л',
    imageUrl: 'images/products/colddrinks/minerale.png',
    categoryId: 7,
    description:
      'Аква Минерале без газа 0,5 л — чистая вода без газа для ежедневного увлажнения.',
  },
  {
    name: 'Аква Минерале с газом 0,5 л',
    imageUrl: 'images/products/colddrinks/minerale_bubbles.png',
    categoryId: 7,
    description:
      'Аква Минерале с газом 0,5 л — газированная вода с микроэлементами для свежести.',
  },
  {
    name: 'Сок J7 яблочный 0,2 л',
    imageUrl: 'images/products/colddrinks/juiceJ7_02.png',
    categoryId: 7,
    description:
      'Сок J7 яблочный 0,2 л — удобный формат яблочного сока с мякотью для перекуса на ходу.',
  },
  // ------------------------
  // category 8 'горячие напитки'
  // ------------------------
  {
    name: 'Кофе Глясe 0,2 л',
    imageUrl: 'images/products/hotdrinks/glase.png',
    categoryId: 8,
    description:
      'Кофе Глясе 0,2 л — охлаждающий напиток с эспрессо, молоком и шариком мороженого для любителей сладких кофейных коктейлей.',
  },
  {
    name: 'Чай черный 0,2 л',
    imageUrl: 'images/products/hotdrinks/tea_black.png',
    categoryId: 8,
    description:
      'Чай черный 0,2 л — классический крепкий чай с насыщенным вкусом и терпким ароматом.',
  },
  {
    name: 'Чай зеленый 0,2 л',
    imageUrl: 'images/products/hotdrinks/tea_green.png',
    categoryId: 8,
    description:
      'Чай зеленый 0,2 л — легкий освежающий напиток с травяными нотками и нежным послевкусием.',
  },
  {
    name: 'Кофе Американо 0,2 л',
    imageUrl: 'images/products/hotdrinks/americano.avif',
    categoryId: 8,
    description:
      'Кофе Американо 0,2 л — бодрящий эспрессо, разбавленный водой, для ценителей чистого кофейного вкуса.',
  },
  {
    name: 'Кофе Капучино 0,2 л',
    imageUrl: 'images/products/hotdrinks/capuchino.avif',
    categoryId: 8,
    description:
      'Кофе Капучино 0,2 л — нежный кофе с воздушной молочной пенкой и сливочной текстурой.',
  },

  // ------------------------
  // category 9 'картошка'
  // ------------------------
  {
    name: 'Картофель фри',
    imageUrl: 'images/products/fri/fri_small.avif',
    categoryId: 9,
    description:
      'Картофель фри — хрустящие ломтики с золотистой корочкой, посыпанные солью или специями.',
  },

  // ------------------------
  // category 10 'десерты'
  // ------------------------
  {
    name: 'Мороженое мягкое',
    imageUrl: 'images/products/deserts/icecream.png',
    categoryId: 10,
    description:
      'Мороженое мягкое — сливочный десерт с нежной текстурой, подается в стаканчике или рожке.',
  },
];
