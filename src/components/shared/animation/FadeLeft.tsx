import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { fadeLeftVariant } from '@/shared/lib/motion';

export const FadeLeft: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      variants={fadeLeftVariant}
      initial='initial'
      // initial= "false"
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
