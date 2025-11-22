'use client';
import LongButton from '@/global/components/LongButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ScreenOnboardingComplete() {
  const router = useRouter();
  const handleStartClick = () => {
    let entry: string | null = null;
    if (typeof document !== 'undefined') {
      // 쿠키에서 entry 값 읽기
      const match = document.cookie.match(/(?:^|; )entry=([^;]*)/);
      entry = match ? decodeURIComponent(match[1]) : null;
    }
    if (entry === 'create-album') {
      router.push('/create-album');
    } else {
      router.push('/main');
    }
    // entry 쿠키 삭제 (만료일을 과거로)
    if (typeof document !== 'undefined') {
      const domain =
        process.env.NODE_ENV === 'production' ? '.say-cheese.me' : undefined;
      document.cookie = `entry=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domain ? `; domain=${domain}` : ''}`;
    }
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
