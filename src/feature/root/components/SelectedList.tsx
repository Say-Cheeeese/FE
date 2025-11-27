'use client';

function debounce<T extends unknown[]>(
  func: (...args: T) => void,
  wait: number,
) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface SelectedListProps {
  selectedMenu: 'first' | 'second' | 'third';
  setSelectedMenu: (menu: 'first' | 'second' | 'third') => void;
}

const MENU_IMAGES = [
  { key: 'first', src: '/assets/rending/first.svg', alt: '7일 설명' },
  { key: 'second', src: '/assets/rending/second.svg', alt: '띱 설명' },
  { key: 'third', src: '/assets/rending/third.svg', alt: '치즈네컷 설명' },
];

export default function SelectedList({
  selectedMenu,
  setSelectedMenu,
}: SelectedListProps) {
  const selectedIdx =
    selectedMenu === 'first'
      ? 0
      : selectedMenu === 'second'
        ? 1
        : selectedMenu === 'third'
          ? 2
          : 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingProgrammatically = useRef(false);
  const ITEM_WIDTH = '100%'; // 각 아이템의 너비 (부모 컨테이너에서 좌우 패딩 및 간격 제외한 값)

  // 스크롤 시 중앙에 가장 가까운 이미지의 index 계산 및 상태 변경 (debounce 적용)

  const handleScrollCore = () => {
    if (!containerRef.current) return;
    if (isScrollingProgrammatically.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const children = containerRef.current.children;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < children.length; i++) {
      const childRect = children[i].getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const distance = Math.abs(childCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    const newMenu = MENU_IMAGES[closestIndex].key as
      | 'first'
      | 'second'
      | 'third';
    if (newMenu !== selectedMenu) {
      setSelectedMenu(newMenu);
    }
  };

  const handleScroll = debounce(handleScrollCore, 50);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = container.children;

    if (children[selectedIdx]) {
      const targetChild = children[selectedIdx] as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetChild.getBoundingClientRect();

      const scrollLeft =
        container.scrollLeft +
        (targetRect.left - containerRect.left) -
        (containerRect.width / 2 - targetRect.width / 2);

      isScrollingProgrammatically.current = true;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });

      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 500);
    }
  }, [selectedIdx]);

  return (
    <div className='relative mt-8 flex w-full flex-col items-center gap-5 overflow-x-visible'>
      <div
        ref={containerRef}
        className='scrollbar-hide flex justify-start gap-4 overflow-x-scroll scroll-smooth px-[42px]'
        style={{ scrollSnapType: 'x mandatory' }}
        onScroll={handleScroll}
      >
        {MENU_IMAGES.map((image) => (
          <div
            key={image.key}
            className='flex shrink-0 items-center justify-center'
            style={{ width: ITEM_WIDTH, scrollSnapAlign: 'center' }}
          >
            <Image
              src={image.src}
              width={0}
              height={326}
              alt={image.alt}
              loading='lazy'
              className='rounded-[12px] object-cover'
              style={{ width: '100%', height: '326px' }}
            />
          </div>
        ))}
      </div>
      <div className='flex gap-4'>
        {MENU_IMAGES.map((image, idx) => (
          <div
            key={image.key}
            className={
              `h-2.5 w-2.5 cursor-pointer rounded-full ` +
              (selectedIdx === idx
                ? 'bg-element-gray'
                : 'bg-element-gray-light')
            }
            onClick={() =>
              setSelectedMenu(image.key as 'first' | 'second' | 'third')
            }
          />
        ))}
      </div>
    </div>
  );
}
