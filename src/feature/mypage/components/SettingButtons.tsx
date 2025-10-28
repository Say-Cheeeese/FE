'use client';
import Link from 'next/link';
import { ButtonLogout } from './ButtonLogout';
import ButtonDeleteAccount from './ButtonDeleteAccount';

interface SettingButtonsProps {
  onLogout?: () => Promise<void> | void; // next-auth 사용 시 () => signOut()
}

export default function SettingButtons({ onLogout }: SettingButtonsProps) {
  async function handleLogout() {
    try {
      if (onLogout) await onLogout();
      // 예: next-auth
      // await signOut({ callbackUrl: '/' })
      // 또는 커스텀 API
      // await fetch('/api/logout', { method: 'POST' })
    } catch (e) {
      console.error(e);
    }
  }

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
