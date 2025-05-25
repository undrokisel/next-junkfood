import { prisma } from '../../../prisma/prisma-client';

/**
 * Это замена обращения к API URL во время билда
 * @param id
 * @returns
 */
export default async function getArticles() {
  try {
    const articles = await prisma.blog.findMany();
    return {
      ok: true,
      statusText: '',
      data: {
        articles: articles.map((article) => ({
          ...article,
          createdAt: article.createdAt.toJSON(),
          updatedAt: article.updatedAt.toJSON(),
        })),
        total: articles.length,
      },
    };
  } catch (error) {
    // eslint-disable-next-line
    console.log('Ошибка при запросе статей из призмы при билде: ', error);
    return {
      status: 500,
      data: {
        error: 'Ошибка сервера при получении статей',
      },
    };
  }
}
