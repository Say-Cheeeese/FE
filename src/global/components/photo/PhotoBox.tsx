'use client';
import { cn } from '@/lib/utils';
import { Check, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const FALLBACK_SRC = '/icon/error-image.svg';

interface PhotoBoxProps {
  size?: number; // px
  /** 부모 컨테이너 크기를 따라가기 여부 */
  responsive?: boolean;
  likeCount?: number;
  liked?: boolean;
  mode?: 'default' | 'select';
  downloaded?: boolean;
  pressed?: boolean;
  disabled?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  onPress?: (pressed: boolean) => void;
  onDisabledPress?: () => void;
  pressable?: boolean;
}

export default function PhotoBox({
  size = 82,
  responsive = false,
  likeCount,
  liked = false,
  downloaded = false,
  pressed = false,
  mode = 'default',
  disabled = false,
  imageSrc,
  imageAlt = '사진',
  onPress,
  onDisabledPress,
  pressable = true,
}: PhotoBoxProps) {
  const showLike = likeCount !== undefined;
  const [currentSrc, setCurrentSrc] = useState(imageSrc ?? FALLBACK_SRC);

  useEffect(() => {
    setCurrentSrc(imageSrc ?? FALLBACK_SRC);
  }, [imageSrc]);

  const handleImageError = (): void => {
    if (currentSrc === FALLBACK_SRC) return;
    setCurrentSrc(FALLBACK_SRC);
  };

  const handlePress = () => {
    if (disabled) {
      onDisabledPress?.();
      return;
    }

    if (!pressable) return;

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
          ? 'border-border-primary'
          : downloaded
            ? 'border-b-border-primary border-b-[3px]'
            : 'border-transparent',
        !disabled && !pressable && 'cursor-default',
      )}
    >
      {/* 항상 정사각형 유지 */}
      <div className='aspect-square w-full overflow-hidden'>
        <img
          src={currentSrc}
          alt={imageAlt}
          onError={handleImageError}
          className='bg-element-gray-lighter h-full w-full object-cover'
        />
      </div>

      {/* disabled  모드에서만 오버레이 */}
      {disabled && mode === 'select' && (
        <div className='bg-background-dim-darkest pointer-events-none absolute inset-0 z-10' />
      )}

      {downloaded && (
        <div className='absolute bottom-0 left-0 h-1/2 w-full bg-[linear-gradient(180deg,rgba(24,25,27,0)_0%,rgba(24,25,27,0.8)_60.1%)]' />
      )}

      {pressed && (
        <>
          {/* 선택 시 사진 딤처리 */}
          <div className='bg-background-dim-darker absolute inset-0' />
          {/* 선택 시 오른쪽상단 체크표시 */}
          <div className='bg-element-primary absolute top-2.5 right-2.5 z-30 flex h-6 w-6 items-center justify-center rounded-full'>
            <Check
              width={12}
              height={12}
              strokeWidth={3}
              color='var(--color-icon-basic)'
            />
          </div>
        </>
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
