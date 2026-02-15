'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { buildQuery } from '@/global/utils/buildQuery';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const KAKAO_AUTH_URL = `https://dev.say-cheese.me/oauth2/authorization/kakao`;

export const RendingBody = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const slides = [
    {
      src: '/assets/rending/new-swipe/1.png',
      alt: '앨범 목록 화면',
      width: 260,
      height: 530.31,
      title: '이벤트마다 만드는 공유앨범',
      description: '감튀 모임부터 찐친 여행까지',
    },
    {
      src: '/assets/rending/new-swipe/2.png',
      alt: 'QR 코드 공유',
      width: 260,
      height: 530.31,
      title: '이벤트마다 모인 자리에서 바로 공유',
      description: '감튀 모임부터 앨범 만들고 초대까지 딱 10초',
    },
    {
      src: '/assets/rending/new-swipe/3.png',
      alt: '베스트컷',
      width: 312.56,
      height: 530.31,
      title: '이벤트마다 한눈에 보는 베스트컷',
      description: '사진 고르는 고민 이제 끝',
    },
    {
      src: '/assets/rending/new-swipe/4.png',
      alt: '네컷추억',
      width: 288.8,
      height: 530.31,
      title: '딱 네컷으로 남는 추억',
      description: '앨범이 닫히면 사라지는 원본 사진들',
    },
  ];

  // 캐러셀 API를 통해 현재 슬라이드 추적
  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!api) return;

    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // 왼쪽으로 스와이프 (다음)
      api.scrollNext();
    } else if (swipeDistance < -minSwipeDistance) {
      // 오른쪽으로 스와이프 (이전)
      api.scrollPrev();
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const kakaoUrl = redirect
        ? `${KAKAO_AUTH_URL}${buildQuery({ redirect })}`
        : KAKAO_AUTH_URL;

      window.location.href = kakaoUrl;
    } catch (err) {
      console.error('카카오 인증 GET 요청 실패:', err);
    }
  };

  return (
    <section className='bg-background-white-muted relative flex h-screen w-full flex-col'>
      {/* 이미지 영역 - 고정 (애니메이션 없음) */}
      <div className='flex h-screen w-full flex-col items-center justify-start px-4 pt-12'>
        <div
          className='relative w-full max-w-md'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex items-center justify-center overflow-hidden rounded-3xl transition-opacity duration-500 ${
                current === index
                  ? 'relative opacity-100'
                  : 'pointer-events-none absolute inset-0 opacity-0'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                className='object-contain'
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 하단 흰색 배경 영역 */}
      <div
        className='absolute bottom-0 z-10 flex h-[242px] w-full flex-col items-center bg-white px-4 pt-8'
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 20px)' }}
      >
        {/* 텍스트 및 인디케이터 영역 - 스와이프 가능 */}
        <Carousel
          setApi={setApi}
          className='w-full'
          opts={{
            loop: false,
            align: 'center',
          }}
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className='flex flex-col items-center'>
                  {/* 텍스트 영역 */}
                  <div className='mb-6 flex flex-col items-center text-center'>
                    <h2 className='text-text-basic text-[24px] font-[600]'>
                      {slide.title}
                    </h2>
                    <p className='mt-1 text-[16px] font-[500] text-[#746181]'>
                      {slide.description}
                    </p>
                  </div>

                  {/* 인디케이터 점들 */}
                  <div className='flex gap-2'>
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => api?.scrollTo(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          current === idx
                            ? 'w-6 bg-gray-700'
                            : 'w-1.5 bg-gray-200'
                        }`}
                        aria-label={`슬라이드 ${idx + 1}로 이동`}
                      />
                    ))}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* 카카오 로그인 버튼 - 고정 */}
        <div
          className='mt-auto flex h-[56px] w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#FEE500]'
          onClick={handleKakaoLogin}
        >
          <Image
            src='/assets/login/kakao-logo.svg'
            width={18}
            height={18}
            alt='카카오 로고'
          />
          <span className='text-[15px] font-[600] text-[rgba(0,0,0,0.85)]'>
            카카오 로그인
          </span>
        </div>
      </div>
    </section>
  );
};
