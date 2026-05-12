'use client';
import { buildQuery } from '@/global/utils/buildQuery';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import { cn } from '@/lib/utils';

interface KakaoSignupButtonProps {
  className?: string;
  redirect?: string;
  entrySource?: string;
}

export default function KakaoSignupButton({
  className,
  redirect: customRedirect,
  entrySource,
}: KakaoSignupButtonProps) {
  const searchParams = useSearchParams();
  const redirect = customRedirect || searchParams.get('redirect');

  const KAKAO_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao`;
  const handleKakaoLogin = async () => {
    try {
      trackGaEvent(GA_EVENTS.click_login, {
        entry_source: entrySource ?? 'unknown',
      });

      const kakaoUrl =
        redirect && typeof redirect === 'string'
          ? `${KAKAO_AUTH_URL}${buildQuery({ redirect })}`
          : KAKAO_AUTH_URL;

      window.location.href = kakaoUrl;
    } catch (err) {
      console.error('카카오 인증 GET 요청 실패:', err);
    }
  };
  return (
    <div
      className={cn(
        'flex h-[56px] w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#FEE500]',
        className,
      )}
      onClick={handleKakaoLogin}
    >
      <Image
        src='/assets/login/kakao-logo.svg'
        width={18}
        height={18}
        alt='카카오 로고'
      />
      <span className='text-15-600 text-[rgba(0,0,0,0.85)]'>카카오 로그인</span>
    </div>
  );
}
