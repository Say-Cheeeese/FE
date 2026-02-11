import { X } from 'lucide-react';
import { use4CutAiSummary } from '../hooks/use4CutAiSummary';

interface Container4CutExplanationProps {
  albumId: string;
  eventName?: string;
  eventDate?: string;
  scale?: number;
  width?: number;
  isFinalized?: boolean;
  onClose?: () => void;
}

const BASE_WIDTH = 216;
const BASE_HEIGHT = 384;
const BASE_ASPECT_RATIO = BASE_HEIGHT / BASE_WIDTH;

export default function Container4CutExplanation({
  albumId,
  eventName,
  eventDate,
  scale = 1,
  width,
  isFinalized = false,
  onClose,
}: Container4CutExplanationProps) {
  const calculatedWidth = width ?? BASE_WIDTH * scale;
  const calculatedHeight = calculatedWidth * BASE_ASPECT_RATIO;
  const { aiSummary } = use4CutAiSummary(albumId);

  return (
    <div
      className='bg-element-letter relative overflow-hidden font-medium'
      style={{
        width: `${calculatedWidth}px`,
        height: `${calculatedHeight}px`,
        borderRadius: '8px',
        ...(isFinalized && {
          boxShadow: '0px 0px 25px 5px rgba(0, 0, 0, 0.08)',
        }),
      }}
    >
      {/* 헤더: 제목 + 날짜 + X 버튼 */}
      <div className='flex justify-between p-4'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-text-basic typo-body-lg-semibold'>
            {eventName || '인생네컷'}
          </h2>
          {eventDate && (
            <p className='text-text-subtler typo-caption-sm-medium'>
              {eventDate}
            </p>
          )}
        </div>
        {/* X 버튼 */}
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-element-primary-light'>
          <button
            onClick={onClose}
            className='flex items-center justify-center'
            aria-label='닫기'
          >
            <X className='text-text-secondary h-5 w-5' />
          </button>
        </div>
      </div>

      {/* Body: 텍스트 설명 */}
      <div className='flex h-full flex-col justify-start px-4'>
        <div className='bg-surface-white rounded-lg p-4 h-[320px]'>
          <p className='text-text-basic text-sm leading-relaxed whitespace-pre-wrap'>
            {aiSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
