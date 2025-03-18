import React from 'react';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/store/category';

interface Props {
  className?: string;
  text: string;
  href: string;
  categoryId: number;
}

export const OtherPopup: React.FC<Props> = ({
  text,
  href,
  categoryId,
  className,
}) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn(
        `
                    flex
                    items-center
                    gap-1
                    bg-gray-50
                    px-5 h-11
                    rounded-md
                    cursor-pointer
                    font-bold
                `,
        categoryActiveId === categoryId &&
          `shadow-md shadow-gray-400
      text-primary bg-white`,
        className
      )}
    >
      <a href={href}>{text}</a>
    </div>
  );
};
