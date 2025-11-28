'use client';
import LongButton from '@/global/components/LongButton';
import { clearEntryCookie, getEntryCookie } from '@/global/utils/cookies';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function ScreenOnboardingComplete() {
  const router = useRouter();

  const handleStartClick = useCallback(() => {
    const entry = getEntryCookie();

    if (entry === 'create-album') {
      router.push('/create-album');
    } else {
      router.push('/main');
    }

    clearEntryCookie();
  }, [router]);
  return (
    <div className='mt-[37dvh] flex flex-col items-center'>
      <Image
        src='/assets/onboarding/congratulation.svg'
        width={132}
        height={92}
        alt='환영합니다'
        priority
        fetchPriority='high'
      />
      <span className='typo-heading-md-bold text-text-subtle text-center'>
        치이이즈에
        <br />
        오신 걸 환영해요
      </span>
      <LongButton
        text='치이이즈 시작하기'
        noFixed={false}
        onClick={handleStartClick}
      />
    </div>
  );
}
