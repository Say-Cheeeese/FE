'use client';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderPhotoDetailProps {
  title: string;
}

export default function HeaderPhotoDetail({ title }: HeaderPhotoDetailProps) {
  const router = useRouter();

  const handleClose = (): void => {
    router.back();
  };

  return (
    <section className='flex shrink-0 items-center justify-between gap-3 p-5'>
      <div className='h-8 w-8 shrink-0'>
        <img
          src='/assets/onboarding/smile1.svg'
          alt='프로필사진'
          width='32'
          height='32'
          className='h-full w-full'
        />
      </div>
      <span className='typo-heading-sm-semibold text-text-basic-inverse flex-1 truncate'>
        {title}
      </span>
      <button type='button' onClick={handleClose}>
        <X width='24' height='24' color='white' />
      </button>
    </section>
  );
}
