'use client';

import CheeseCartLoading from '@/../public/assets/album/CheeseCart_Loading.json';
import Toast from '@/global/components/toast/Toast';
import { useImageStore } from '@/store/useImageStore';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface WaitingAlbumProps {
  albumId: string;
}

export default function WaitingAlbum({ albumId }: WaitingAlbumProps) {
  const router = useRouter();
  const { images } = useImageStore();

  useEffect(() => {
    const processImages = async () => {
      const startTime = Date.now();

      try {
        // 최소 2.5초 대기 보장
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2500 - elapsedTime);
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
        // Zustand에 저장된 이미지가 있으면 → 일부 사진에 문제 → select로 이동
        if (images.length > 0) {
          router.replace(`/album/${albumId}/select`);
          return;
        }

        // 업로드 완료 후 detail 페이지로 이동
        router.replace(`/album/detail/${albumId}`);
      } catch (err) {
        console.error('Image processing error:', err);
        Toast.alert('사진 처리 중 에러가 발생했습니다.');
        // Toast가 최소 1초는 보이도록 대기 후 이동
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.replace(`/album/detail/${albumId}`);
      }
    };

    processImages();
  }, [albumId, images, router]);

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
