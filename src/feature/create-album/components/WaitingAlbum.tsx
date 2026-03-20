'use client';

import CheeseCartLoading from '@/../public/assets/album/CheeseCart_Loading.json';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface WaitingAlbumProps {
  albumId: string;
}

export default function WaitingAlbum({ albumId }: WaitingAlbumProps) {

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
    <div className='relative flex h-screen w-full flex-col items-center justify-center'>
      <Lottie
        animationData={CheeseCartLoading}
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
      <div
        className='text-16-500 text-text-subtle flex items-center gap-1'
        style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
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
