'use client';

type MarqueeCarouselProps = {
  items: React.ReactNode[];
  itemWidth: number;
  gap?: number;
  speed?: number; // px/s
  className?: string;
};

export default function MarqueeCarousel({
  items,
  itemWidth,
  gap = 16,
  speed = 80,
  className = '',
}: MarqueeCarouselProps) {
  const trackWidth = (itemWidth + gap) * items.length;

  const duration = trackWidth / speed;

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className='animate-marquee flex shrink-0'
        style={{
          width: `${trackWidth * 2}px`,
          gap: `${gap}px`,
          animationDuration: `${duration}s`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{ flex: '0 0 auto', width: itemWidth }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
