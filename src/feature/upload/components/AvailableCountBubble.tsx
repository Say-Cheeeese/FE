type AvailableCountBubbleProps = {
  availableCount: number;
};

export default function AvailableCountBubble({
  availableCount,
}: AvailableCountBubbleProps) {
  return (
    <div className='relative mt-6 mb-4 px-6'>
      <div className='relative mx-auto w-fit rounded-full bg-white px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)]'>
        <div className='typo-body-md-medium text-text-basic flex items-center space-x-2'>
          <span role='img' aria-label='카메라'>
            📸
          </span>
          <span>지금 {availableCount}장 더 올릴 수 있어요</span>
        </div>
        <div className='absolute top-[85%] left-1/2 h-3 w-3 -translate-x-1/2'>
          <div className='absolute inset-0 rotate-45 bg-white shadow-[2px_3px_4px_rgba(0,0,0,0.1)]' />
        </div>
      </div>
    </div>
  );
}
