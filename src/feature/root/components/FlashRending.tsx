import Image from 'next/image';

const FlashRending = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-[#FFCD14]'>
      <Image
        src='/assets/login/white-cheese-logo.svg'
        alt='Cheese Logo'
        width={169}
        height={36}
        priority
      />
    </div>
  );
};

export default FlashRending;
