import { PropsWithChildren, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeVisibleVariant } from '@/shared/lib/motion';

interface FadeProps {
  duration?: number;
  children: ReactNode;
}

export const FadeVisible: React.FC<PropsWithChildren & FadeProps> = ({
  duration = 1,
  children,
}): React.ReactNode => {
  return (
    <motion.div
      variants={fadeVisibleVariant(duration)}
      initial='initial'
      viewport={{ amount: 0.5 }}
      // animate="animate"
      whileInView='animate'
    >
      {children}
    </motion.div>
  );
};
