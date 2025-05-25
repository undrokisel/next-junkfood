import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { fadeDownVariant } from '@/shared/lib/motion';

export const FadeDown: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      variants={fadeDownVariant}
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
