import NotFound from '@/app/not-found';
import ArticleBody from '@/components/shared/article/article-body';
import { prisma } from '../../../../../prisma/prisma-client';
import { ArticleImage } from '../../../../components/shared/article/article-image';
import { ArticleDetails } from '../../../../components/shared/article/article-details';

async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await prisma.blog.findFirst({
    where: { id: Number(params.id) },
  });

  if (!article) return <NotFound />;

  return (
    <div className='custom_container max-w-[1280px] mx-auto flex flex-col justify-center item-center gap-[30px] pt-14 px-8 '>
      <div className='flex lg:flex-row flex-col-reverse lg:gap-[43px] gap-[20px] justify-between '>
        <div className={`lg:w-[40%] 'opacity-100' transition-all`}>
          <ArticleImage article={article} />
        </div>

        <ArticleDetails article={article} />
      </div>
      <ArticleBody
        article={{
          ...article,
          paragraphs: JSON.parse(article.paragraphs as string),
        }}
      />
    </div>
  );
}

export default ArticlePage;
