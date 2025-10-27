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
    <div className='border-divider-gray fixed top-0 left-1/2 z-50 flex h-18 w-full max-w-[430px] -translate-x-1/2 items-center justify-start border-b bg-white px-5'>
      <div className='flex items-center gap-2'>
        <button
          onClick={handleBackClick}
          className='m-0 border-none bg-transparent p-0'
        >
          <ChevronLeft width={24} height={24} color='#424349' />
        </button>
        <span className='text-heading-md-bold text-text-subtle'>{title}</span>
      </div>
    </div>
  );
}
