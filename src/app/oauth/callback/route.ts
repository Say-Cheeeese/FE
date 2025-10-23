import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  console.log('인가 코드:', code);

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
      throw new Error('Backend authentication failed');
    }

    const data = await response.json();
    console.log('가져온 데이터', data);

    // 토큰을 HttpOnly 쿠키로 설정
    const responseWithCookies = NextResponse.json({
      isSuccess: data.isSuccess,
      message: data.message,
      user: {
        userId: data.result.userId,
        name: data.result.name,
        email: data.result.email,
      },
    });

    // HttpOnly 쿠키 설정
    responseWithCookies.cookies.set('accessToken', data.result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1시간
      path: '/',
    });

    responseWithCookies.cookies.set('refreshToken', data.result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    // 성공적으로 토큰 설정 후 /onboarding으로 리다이렉트
    const redirectUrl = new URL('/onboarding', request.url);
    redirectUrl.searchParams.set('login', 'success');
    redirectUrl.searchParams.set('userId', data.result.userId);
    redirectUrl.searchParams.set('name', encodeURIComponent(data.result.name));
    console.log('리다이렉트 URL:', redirectUrl.toString());
    console.log('설정된 사용자 정보:', {
      userId: data.result.userId,
      name: data.result.name,
      email: data.result.email,
    });
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
