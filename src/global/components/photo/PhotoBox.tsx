'use client';
import { cn } from '@/lib/utils';
import { Check, Heart } from 'lucide-react';

interface PhotoBoxProps {
  size?: number; // px
  /** 부모 컨테이너 크기를 따라가기 여부 */
  responsive?: boolean;
  likeCount?: number;
  liked?: boolean;
  downloaded?: boolean;
  pressed?: boolean;
  disabled?: boolean;
  imageSrc: string;
  imageAlt?: string;
  onPress?: (pressed: boolean) => void;
  pressable?: boolean;
}

export default function PhotoBox({
  size = 82,
  responsive = false,
  likeCount,
  liked = false,
  downloaded = false,
  pressed = false,
  disabled = false,
  imageSrc,
  imageAlt = '사진',
  onPress,
  pressable = true,
}: PhotoBoxProps) {
  const showLike = likeCount !== undefined;

  const handlePress = () => {
    if (disabled || !pressable) return;

    const next = !pressed;
    onPress?.(next);
  };

  return (
    <button
      type='button'
      onClick={handlePress}
      // ✅ responsive면 style 제거 → 컨테이너에 맞춤 / 아니면 고정 크기
      style={
        !responsive ? { width: `${size}px`, height: `${size}px` } : undefined
      }
      className={cn(
        responsive && 'w-full',
        'relative shrink-0 overflow-hidden rounded-[8px] border-[3px] border-white',
        pressed
          ? 'border-border-primary bg-background-dim-darker'
          : downloaded
            ? 'border-b-border-primary border-b-[3px]'
            : 'border-transparent',
        disabled && 'pointer-events-none opacity-60',
        !disabled && !pressable && 'cursor-default',
      )}
    >
      {/* 항상 정사각형 유지 */}
      <div className='aspect-square w-full overflow-hidden'>
        <img
          src={imageSrc}
          alt={imageAlt}
          className='h-full w-full object-cover'
        />
      </div>

      {/* disabled 오버레이 */}
      {disabled && (
        <div className='bg-background-dim-darkest pointer-events-none absolute inset-0 z-20' />
      )}

      {/* 선택 시 체크 */}
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

      {/* 좋아요 오버레이 */}
      {showLike && (
        <>
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 via-black/20 to-transparent' />
          <div className='absolute bottom-2 left-2 flex items-center gap-1'>
            <Heart
              width={14}
              height={14}
              fill={liked ? 'var(--color-element-primary)' : 'white'}
              color={liked ? 'var(--color-element-primary)' : 'white'}
            />
            <span
              className={cn(
                'typo-caption-sm-medium',
                liked ? 'text-element-primary' : 'text-white',
              )}
            >
              {likeCount}
            </span>
          </div>
        </>
      )}
    </button>
  );
}
