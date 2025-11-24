import { cn } from '@/lib/utils';

interface BubbleTooltipProps {
  /** 텍스트나 아이콘이 함께 포함된 문장 */
  message: string;
  /** 기본은 가운데 정렬 */
  align?: 'center' | 'left' | 'right';
  className?: string;
}

export default function BubbleTooltip({
  message,
  align = 'center',
  className = '',
}: BubbleTooltipProps) {
  const alignClass =
    align === 'center' ? 'mx-auto' : align === 'left' ? 'mr-auto' : 'ml-auto';

  return (
    <div className={cn('absolute', className)}>
      <div
        className={`relative w-fit rounded-2xl bg-white px-4 py-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] ${alignClass}`}
      >
        <div className='typo-body-sm-semibold text-text-basic flex items-center space-x-2 whitespace-nowrap'>
          <span className='whitespace-nowrap'>{message}</span>
        </div>

        {/* 꼬다리 */}
        <div className='absolute top-[85%] left-1/2 h-3 w-3 -translate-x-1/2'>
          <div className='absolute inset-0 rotate-45 bg-white shadow-[2px_3px_4px_rgba(0,0,0,0.1)]' />
        </div>
      </div>
    </div>
  );
}
