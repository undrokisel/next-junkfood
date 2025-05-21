'use client';

import { ElfsightWidgetProps } from 'react-elfsight-widget';
import dynamic from 'next/dynamic';

export const ElfsightWidget = dynamic<ElfsightWidgetProps>(
  async () => (await import('react-elfsight-widget')).ElfsightWidget,
  {
    ssr: false,
  }
);
export const Chat = () => {
  return <ElfsightWidget widgetId={process.env.NEXT_PUBLIC_ELF_CHAT!} />;
};
