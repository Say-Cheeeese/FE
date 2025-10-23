'use client';
import Image from 'next/image';

export default function KakaoSignupButton() {
  const KAKAO_AUTH_URL = process.env.NEXT_PUBLIC_KAKAO_AUTH_URL;
  const handleKakaoLogin = async () => {
    try {
      window.location.href = KAKAO_AUTH_URL ?? '';
    } catch (err) {
      console.error('카카오 인증 GET 요청 실패:', err);
    }
  };
  return (
    <div
      className='flex justify-center items-center gap-2 w-full h-[56px] bg-[#FEE500] rounded-[6px] cursor-pointer mb-[171px]'
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
