import { ChevronDown } from 'lucide-react';

interface ButtonMoreProps {
  onClick?: () => void;
  moreCount: number;
}

export default function ButtonMore({ onClick, moreCount }: ButtonMoreProps) {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='bg-button-tertiary-fill flex w-full justify-center rounded-lg py-3'
    >
      <span className='typo-body-lg-semibold text-text-subtle'>
        {moreCount}개 더보기
      </span>
      <ChevronDown color={'var(--color-text-subtle)'} width={20} height={20} />
    </button>
  );
}
