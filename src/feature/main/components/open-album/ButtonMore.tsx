import { ChevronDown } from 'lucide-react';

interface ButtonMoreProps {}

export default function ButtonMore({}: ButtonMoreProps) {
  const handleClick = () => {
    /** TODO 더보기동작 */
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='bg-button-tertiary-fill flex w-full justify-center rounded-lg py-3'
    >
      <span className='typo-body-lg-semibold text-text-subtle'>1개 더보기</span>
      <ChevronDown color={'var(--color-text-subtle)'} width={20} height={20} />
    </button>
  );
}
