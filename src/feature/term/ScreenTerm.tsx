'use client';
import { TermContent } from '@/feature/onboarding/components/TermContent';
import CustomHeader from '@/global/components/header/CustomHeader';
import { useSearchParams } from 'next/navigation';

export default function ScreenTerm() {
  const searchParams = useSearchParams();
  const termType = searchParams.get('type');
  const currentTerm =
    termType && Object.prototype.hasOwnProperty.call(TermContent, termType)
      ? TermContent[termType as keyof typeof TermContent]
      : null;

  if (!currentTerm) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-white'>
        <span className='text-gray-400'>존재하지 않는 약관입니다.</span>
      </div>
    );
  }

  return (
    <div className='bg-white'>
      <CustomHeader title={currentTerm.title} isShowBack={true} />
      <div className='scrollbar-hide mt-6 px-5 pb-20'>
        <currentTerm.content />
      </div>
    </div>
  );
}
