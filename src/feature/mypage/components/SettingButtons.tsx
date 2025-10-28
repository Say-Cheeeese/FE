'use client';
import Link from 'next/link';
import ButtonLogout from './ButtonLogout';
import ButtonDeleteAccount from './ButtonDeleteAccount';

interface SettingButtonsProps {}

export default function SettingButtons({}: SettingButtonsProps) {
  return (
    <section className='text-body-lg-medium text-text-subtle flex flex-col px-6'>
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
