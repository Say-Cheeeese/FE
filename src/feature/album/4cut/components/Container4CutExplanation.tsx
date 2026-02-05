import { X } from 'lucide-react';

interface Container4CutExplanationProps {
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
  eventName,
  eventDate,
  scale = 1,
  width,
  isFinalized = false,
  onClose,
}: Container4CutExplanationProps) {
  const calculatedWidth = width ?? BASE_WIDTH * scale;
  const calculatedHeight = calculatedWidth * BASE_ASPECT_RATIO;

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
            <p className='text-text-subtler typo-caption-sm-medium'>{eventDate}</p>
          )}
        </div>
        {/* X 버튼 */}
        <button
          onClick={onClose}
          className='rounded-full p-1 transition-colors hover:bg-gray-100'
          aria-label='닫기'
        >
          <X className='text-text-secondary h-5 w-5' />
        </button>
      </div>

      {/* Body: 텍스트 설명 */}
      <div className='flex h-full flex-col justify-center p-4'>
        <div className='bg-surface-white rounded-lg p-4'>
          <div className='space-y-3'>
            <p className='text-text-basic text-sm leading-relaxed'>
              여러분의 소중한 순간을 4장의 사진으로 담아내는 특별한 기능입니다.
            </p>

            <div className='space-y-2'>
              <p className='text-text-secondary text-sm font-semibold'>
                ✨ 특징
              </p>
              <ul className='text-text-secondary space-y-1 pl-4 text-sm'>
                <li>• 앨범의 베스트 사진 4장 자동 선정</li>
                <li>• 인생네컷 스타일 레이아웃</li>
                <li>• 다운로드 및 공유 가능</li>
              </ul>
            </div>

            <div className='space-y-2'>
              <p className='text-text-secondary text-sm font-semibold'>
                💡 사용 방법
              </p>
              <p className='text-text-secondary text-sm leading-relaxed'>
                메이커가 사진을 확정하면 자동으로 생성됩니다. 다운로드 버튼을
                눌러 저장하세요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
