'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WaitingAlbum() {
  const dotVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-9'>
      <Image
        src='/assets/album/wait-icon.svg'
        alt='wait-icon'
        width={116}
        height={78}
      />
      <div className='text-16-500 text-text-subtle flex items-center gap-1'>
        <span>잠시만 기다려주세요</span>
        <motion.span
          className='flex'
          variants={containerVariants}
          initial='initial'
          animate='animate'
        >
          <motion.span variants={dotVariants}>.</motion.span>
          <motion.span variants={dotVariants}>.</motion.span>
          <motion.span variants={dotVariants}>.</motion.span>
        </motion.span>
      </div>
    </div>
  );
}
