'use client';

import { useImageStore } from '@/store/useImageStore';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { validateUpload } from '../utils/validateUpload';

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
        const remainingTime = Math.max(0, 1000 - elapsedTime);
        await new Promise((resolve) => setTimeout(resolve, remainingTime));

        if (!result.ok) {
          // 용량 초과 또는 업로드 가능 개수 초과 시 select로 이동
          router.push(`/album/${albumId}/select`);
          return;
        }

        // 검증 통과 시 main 페이지로 이동
        router.push(`/album/${albumId}/main`);
      } catch (err) {
        console.error('Image validation error:', err);
        // 에러 발생 시에도 최소 1초 후 main으로 이동
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1000 - elapsedTime);
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
        alert('사진 업로드 중 에러가 발생했습니다.');
        router.push(`/album/${albumId}/main`);
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
