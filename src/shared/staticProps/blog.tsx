import getArticles from '../db/getArticlesFromDB';

export async function getStaticPropsBlog() {
  const limit = 1;

  try {
    const response = await getArticles();

    // const response = await fetch(
    // `${process.env.NEXT_PUBLIC_SERVER_URL}/articles?type=&page=1&limit=${limit}`
    // `${process.env.NEXT_PUBLIC_API_URL}/articles`
    // );

    if (!response.ok)
      throw new Error(`Failed to fetch articles: ${response.statusText}`);

    // const data = await response.json();
    const { data } = response;

    return {
      props: {
        initialArticles: data.articles,
        totalPages: Math.ceil(data.total / limit), // Общее количество страниц
        limit,
      },
    };
  } catch (error) {
    // eslint-disable-next-line
    console.error('Error fetching articles:', error);
    return {
      props: {
        initialArticles: [],
        totalPages: 0,
        limit,
      },
    };
  }
}
