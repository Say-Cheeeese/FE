'use client';
import { CountdownTimer } from '@/global/components/CountdownTimer';
import LongButton from '@/global/components/LongButton';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CreateCompleteProps {
  albumId: string;
}

export default function CreateComplete({ albumId }: CreateCompleteProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/album/upload/${albumId}}`);
  };

  return (
    <div className='mt-[210px] flex flex-col items-center gap-4'>
      <div className='bg-element-primary flex h-[74px] w-[74px] items-center justify-center rounded-full'>
        <Check width={50} height={34} stroke='#fff' strokeWidth={3} />
      </div>
      <div className='mb-8 flex flex-col'>
        <span className='typo-heading-md-medium text-center'>만들기 성공!</span>
        <span className='typo-heading-md-semibold'>앨범이 열렸어요</span>
      </div>
      <CountdownTimer albumId={albumId} />
      <LongButton text='시작하기' noFixed={false} onClick={handleClick} />
    </div>
  );
}
