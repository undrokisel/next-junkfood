import React from 'react';
import { cn } from '@/shared/lib/utils';

// interface Props {
//   className?: string;
// }

// export const Container: React.FC<React.PropsWithChildren<Props>> = ({
//   children,
//   className,
// }) => {
//   return (
//     <div className={cn(className, 'mx-auto max-w-[1280px]')}>{children}</div>
//   );
// };

export const Container = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{ className?: string }>
  // eslint-disable-next-line
>(function Container({ className, children }, ref) {
  return (
    <div ref={ref} className={cn(className, 'mx-auto max-w-[1280px]')}>
      {children}
    </div>
  );
});
