import PhotoBox from '@/global/components/photo/PhotoBox';

const photos = [
  { imageSrc: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d' },
  { imageSrc: 'https://images.unsplash.com/photo-1519681393784-d120267933ba' },
  { imageSrc: 'https://images.unsplash.com/photo-1506765515384-028b60a970df' },
  { imageSrc: 'https://images.unsplash.com/photo-1438109491414-7198515b166b' },
  { imageSrc: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf' },
  { imageSrc: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e' },
  { imageSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
  { imageSrc: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c' },
  { imageSrc: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df' },
  { imageSrc: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa' },
  { imageSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
  { imageSrc: 'https://images.unsplash.com/photo-1554151228-14d9def656e4' },
  { imageSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9' },
  { imageSrc: 'https://images.unsplash.com/photo-1506086679525-9f8b7b91b9a6' },
  { imageSrc: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7' },
  { imageSrc: 'https://images.unsplash.com/photo-1551829142-7c3b1c7a1a6f' },
];

interface PhotoListProps {}

export default function PhotoList({}: PhotoListProps) {
  return (
    <section>
      <div>총 2000장</div>
      <div className='grid grid-cols-3 gap-2'>
        {photos.map((photo, i) => (
          <PhotoBox key={i} imageSrc={photo.imageSrc} responsive />
        ))}
      </div>
    </section>
  );
}
