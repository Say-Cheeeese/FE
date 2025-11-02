'use client';
import Image from 'next/image';

export default function KakaoSignupButton() {
  const KAKAO_AUTH_URL = 'https://dev.say-cheese.me/oauth2/authorization/kakao';
  const handleKakaoLogin = async () => {
    try {
      window.location.href = KAKAO_AUTH_URL ?? '';
    } catch (err) {
      console.error('카카오 인증 GET 요청 실패:', err);
    }
  };
  return (
    <div
      className='mb-[171px] flex h-[56px] w-full cursor-pointer items-center justify-center gap-2 rounded-[6px] bg-[#FEE500]'
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
