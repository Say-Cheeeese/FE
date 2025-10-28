import Link from 'next/link';

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
      <button className='cursor-pointer py-4 text-left' type='button'>
        로그아웃
      </button>
      <button className='cursor-pointer py-4 text-left' type='button'>
        탈퇴하기
      </button>
    </section>
  );
}
