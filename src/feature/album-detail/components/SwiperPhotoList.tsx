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

  useEffect(() => {
    const updateOffset = () => {
      const vw = window.innerWidth;
      const thumb = 30;
      setThumbOffset((vw - thumb) / 2);
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

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
            if (mainSwiper && !mainSwiper.destroyed) {
              mainSwiper.slideTo(sw.activeIndex);
            }
          }}
        >
          {images.map((src, i) => (
            <SwiperSlide
              key={i}
              className='thumb-slide flex items-center justify-center transition-all duration-300'
              onClick={() => {
                mainSwiper?.slideTo(i);
                thumbSwiper?.slideTo(i);
              }}
            >
              <img
                src={src}
                alt={`thumb-${i}`}
                className='thumb-img rounded-[6px] object-cover transition-all duration-200 data-[swiper-slide-active]:ring-2 data-[swiper-slide-active]:ring-white'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 👇 크기 + 간격 스타일 */}
      <style jsx global>{`
        /* 모든 썸네일 기본 크기 및 간격 */
        .custom-thumb-swiper .thumb-slide {
          width: 15px !important;
          height: 30px !important;
          margin-left: 1px !important;
          margin-right: 1px !important;
        }

        .custom-thumb-swiper .thumb-img {
          width: 100%;
          height: 100%;
        }

        /* 활성(선택된) 썸네일 */
        .custom-thumb-swiper .swiper-slide-active {
          width: 30px !important;
          height: 30px !important;
          margin-left: 12px !important; /* 좌우 간격 합쳐서 12px 효과 */
          margin-right: 12px !important;
        }

        /* 활성 슬라이드 주변 시각적으로 더 넓게 보이게 전환 효과 */
        .custom-thumb-swiper .thumb-slide,
        .custom-thumb-swiper .swiper-slide-active {
          transition: all 0.25s ease;
        }
      `}</style>
    </div>
  );
}
