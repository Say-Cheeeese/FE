import React from 'react';

interface LongButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  sideGap?: number; // 좌우 여백(px)
  bottomGap?: number; // 하단 여백(px)
  noFixed?: boolean; // true면 fixed 해제하고 가로 100% 채움
}

export default function LongButton({
  text,
  disabled = false,
  onClick,
  sideGap = 16,
  bottomGap = 20,
  noFixed = false,
}: LongButtonProps) {
  // noFixed가 true면 스타일 속성 없음, false면 left/right/bottom 값 적용
  const buttonStyle = noFixed
    ? {}
    : {
        left: `${sideGap}px`,
        right: `${sideGap}px`,
        bottom: `calc(${bottomGap}px + env(safe-area-inset-bottom))`,
      };

  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
      className={`text-body-1xl-semibold h-14 rounded-lg transition-colors duration-100 ${
        noFixed
          ? 'w-full' // noFixed일 때: 가로 100%
          : 'fixed z-50 mx-auto max-w-[430px]' // fixed일 때: 기존 스타일
      } ${
        disabled
          ? 'bg-button-disabled-fill text-text-disabled cursor-not-allowed'
          : 'bg-button-primary-fill text-text-primary active:bg-button-primary-fill-pressed active:text-text-primary'
      } `}
    >
      {text}
    </button>
  );
}
