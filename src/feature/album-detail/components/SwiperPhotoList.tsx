'use client';

import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperPhotoListProps {
  images?: string[];
  aspectRatio?: string;
}

export default function SwiperPhotoList({
  images = [
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    'https://images.unsplash.com/photo-1506765515384-028b60a970df',
    'https://images.unsplash.com/photo-1438109491414-7198515b166b',
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf',
  ],
  aspectRatio = 'aspect-[3/4]',
}: SwiperPhotoListProps) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);

  return (
    <div className='relative flex h-full flex-col gap-4'>
      <div className='flex h-full items-center justify-center'>
        <Swiper
          onSwiper={setMainSwiper}
          slidesPerView={1}
          spaceBetween={16}
          className={`w-full ${aspectRatio} overflow-hidden`}
          onSlideChange={(sw) => {
            if (thumbSwiper && !thumbSwiper.destroyed) {
              thumbSwiper.slideTo(sw.activeIndex);
            }
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`photo-${i}`}
                className='h-full w-full object-contain'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='mx-auto w-full max-w-md'>
        <Swiper
          onSwiper={setThumbSwiper}
          slidesPerView={7}
          centeredSlides
          spaceBetween={6}
          className='w-full px-3 py-2 backdrop-blur-md'
          onSlideChange={(sw) => {
            if (mainSwiper && !mainSwiper.destroyed) {
              mainSwiper.slideTo(sw.activeIndex);
            }
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide
              key={i}
              className='!h-[30px] !w-[30px] cursor-pointer transition-all duration-300 data-[swiper-slide-active]:scale-110 data-[swiper-slide-active]:ring-2 data-[swiper-slide-active]:ring-white'
              onClick={() => {
                mainSwiper?.slideTo(i);
                thumbSwiper?.slideTo(i);
              }}
            >
              <img
                src={src}
                alt={`thumb-${i}`}
                className='h-full w-full rounded-[6px] object-cover'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
