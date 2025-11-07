import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

type AlbumToastProps = {
  message: string;
  style?: React.CSSProperties;
  onDismiss?: () => void;
};

export default function AlbumToast({
  message,
  style,
  onDismiss,
}: AlbumToastProps) {
  const bottomPx = style?.bottom ?? 88;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!visible) return null;

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
  const [visibleToasts, setVisibleToasts] = useState<
    Array<{ id: number; message: string }>
  >([]);

  useEffect(() => {
    // 새로운 토스트가 추가되면 기존 것에 추가 (중복 방지)
    setVisibleToasts((prev) => {
      const newToasts = toasts
        .filter((msg) => !prev.some((t) => t.message === msg))
        .map((message) => ({
          id: Date.now() + Math.random(),
          message,
        }));
      return newToasts.length > 0 ? [...prev, ...newToasts] : prev;
    });
  }, [toasts]);

  const handleDismiss = (id: number) => {
    setVisibleToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <>
      {visibleToasts.map((toast, idx) => (
        <AlbumToast
          key={toast.id}
          message={toast.message}
          style={{ bottom: 88 + idx * (TOAST_HEIGHT + GAP) }}
          onDismiss={() => handleDismiss(toast.id)}
        />
      ))}
    </>
  );
}
