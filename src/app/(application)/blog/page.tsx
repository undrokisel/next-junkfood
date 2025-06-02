import ArticleCard from '@/components/shared/article-card';
import NotFound from '@/app/not-found';
import { prisma } from '../../../../prisma/prisma-client';

async function BlogPage() {
  const articles = await prisma.blog.findMany();

  if (!articles) return <NotFound />;

  return (
    <>
      <div className='custom_container max-w-[1280px] mx-auto'>
        <div className='container mt-10 text-center'>
          <h1 className='text-[32px] md:text-[42px] lg:text-[60px] font-bold mb-10 text-white'>
            Блог
          </h1>
        </div>

        <div
          className={`
            min-h-[70vh] pb-[50px] grid gap-x-[40px] gap-y-[30px]
            _grid-cols-[repeat(auto-fit,_minmax(340px,_1fr))] 
            sm:grid-cols-[repeat(auto-fit,_minmax(413px,_1fr))] 
            transition-opacity duration-200 opacity-100 `}
        >
          {articles?.map((art, index) => (
            <div key={index} className='flex flex-col items-center'>
              <ArticleCard art={art} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BlogPage;
