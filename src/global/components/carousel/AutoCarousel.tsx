'use client';

import { useEffect, useRef, useState } from 'react';

type AutoCarouselProps = {
  items: React.ReactNode[];
  /** px단위로 표현 */
  itemWidth: number;
  /** px단위로 표현 */
  gap?: number;
  /** 카드 이동 속도 */
  speed?: number;
  className?: string;
};

export default function AutoCarousel({
  items,
  itemWidth,
  gap = 16,
  speed = 60,
  className = '',
}: AutoCarouselProps) {
  const [renderItems, setRenderItems] = useState<React.ReactNode[]>(items);
  const [offset, setOffset] = useState(0);

  const needShiftRef = useRef(false);

  useEffect(() => {
    setRenderItems(items);
    setOffset(0);
    needShiftRef.current = false;
  }, [items]);

  useEffect(() => {
    const unit = -(itemWidth + gap); // 한 카드가 완전히 빠지는 위치
    let raf: number;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      setOffset((prev) => {
        const next = prev - speed * dt;

        // 넘쳤으면, 지금은 offset만 보정하고
        // 실제 배열 회전은 다음 effect에서 처리
        if (next <= unit) {
          // 다음 프레임에 회전하라고 표시
          needShiftRef.current = true;

          return next - unit;
        }

        return next;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [itemWidth, gap, speed]);

  useEffect(() => {
    if (!needShiftRef.current) return;

    needShiftRef.current = false;

    setRenderItems((prev) => {
      if (prev.length === 0) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }, [offset]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className='flex'
        style={{
          gap: `${gap}px`,
          transform: `translateX(${offset}px)`,
          willChange: 'transform',
        }}
      >
        {renderItems.map((item, idx) => (
          <div key={idx} className='shrink-0' style={{ width: itemWidth }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
