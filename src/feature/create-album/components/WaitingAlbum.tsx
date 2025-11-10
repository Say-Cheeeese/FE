'use client';

import CheeseCartLoading from '@/../public/assets/album/CheeseCart_Loading.json';
import { useImageStore } from '@/store/useImageStore';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { validateUpload } from '../utils/validateUpload';
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
        // 1. 이미지 파일 추출
        const files = images.map((img) => img.file);

        // 2. 업로드 검증(용량 + 업로드 가능 개수)
        const result = await validateUpload(files, albumId);

        // 3. 최소 1초 대기 보장 후 분기
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 3000 - elapsedTime);
        await new Promise((resolve) => setTimeout(resolve, remainingTime));

        if (!result.ok) {
          // 용량 초과 또는 업로드 가능 개수 초과 시 select로 이동
          router.replace(`/album/${albumId}/select`);
          return;
        }

        // 검증 통과 시 main 페이지로 이동
        router.replace(`/album/detail/${albumId}`);
      } catch (err) {
        console.error('Image validation error:', err);
        // 에러 발생 시에도 최소 1초 후 main으로 이동
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1000 - elapsedTime);
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
        alert('사진 업로드 중 에러가 발생했습니다.');
        router.replace(`/album/${albumId}/main`);
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
