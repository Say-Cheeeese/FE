'use client';
import Link from 'next/link';

interface SettingButtonsProps {}

export default function SettingButtons({}: SettingButtonsProps) {
  return (
    <section className='typo-body-lg-medium text-text-subtle flex flex-col px-6'>
      <Link className='py-4' href='/onboarding?term=terms'>
        서비스 이용약관
      </Link>
      <Link className='py-4' href='/onboarding?term=privacy'>
        개인정보 처리방침
      </Link>
      {/* TODO : 기능 만들기 전까지 주석처리 */}
      {/* <ButtonLogout />
      <ButtonDeleteAccount /> */}
    </section>
  );
}
