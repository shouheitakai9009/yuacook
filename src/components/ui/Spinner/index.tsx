import { motion, AnimatePresence } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

export const SpinnerWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>;
};

export interface SpinnerProps {
  message?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 backdrop-blur-md bg-white/10 flex flex-col gap-4 justify-center items-center"
    >
      <LoaderCircle size={80} className="animate-spin" />
      <p>{message}</p>
    </motion.div>
  );
};
