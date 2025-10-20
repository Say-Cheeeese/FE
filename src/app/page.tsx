import Image from 'next/image';

export default function LoginPage() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center gap-[17px]'>
        <Image
          src='/assets/login/cheese-icon.svg'
          width={120}
          height={120}
          alt='치즈 아이콘'
        />
        <Image
          src='/assets/login/cheese-logo.svg'
          width={120}
          height={120}
          alt='치즈 아이콘'
        />
        <span className='text-body-lg-semibold text-text-subtle'>
          우리가 특별한 순간을 기억하는 법
        </span>
      </div>
    </div>
  );
}
