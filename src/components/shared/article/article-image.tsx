'use client';

import Image from 'next/image';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import { FadeLeft } from '../animation/FadeLeft';
import { Article } from '../../../../@types/prisma';

type Props = {
  article: Pick<Article, 'imgSrc' | 'title'>;
};

export const ArticleImage = ({ article }: Props) => {
  return (
    <FadeLeft>
      <Image
        src={arrangeImgUrl(article.imgSrc)}
        alt={arrangeImgUrl(article.title)}
        width={527}
        height={339}
        className='w-[100%] lg:h-[339px] lg:w-[527px] rounded-[40px] object-cover'
      />
    </FadeLeft>
  );
};
