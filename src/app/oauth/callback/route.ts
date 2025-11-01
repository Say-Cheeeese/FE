import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Authorization code is required' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DEV_URL}/v1/auth/exchange?code=${code}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('kakao code GET요청 중 200응답이 아닌 다른 응답 발생');
    }

    const data = await response.json();
    console.log('카카오 인증 응답 data:', data);

    // ✅ 쿠키 세팅 및 리디렉션
    const redirectPath = data.result.isOnboarded ? '/main' : '/onboarding';
    const redirectUrl = new URL(redirectPath, request.url);
    redirectUrl.searchParams.set('login', 'success');
    redirectUrl.searchParams.set(
      'onboarding',
      data.result.isOnboarded.toString(),
    );
    redirectUrl.searchParams.set('userId', data.result.userId);
    redirectUrl.searchParams.set('name', encodeURIComponent(data.result.name));

    // redirect 응답 객체 생성
    const res = NextResponse.redirect(redirectUrl);

    // ✅ 쿠키 설정 (redirect 응답에 바로 세팅)
    res.cookies.set('ACCESS_TOKEN', data.result.accessToken, {
      httpOnly: true, // 보안상 true 권장
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 2, // 2시간
      path: '/',
    });

    res.cookies.set('REFRESH_TOKEN', data.result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.json(
      { error: '서버사이드에서 토큰 처리 중 오류 발생' },
      { status: 500 },
    );
  }
}
