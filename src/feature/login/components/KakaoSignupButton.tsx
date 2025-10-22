'use client';
import Image from 'next/image';

export default function KakaoSignupButton() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_DEV_URL}/oauth2/authorization/kakao`;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI || '',
  )}&response_type=code`;

  const handleKakaoLogin = async () => {
    try {
      const res = await fetch(REDIRECT_URI, {
        method: 'GET',
      });
      let data = await res.json();
      console.log('백엔드 응답:', data);
      // window.location.href = kakaoUrl;
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
