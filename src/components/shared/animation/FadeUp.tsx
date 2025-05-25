import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '@/shared/lib/motion';

export const FadeUp: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      variants={fadeUpVariant}
      initial='initial'
      // animate="animate"
      whileInView='animate'
      viewport={{ amount: 0.5 }}
      style={{ width: '100%', height: 'auto' }}
      layout='position'
    >
      {children}
    </motion.div>
  );
};
