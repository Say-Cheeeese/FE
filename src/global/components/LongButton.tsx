import React from 'react';

interface LongButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  sideGap?: number; // 좌우 여백(px)
}

export default function LongButton({
  text,
  disabled = false,
  onClick,
  sideGap = 16,
}: LongButtonProps) {
  const sideGapStyle = {
    left: sideGap,
    right: sideGap,
  };
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      style={sideGapStyle}
      className={`text-body-1xl-semibold fixed bottom-[calc(20px+env(safe-area-inset-bottom))] z-50 mx-auto h-14 max-w-[430px] rounded-lg transition-colors duration-100 ${
        disabled
          ? 'bg-button-disabled-fill text-text-disabled cursor-not-allowed'
          : 'bg-button-primary-fill text-text-primary active:bg-button-primary-fill-pressed active:text-text-primary'
      } `}
    >
      {text}
    </button>
  );
}
