import React from 'react';
import { clsx } from 'clsx';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
  className?: string;
  size?: TitleSize;
  text: string;
}

export const Title: React.FC<Props> = ({ className, size = 'sm', text }) => {
  const mapTagBySize = {
    xs: 'h6',
    sm: 'h5',
    md: 'h4',
    lg: 'h3',
    xl: 'h2',
    '2xl': 'h1',
  } as const;

  const mapClassNameBySize = {
    xs: 'text-[16px]',
    sm: 'text-[22px]',
    md: 'text-[16px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
    '2xl': 'text-[48px]',
  } as const;

  return React.createElement(
    mapTagBySize[size],
    {
      className: clsx(mapClassNameBySize[size], className),
    },
    text[0].toUpperCase() + text.slice(1)
  );
};
