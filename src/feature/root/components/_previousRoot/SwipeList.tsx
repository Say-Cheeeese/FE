import MarqueeCarousel from '@/global/components/carousel/MarqueeCarousel';
import Image from 'next/image';

const SWIPE_IMAGES = [
  '/assets/rending/swipe/1.png',
  '/assets/rending/swipe/2.png',
  '/assets/rending/swipe/3.png',
  '/assets/rending/swipe/4.png',
];

export default function SwipeList() {
  return (
    <MarqueeCarousel
      items={SWIPE_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`스와이프 이미지 ${i + 1}`}
          width={163}
          height={135}
          className='rounded-[13px] object-cover'
        />
      ))}
      itemWidth={163}
      gap={0}
      speed={60}
      className='py-2'
    />
  );
}
