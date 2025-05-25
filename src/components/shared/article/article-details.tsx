'use client';

import { cn } from '@/shared/lib/utils';
import { baseBgInteractiveClass } from '@/shared/constants/classes/classes';
import { GoArrowLeft } from 'react-icons/go';
import { Article } from '../../../../@types/prisma';
import { FadeRight } from '../animation/FadeRight';

type Props = {
  article: Pick<
    Article,
    'title' | 'createdAt' | 'updatedAt' | 'readingTime' | 'type'
  >;
};

export const ArticleDetails = ({ article }: Props) => {
  const artType =
    // eslint-disable-next-line
    article.type === 'KITCHEN'
      ? 'Кухня'
      : // eslint-disable-next-line
        article.type === 'TEAM'
        ? 'Наша команда'
        : // eslint-disable-next-line
          article.type === 'OTHER'
          ? 'Разное'
          : '';

  return (
    <FadeRight>
      <div className='flex-1'>
        <div className='flex flex-row flex-wrap items-center gap-x-[30px] gap-y-2'>
          <a href='/blog'>
            <span
              className={cn(
                `flex flex-row items-center gap-[5px] p-2 px-3 bg-black_5 rounded-[20px] text-[16px] font-medium bg-amber-100`,
                baseBgInteractiveClass
              )}
            >
              <GoArrowLeft width={22} height={22} /> Все статьи
            </span>
          </a>
          <div className='flex justify-between gap-4 items-center bg-green-100 rounded-3xl pl-1 pr-3 py-1 h-10'>
            <span className='sm:block _hidden w-fit px-[10px] py-[6px] border-pink_main rounded-[14px] border-[1px] text-[14px] text-md font-medium bg-amber-100 border-1 border-green-700'>
              {artType}
            </span>
            <span className='lg:text-[16px] text-[14px] font-medium text-black_80 b'>
              {article.createdAt.toLocaleDateString() ||
                article.updatedAt.toLocaleDateString()}
            </span>
            <span className='lg:text-[16px] text-[14px] font-medium text-black_80'>
              {article.readingTime} мин.
            </span>
          </div>
        </div>
        <p className='md:text-[40px] text-[32px] font-bold lg:my-[30px] my-[20px] text-white'>
          {article.title}
        </p>
      </div>
    </FadeRight>
  );
};
