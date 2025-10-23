'use client';
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermHeader({ title }: { title: string }) {
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  return (
    <div className='w-full max-w-[430px] h-18 fixed top-0 left-1/2 -translate-x-1/2 bg-white z-50 flex items-center justify-start px-5 border-b border-divider-gray'>
      <div className='flex gap-2 items-center'>
        <button
          onClick={handleBackClick}
          className='p-0 m-0 bg-transparent border-none'
        >
          <ChevronLeft width={24} height={24} color='#424349' />
        </button>
        <span className='text-heading-md-bold text-text-subtle'>{title}</span>
      </div>
    </div>
  );
}
