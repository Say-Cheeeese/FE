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
    // 백엔드 서버에 code 전송
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

    // 토큰을 HttpOnly 쿠키로 설정
    const responseWithCookies = NextResponse.json({
      isSuccess: data.isSuccess,
      message: data.message,
      user: {
        userId: data.result.userId,
        name: data.result.name,
        email: data.result.email,
        isOnboarded: data.result.isOnboarded,
      },
    });

    // HttpOnly 쿠키 설정
    responseWithCookies.cookies.set('accessToken', data.result.accessToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 2, // 2시간
      path: '/',
    });

    responseWithCookies.cookies.set('refreshToken', data.result.refreshToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    // isOnboarded 값에 따라 리다이렉트 경로 분기
    const redirectPath = data.result.isOnboarded ? '/main' : '/onboarding';
    const redirectUrl = new URL(redirectPath, request.url);
    redirectUrl.searchParams.set('login', 'success');
    redirectUrl.searchParams.set(
      'onboarding',
      data.result.isOnboarded.toString(),
    );
    redirectUrl.searchParams.set('userId', data.result.userId);
    redirectUrl.searchParams.set('name', encodeURIComponent(data.result.name));
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    return NextResponse.json(
      { error: '서버사이드에서 토큰 처리 중 오류 발생' },
      { status: 500 },
    );
  }
}
