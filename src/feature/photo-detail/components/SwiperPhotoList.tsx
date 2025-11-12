'use client';

import { PhotoListResponseSchema } from '@/global/api/ep';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { calcThumbSwiperCenterOffset } from '../util/calcThumbSwiperCenterOffset';

interface SwiperPhotoListProps {
  images?: PhotoListResponseSchema[];
  activeIndex: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult>;
  changeActiveIndex: (newIndex: number) => void;
}

export default function SwiperPhotoList({
  activeIndex,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  changeActiveIndex,
  images = [],
}: SwiperPhotoListProps) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperType | null>(null);
  const [thumbOffset, setThumbOffset] = useState(0);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 무한 스크롤: 하단(썸네일) Swiper에만 센티넬 부착
  useEffect(() => {
    if (!thumbSwiper || !loadMoreRef.current) return;

    const rootEl = thumbSwiper.el as HTMLElement;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: rootEl, // ✅ 썸네일 Swiper 내부 스크롤 기준
        rootMargin: '0px 200px 0px 0px', // ✅ 오른쪽 여유(조기 프리패치)
        threshold: 0.01,
      },
    );

    io.observe(loadMoreRef.current);
    return () => io.disconnect();
  }, [thumbSwiper, hasNextPage, isFetchingNextPage, fetchNextPage]);
  // images.length 변경 시 다시 observe (슬라이드 DOM 갱신 대비)

  useEffect(() => {
    const updateOffset = () => {
      const vw = window.innerWidth;
      setThumbOffset(
        calcThumbSwiperCenterOffset({
          viewportWidth: vw,
          activeMargin: 12,
          activeWidth: 30,
          inactiveWidth: 15,
          inactiveMargin: 2,
          index: 0,
        }),
      );
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  return (
    <>
      <div className='flex min-h-0 flex-1 flex-col gap-4'>
        {/* 위: 메인 이미지 Swiper */}
        <div className='h-0 min-h-0 flex-1'>
          <Swiper
            onSwiper={setMainSwiper}
            slidesPerView={1}
            spaceBetween={16}
            speed={0}
            className={`flex h-full w-full overflow-hidden`}
            onSlideChange={(sw) => {
              const idx = sw.activeIndex;
              changeActiveIndex(idx);
              if (thumbSwiper && !thumbSwiper.destroyed) {
                thumbSwiper.slideTo(sw.activeIndex);
              }
            }}
            onTap={(swiper, event) => {
              if (!swiper || swiper.destroyed) return;
              // 마우스/터치 겸용으로 clientX 추출
              const e = event as MouseEvent | TouchEvent;
              let clientX: number | null = null;

              if ('clientX' in e) {
                clientX = e.clientX;
              } else if ('changedTouches' in e && e.changedTouches.length > 0) {
                clientX = e.changedTouches[0].clientX;
              }

              if (clientX == null) return;

              const { left, width } = swiper.el.getBoundingClientRect();
              const clickPosition = clientX - left;

              if (clickPosition < width / 2) {
                swiper.slidePrev();
              } else {
                swiper.slideNext();
              }
            }}
          >
            {images.map(({ thumbnailUrl }, i) => {
              const isActive = activeIndex === i;
              return (
                <SwiperSlide key={i}>
                  <div className='flex h-full items-center justify-center'>
                    <img
                      src={thumbnailUrl}
                      fetchPriority={isActive ? 'high' : 'auto'}
                      loading={isActive ? 'eager' : 'lazy'}
                      alt={`photo-${i}`}
                      className='max-h-full max-w-full object-contain'
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* 아래: 썸네일 컨트롤러 */}
        <div className='mx-auto w-full max-w-md'>
          <Swiper
            onSwiper={setThumbSwiper}
            slidesPerView='auto'
            spaceBetween={2}
            slidesOffsetBefore={thumbOffset}
            slidesOffsetAfter={thumbOffset}
            watchSlidesProgress
            className='custom-thumb-swiper relative w-full px-3 py-2 backdrop-blur-md'
            onSlideChange={(sw) => {
              const idx = sw.activeIndex;
              changeActiveIndex(idx);
              if (mainSwiper && !mainSwiper.destroyed) {
                mainSwiper.slideTo(idx);
              }

              const vw = window.innerWidth;
              const offset = calcThumbSwiperCenterOffset({
                viewportWidth: vw,
                activeMargin: 12,
                activeWidth: 30,
                inactiveWidth: 15,
                inactiveMargin: 2,
                index: idx,
              });

              // 한 프레임 늦게 + 음수로
              requestAnimationFrame(() => {
                sw.setTranslate(offset);
              });
            }}
          >
            {images.map(({ thumbnailUrl }, i) => {
              const isActive = activeIndex === i;
              return (
                <SwiperSlide
                  key={i}
                  className={`thumb-slide ${isActive && 'mx-3!'} flex items-center justify-center`}
                  // TODO : tailwind로 아래 값을 관리할 경우, transition이 잘 적용되지 않는 문제가 있음.
                  style={{
                    width: isActive ? 30 : 15,
                    height: 30,
                    marginLeft: isActive ? 12 : 0,
                    marginRight: isActive ? 12 : 2,
                    transition: 'width 0.3s ease, margin 0.3s ease',
                  }}
                  onClick={() => {
                    changeActiveIndex(i);
                    mainSwiper?.slideTo(i);
                    thumbSwiper?.slideTo(i);
                  }}
                >
                  {/* TODO : 이미지 아직 불러오는 중일때 스켈레톤 띄우기 */}
                  <img
                    src={thumbnailUrl}
                    loading='lazy'
                    alt={`thumb-${i}`}
                    width={30}
                    height={30}
                    className='h-full w-full rounded-xs object-cover'
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}
