'use client';

import React from 'react';
import { Article } from '../../../../@types/prisma';
import { FadeUp } from '../animation/FadeUp';

interface ArticleBodyProps {
  article: Article;
}

const ArticleBody: React.FC<ArticleBodyProps> = ({ article }) => {
  return (
    <div className='flex mb-6 bg-green-50/70 rounded-3xl py-2 px-4'>
      <FadeUp>
        <div className='md:w-[70%] w-full'>
          <p
            className='text-[18px] font-medium mb-[20px]'
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
          <div className='flex flex-col gap-[20px]'>
            {article.paragraphs.map((par, index) => (
              <div key={index}>
                <h2
                  id={par.link}
                  className='lg:text-[32px] text-[24px] font-bold mb-[10px]'
                >
                  {par.title}
                </h2>
                <span
                  className='text-[18px] font-medium'
                  dangerouslySetInnerHTML={{ __html: par.text }}
                />
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
};

export default ArticleBody;
