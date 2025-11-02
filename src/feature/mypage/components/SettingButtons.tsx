'use client';
import Link from 'next/link';
import ButtonDeleteAccount from './ButtonDeleteAccount';
import ButtonLogout from './ButtonLogout';

interface SettingButtonsProps {}

export default function SettingButtons({}: SettingButtonsProps) {
  return (
    <section className='typo-body-lg-medium text-text-subtle flex flex-col px-6'>
      <Link className='py-4' href='/'>
        서비스 이용약관
      </Link>
      <Link className='py-4' href='/'>
        개인정보 처리방침
      </Link>
      <ButtonLogout />
      <ButtonDeleteAccount />
    </section>
  );
}
