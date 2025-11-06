import { X } from 'lucide-react';

interface HeaderPhotoDetailProps {}

export default function HeaderPhotoDetail({}: HeaderPhotoDetailProps) {
  const handleClose = (): void => {
    // TODO : X버튼 클릭로직 구현
  };

  return (
    <section className='flex shrink-0 items-center justify-between gap-3 p-5'>
      <div className='h-8 w-8 shrink-0'>
        <img
          src='/assets/onboarding/smile1.svg'
          alt='프로필사진'
          width='32'
          height='32'
          className='h-full w-full'
        />
      </div>
      <span className='typo-heading-sm-semibold text-text-basic-inverse flex-1 truncate'>
        김수한무거북이와두루
      </span>
      <button type='button' onClick={handleClose}>
        <X width='24' height='24' color='white' />
      </button>
    </section>
  );
}
