import { useRef, useCallback } from 'react';

export const useDragScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startClientX = useRef(0);
  const startScrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    isDragging.current = true;
    startClientX.current = e.clientX;
    startScrollLeft.current = ref.current.scrollLeft;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !ref.current) return;

    const delta = e.clientX - startClientX.current;
    ref.current.scrollLeft = startScrollLeft.current - delta;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const bind = {
    ref,
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp,
    style: {
      cursor: isDragging.current ? 'grabbing' : 'grab',
      userSelect: 'none',
    } as React.CSSProperties,
  };

  return bind;
};
