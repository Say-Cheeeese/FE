import { ChevronDown } from 'lucide-react';

interface ButtonMoreProps {}

export default function ButtonMore({}: ButtonMoreProps) {
  return (
    <button
      type='button'
      className='bg-button-tertiary-fill flex w-full justify-center rounded-lg py-3'
    >
      <span className='text-body-lg-semibold text-text-subtle'>1개 더보기</span>
      <ChevronDown color={'var(--color-text-subtle)'} width={20} height={20} />
    </button>
  );
}
