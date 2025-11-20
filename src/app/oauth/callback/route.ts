import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/global/constants/cookies';
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
      `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/exchange?code=${code}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`요청 실패: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host =
      request.headers.get('x-forwarded-host') ||
      request.headers.get('host') ||
      'localhost:3000';

    // ----- entry 쿠키 기준 서버 분기 -----
    const cookieDomain =
      process.env.NODE_ENV === 'production' ? '.say-cheese.me' : undefined;

    // 쿠키 파싱 (Next.js 13+ 방식)
    const entry = request.cookies.get('entry')?.value ?? null;

    let redirectPath = '/main';
    if (data.result.isOnboarded) {
      if (entry === 'create-album') {
        redirectPath = '/create-album';
      }
    } else {
      redirectPath = '/onboarding';
    }
    const redirectUrl = new URL(redirectPath, `${protocol}://${host}`);

    if (!data.result.isOnboarded) {
      redirectUrl.searchParams.set(
        'onboarding',
        data.result.isOnboarded.toString(),
      );
      redirectUrl.searchParams.set(
        'name',
        encodeURIComponent(data.result.name),
      );
    }

    // redirect 응답 객체 생성
    const res = NextResponse.redirect(redirectUrl);
    res.cookies.set(ACCESS_TOKEN_KEY, data.result.accessToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      domain: cookieDomain,
      maxAge: 60 * 60 * 2, // 2시간
      path: '/',
    });
    res.cookies.set(REFRESH_TOKEN_KEY, data.result.refreshToken, {
      secure: process.env.NODE_ENV === 'production',
      domain: cookieDomain,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });
    // entry 쿠키 삭제 (만료일을 과거로)
    res.cookies.set('entry', '', {
      path: '/',
      expires: new Date(0),
      domain: cookieDomain,
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
