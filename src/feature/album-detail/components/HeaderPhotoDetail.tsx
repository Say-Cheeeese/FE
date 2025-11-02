import { X } from 'lucide-react';

interface HeaderPhotoDetailProps {}

export default function HeaderPhotoDetail({}: HeaderPhotoDetailProps) {
  return (
    <section className='flex items-center justify-between gap-3 p-5'>
      <div>
        <img src='/assets/onboarding/smile1.svg' width='32' height='32' />
      </div>
      <span className='typo-heading-sm-semibold text-text-basic-inverse w-full'>
        김수한무거북이와두루
      </span>
      <button type='button'>
        <X width='24' height='24' color='white' />
      </button>
    </section>
  );
}
