import PhotoBox from '@/global/components/photo/PhotoBox';

const photos = [
  { imageSrc: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d' },
  { imageSrc: 'https://images.unsplash.com/photo-1519681393784-d120267933ba' },
  { imageSrc: 'https://images.unsplash.com/photo-1506765515384-028b60a970df' },
  { imageSrc: 'https://images.unsplash.com/photo-1438109491414-7198515b166b' },
  { imageSrc: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf' },
  { imageSrc: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e' },
  { imageSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
];

interface PhotoListProps {}

export default function PhotoList({}: PhotoListProps) {
  return (
    <section className='p-4'>
      <div className='typo-body-lg-regular text-text-subtle mb-3'>
        총 2000장
      </div>
      <div className='grid grid-cols-3 gap-0.5'>
        {photos.map((photo, i) => (
          <PhotoBox
            key={i}
            likeCount={0}
            imageSrc={photo.imageSrc}
            responsive
          />
        ))}
      </div>
    </section>
  );
}
