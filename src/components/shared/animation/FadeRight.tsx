import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { fadeRightVariant } from '@/shared/lib/motion';

export const FadeRight: React.FC<PropsWithChildren> = ({
  children,
  ...props
}) => {
  return (
    <motion.div
      variants={fadeRightVariant}
      initial='initial'
      // initial= "false"
      // animate="animate"
      whileInView='animate'
      viewport={{ amount: 0.5 }}
      style={{ width: '100%', height: 'auto' }}
      layout='position'
      {...props}
    >
      {children}
    </motion.div>
  );
};
