'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import { Blog } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { FadeVisible } from './animation/FadeVisible';

interface ArticleProps {
  art: Blog;
}

const ArticleCard: React.FC<ArticleProps> = ({ art }) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);

  const artType =
    // eslint-disable-next-line
    art.type === 'KITCHEN'
      ? 'Кухня'
      : // eslint-disable-next-line
        art.type === 'TEAM'
        ? 'Наша команда'
        : // eslint-disable-next-line
          art.type === 'OTHER'
          ? 'Разное'
          : '';

  return (
    <FadeVisible>
      <Link href={`/blog/${art.id}`}>
        <div
          className='flex flex-col gap-[10px] max-w-[413px]  sm:rounded-[40px] rounded-[30px] p-1 pb-8 bg-green-100
        transition-all duration-300 
        hover:scale-105
        hover:shadow-lg
        focus:scale-105
        focus:shadow-lg
        hover:bg-amber-100
        focus:bg-amber-100
        
        '
        >
          <div>
            {!isImgError ? (
              <Image
                src={arrangeImgUrl(art.imgSrc)}
                alt={art.title}
                width={440}
                height={270}
                priority
                onError={() => setIsImgError(true)}
                className='sm:h-[275px] h-full w-[413px]  sm:rounded-[40px] rounded-[30px] object-cover'
              />
            ) : (
              <div className='sm:min-h-[275px] w-[413px] min-h-[275px] sm:rounded-[40px] rounded-[30px] bg-slate-300 animate-pulse max-w-[90vw]' />
            )}
          </div>
          <div className='flex flex-col gap-[10px] pl-5'>
            <span
              className={cn(`
              w-fit px-[10px] py-[6px] border-pink_main bg-green-200 
              rounded-[14px] border-[1px] text-lg`)}
            >
              {artType}
            </span>
            <p className='lg:text-[18px] text-[18px] font-bold'>{art.title}</p>
            <div className='flex flex-row gap-[20px]'>
              <span className='_text-[#7C7C7C] text-black text-[14px] font-bold'>
                {art.createdAt.toLocaleDateString() ||
                  art.updatedAt.toLocaleDateString()}
              </span>
              <span className='_text-[#7C7C7C] text-black text-[14px] font-bold'>
                Время чтения: {art.readingTime} мин.
              </span>
            </div>
          </div>
        </div>
      </Link>
    </FadeVisible>
  );
};

export default ArticleCard;
