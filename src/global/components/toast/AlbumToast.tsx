import { AlertCircle } from 'lucide-react';
type AlbumToastProps = {
  message: string;
  style?: React.CSSProperties;
};

export default function AlbumToast({ message, style }: AlbumToastProps) {
  const bottomPx = style?.bottom ?? 88;
  console.log('토스트 인식됨', message);
  return (
    <div
      className='bg-surface-info pointer-events-none fixed right-4 left-4 z-[9999] flex h-14 items-center rounded-xl px-5'
      style={{ bottom: `calc(${bottomPx}px + env(safe-area-inset-bottom))` }}
    >
      <div className='typo-body-md-medium text-text-basic-inverse pointer-events-auto flex items-center gap-2'>
        <AlertCircle width={20} height={20} />
        <span>{message}</span>
      </div>
    </div>
  );
}

export function AlbumToastList({ toasts }: { toasts: string[] }) {
  const TOAST_HEIGHT = 48; // px
  const GAP = 12; // px
  return (
    <>
      {toasts.map((message, idx) => (
        <AlbumToast
          key={idx}
          message={message}
          style={{ bottom: 88 + idx * (TOAST_HEIGHT + GAP) }}
        />
      ))}
    </>
  );
}
