interface SpinnerProps {
  color?: string; // ex) '#3B82F6', 'rgb(59,130,246)', 'var(--primary)'
  size?: number; // px 단위
}

export default function Spinner({
  color = '#ffffff', // 기본값 (tailwind primary-400 정도)
  size = 32,
}: SpinnerProps) {
  return (
    <div className='flex h-full w-full items-center justify-center py-10'>
      <svg
        className='animate-spin'
        style={{
          color,
          width: size,
          height: size,
        }}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
        />
      </svg>
    </div>
  );
}
