'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SelectedListProps {
  selectedMenu: 'first' | 'second' | 'third';
}

const MENU_IMAGES = [
  { key: 'first', src: '/assets/rending/first.svg', alt: '7일 설명' },
  { key: 'second', src: '/assets/rending/second.svg', alt: '띱 설명' },
  { key: 'third', src: '/assets/rending/third.svg', alt: '치즈네컷 설명' },
];

export default function SelectedList({ selectedMenu }: SelectedListProps) {
  const selectedIdx =
    selectedMenu === 'first'
      ? 0
      : selectedMenu === 'second'
        ? 1
        : selectedMenu === 'third'
          ? 2
          : 0;

  return (
    <div className='relative mt-8 w-full overflow-x-auto'>
      <motion.div
        className='flex w-full'
        animate={{
          x: `${-selectedIdx * 100}%`,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {MENU_IMAGES.map((image) => (
          <div
            key={image.key}
            className='flex w-full flex-shrink-0 items-center justify-center'
          >
            <Image
              src={image.src}
              width={375}
              height={400}
              alt={image.alt}
              loading='lazy'
              className='object-contain'
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
