import { cn } from '@/lib/utils';
import { Check, Heart } from 'lucide-react';

interface PhotoBoxProps {
  size?: number; // px
  likeCount?: number;
  liked?: boolean;
  downloaded?: boolean;
  pressed?: boolean;
  disabled?: boolean;
  imageSrc: string;
  imageAlt?: string;
  onPress?: (pressed: boolean) => void;
  onDisabledPress?: () => void; // disabled 상태에서 클릭 시 호출
}

export default function PhotoBox({
  size,
  likeCount = 0,
  liked = false,
  downloaded = false,
  pressed = false,
  disabled = false,
  imageSrc,
  imageAlt = '사진',
  onPress,
  onDisabledPress,
}: PhotoBoxProps) {
  // size가 없으면 w-full h-full로 부모를 채움
  const sizeClasses = size ? '' : 'h-full w-full';
  const baseSizeStyle = size
    ? {
        width: `${size}px`,
        height: `${size}px`,
      }
    : {};

  const showLike = 0 < likeCount;

  const handlePress = () => {
    if (disabled) {
      onDisabledPress?.();
      return;
    }
    const next = !pressed;
    onPress?.(next);
  };

  return (
    <button
      type='button'
      style={baseSizeStyle}
      onClick={handlePress}
      className={cn(
        'relative box-border shrink-0 overflow-hidden rounded-[8px]',
        sizeClasses,
        disabled && 'opacity-60',
      )}
    >
      <img
        src={imageSrc}
        width={size}
        height={size}
        alt={imageAlt}
        className={cn(
          'aspect-square w-full rounded-[8px] object-cover',
          // border는 dim 오버레이에서 처리
        )}
      />

      {/* dim+border 오버레이 */}
      {(disabled || pressed || downloaded) && (
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-20 rounded-[8px]',
            disabled && 'bg-[rgba(24,25,27,0.8)]',
            pressed &&
              'border-border-primary border-[3px] bg-[rgba(24,25,27,0.5)]',
            downloaded &&
              !pressed &&
              'border-b-border-primary border-[3px] border-t-transparent border-r-transparent border-l-transparent',
          )}
        />
      )}

      {pressed && (
        <div className='bg-element-primary absolute top-2.5 right-2.5 z-30 flex h-6 w-6 items-center justify-center rounded-full'>
          <Check
            width={12}
            height={12}
            strokeWidth={3}
            color='var(--color-icon-basic)'
          />
        </div>
      )}

      {showLike && (
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 via-black/20 to-transparent' />
      )}

      {showLike && (
        <div className='absolute bottom-2 left-2 flex items-center gap-1'>
          <span className={`typo-caption-sm-medium`}>
            <Heart
              width={14}
              height={14}
              fill={`${liked ? 'var(--color-element-primary)' : 'white'}`}
              color={`${liked ? 'var(--color-element-primary)' : 'white'}`}
            />
          </span>
          <span
            className={`typo-caption-sm-medium ${liked ? 'text-element-primary' : 'text-white'}`}
          >
            {likeCount}
          </span>
        </div>
      )}
    </button>
  );
}
