import Link from 'next/link';

export default function RendingFooter() {
  return (
    <div className='-mx-4 mt-8 flex h-[124px] w-[calc(100%+32px)] flex-col items-start bg-[rgba(0,0,0,0.85)] pt-[14px] pl-[19px] text-[#fff]'>
      <span className='text-14-600'>치이이즈</span>
      <span className='mb-[10px] text-[7.54px] text-[600]'>
        @치이이즈. ALL RIGHTS RESERVED
      </span>
      <a
        href='https://forms.gle/Y7L8bbdUnajLSneH9'
        target='_blank'
        rel='noopener noreferrer'
        className='cursor-pointer text-[7.54px] text-[600]'
      >
        버그 및 불편사항 제보
      </a>
      <Link
        href='/term?type=terms'
        className='cursor-pointer text-[7.54px] text-[600]'
      >
        개인정보처리방침 | 서비스 이용약관
      </Link>
    </div>
  );
}
