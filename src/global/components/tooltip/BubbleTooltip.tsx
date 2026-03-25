import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BubbleTooltipProps {
  /** 텍스트나 아이콘이 함께 포함된 문장 */
  message: ReactNode;
  /** 기본은 가운데 정렬 */
  align?: 'center' | 'left' | 'right';
  /** 테두리 표시 여부 */
  showBorder?: boolean;
  /** 말풍선 본체 스타일 커스터마이징 */
  bubbleClassName?: string;
  /** 메시지(텍스트) 영역 스타일 커스터마이징 */
  messageClassName?: string;
  /** 꼬다리 스타일 커스터마이징 */
  tailClassName?: string;
  /** 꼬다리 위치 */
  tailPosition?: 'bottom' | 'top';
  className?: string;
}

export default function BubbleTooltip({
  message,
  align = 'center',
  showBorder = false,
  bubbleClassName = '',
  messageClassName = '',
  tailClassName = '',
  tailPosition = 'bottom',
  className = '',
}: BubbleTooltipProps) {
  const alignClass =
    align === 'center' ? 'mx-auto' : align === 'left' ? 'mr-auto' : 'ml-auto';

  const tailPositionClass =
    tailPosition === 'top'
      ? 'absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2'
      : 'absolute top-[85%] left-1/2 h-3 w-3 -translate-x-1/2';

  return (
    <div className={cn(className)}>
      <div
        className={cn(
          'relative w-fit rounded-2xl bg-white px-4 py-[9px] shadow-[0_2px_8px_rgba(0,0,0,0.15)]',
          showBorder && 'border border-white/30',
          alignClass,
          bubbleClassName,
        )}
      >
        <div
          className={cn(
            'typo-body-sm-semibold text-text-basic flex items-center space-x-2',
            messageClassName,
          )}
        >
          <span className='whitespace-nowrap'>{message}</span>
        </div>

        {/* 꼬다리 */}
        <div className={tailPositionClass}>
          <div
            className={cn(
              'absolute inset-0 rotate-45 bg-white shadow-[2px_3px_4px_rgba(0,0,0,0.1)]',
              tailClassName,
            )}
          />
        </div>
      </div>
    </div>
  );
}
