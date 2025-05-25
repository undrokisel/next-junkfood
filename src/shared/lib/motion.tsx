'use client';

const fadeUpVariant = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const fadeDownVariant = {
  initial: { opacity: 0, y: -50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const fadeLeftVariant = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

const fadeRightVariant = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

const fadeVisibleVariant = (duration = 1) => {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration,
      },
    },
  };
};

const exitAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export {
  fadeUpVariant,
  fadeDownVariant,
  fadeLeftVariant,
  fadeRightVariant,
  exitAnimation,
  fadeVisibleVariant,
};
