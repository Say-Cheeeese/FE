'use client';

interface SpinnerProps {
  size?: number | string;
  colorClassName?: string;
}

export default function Spinner({
  size = 24,
  colorClassName = 'border-white',
}: SpinnerProps) {
  const dimension =
    typeof size === 'number'
      ? `${size}px`
      : typeof size === 'string'
        ? size
        : '24px';

  return (
    <div
      className='animate-spin rounded-full border-2 border-t-transparent'
      style={{ width: dimension, height: dimension }}
      aria-label='loading'
    >
      <div
        className={`h-full w-full rounded-full ${colorClassName}`}
        style={{
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'currentColor',
        }}
      />
    </div>
  );
}
