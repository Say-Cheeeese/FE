'use client';
import LongButton from '@/global/components/LongButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ScreenOnboardingComplete() {
  const router = useRouter();
  const handleStartClick = () => {
    const entry =
      typeof window !== 'undefined' ? localStorage.getItem('entry') : null;
    if (entry === 'create-album') {
      router.push('/create-album');
    } else {
      router.push('/main');
    }
    localStorage.removeItem('entry');
  };
  return (
    <div className='mt-[37dvh] flex flex-col items-center'>
      <Image
        src='/assets/onboarding/congratulation.svg'
        width={132}
        height={92}
        alt='환영합니다'
        priority
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
