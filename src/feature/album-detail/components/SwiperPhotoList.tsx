'use client';

import { useEffect, useState } from 'react';
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
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    'https://images.unsplash.com/photo-1506765515384-028b60a970df',
    'https://images.unsplash.com/photo-1438109491414-7198515b166b',
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    'https://images.unsplash.com/photo-1506765515384-028b60a970df',
    'https://images.unsplash.com/photo-1438109491414-7198515b166b',
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    'https://images.unsplash.com/photo-1506765515384-028b60a970df',
    'https://images.unsplash.com/photo-1438109491414-7198515b166b',
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    'https://images.unsplash.com/photo-1506765515384-028b60a970df',
    'https://images.unsplash.com/photo-1438109491414-7198515b166b',
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf',
  ],
  aspectRatio = 'aspect-[3/4]',
}: SwiperPhotoListProps) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const vw = window.innerWidth;
      const thumb = 27;
      setThumbOffset(vw / 2 - thumb);
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  console.log(thumbOffset);

  return (
    <div className='relative flex h-full flex-col gap-4'>
      {/* 위: 메인 이미지 Swiper */}
      <div className='flex h-full items-center justify-center'>
        <Swiper
          onSwiper={setMainSwiper}
          slidesPerView={1}
          spaceBetween={16}
          className={`w-full ${aspectRatio} overflow-hidden`}
          onSlideChange={(sw) => {
            const idx = sw.activeIndex;
            setActiveIndex(idx);
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

      {/* 아래: 썸네일 컨트롤러 */}
      <div className='mx-auto w-full max-w-md'>
        <Swiper
          onSwiper={setThumbSwiper}
          slidesPerView='auto'
          spaceBetween={2} // 👈 기본 간격 2px
          slidesOffsetBefore={thumbOffset}
          slidesOffsetAfter={thumbOffset}
          watchSlidesProgress
          className='custom-thumb-swiper relative w-full px-3 py-2 backdrop-blur-md'
          onSlideChange={(sw) => {
            const idx = sw.activeIndex;
            setActiveIndex(idx);
            if (mainSwiper && !mainSwiper.destroyed) {
              mainSwiper.slideTo(sw.activeIndex);
            }
          }}
        >
          {images.map((src, i) => {
            const isActive = activeIndex === i;
            return (
              <SwiperSlide
                key={i}
                className={`thumb-slide flex items-center justify-center`}
                // TODO : tailwind로 아래 값을 관리할 경우, transition이 잘 적용되지 않는 문제가 있음.
                style={{
                  width: isActive ? 30 : 15,
                  height: 30,
                  marginLeft: isActive ? 12 : 1,
                  marginRight: isActive ? 12 : 1,
                  transition: 'width 0.3s ease, margin 0.3s ease',
                }}
                onClick={() => {
                  setActiveIndex(i);
                  mainSwiper?.slideTo(i);
                  thumbSwiper?.slideTo(i);
                }}
              >
                <img
                  src={src}
                  alt={`thumb-${i}`}
                  width={30}
                  height={30}
                  className='thumb-img h-full w-full rounded-[6px] object-cover'
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
