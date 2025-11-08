import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

type AlbumToastProps = {
  message: string;
  style?: React.CSSProperties;
  onDismiss?: () => void;
  delay?: number; // 사라지기 시작하는 시간에 추가할 delay
};

export default function AlbumToast({
  message,
  style,
  onDismiss,
  delay = 0,
}: AlbumToastProps) {
  const bottomPx = style?.bottom ?? 88;
  const [visible, setVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // fade-out 트랜지션 후 실제로 unmount
      setTimeout(() => {
        setShouldRender(false);
        onDismiss?.();
      }, 400); // 트랜지션 시간과 맞춤
    }, 4000 + delay);
    return () => clearTimeout(timer);
  }, [onDismiss, delay]);

  if (!shouldRender) return null;

  return (
    <div
      className='bg-surface-info pointer-events-none fixed z-[999] flex h-14 items-center rounded-xl px-5'
      style={{
        bottom: `calc(${bottomPx}px + env(safe-area-inset-bottom))`,
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s',
        maxWidth: '430px',
        width: 'calc(100% - 32px)',
      }}
    >
      <div className='typo-body-md-medium text-text-basic-inverse pointer-events-auto flex items-center gap-2'>
        <AlertCircle width={20} height={20} />
        <span>{message}</span>
      </div>
    </div>
  );
}

export function AlbumToastList({
  toasts,
  onRemove,
}: {
  toasts: string[];
  onRemove?: (message: string) => void;
}) {
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

  const handleDismiss = (id: number, message: string) => {
    setVisibleToasts((prev) => prev.filter((toast) => toast.id !== id));
    onRemove?.(message);
  };

  return (
    <>
      {visibleToasts.map((toast, idx) => (
        <AlbumToast
          key={toast.id}
          message={toast.message}
          style={{ bottom: 88 + idx * (TOAST_HEIGHT + GAP) }}
          delay={(visibleToasts.length - 1 - idx) * 500} // 위쪽(높은 idx)이 먼저 사라지도록, 0.5초씩 차이
          onDismiss={() => handleDismiss(toast.id, toast.message)}
        />
      ))}
    </>
  );
}
