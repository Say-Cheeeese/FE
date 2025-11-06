import { cn } from '@/lib/utils';
import { Check, Heart } from 'lucide-react';
import { useState } from 'react';

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
}

export default function PhotoBox({
  size = 82,
  likeCount = 0,
  liked = false,
  downloaded = false,
  pressed: initialPressed = false,
  disabled = false,
  imageSrc,
  imageAlt = '사진',
  onPress,
}: PhotoBoxProps) {
  const [pressed, setPressed] = useState(initialPressed);
  const baseSizeStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };
  const showLike = 0 < likeCount;

  const handlePress = () => {
    if (disabled) return;
    setPressed((prev) => {
      const next = !prev;
      onPress?.(next);
      return next;
    });
  };

  return (
    <button
      type='button'
      style={baseSizeStyle}
      onClick={handlePress}
      className={cn(
        'relative shrink-0 overflow-hidden rounded-[8px] border-[3px] border-white',
        pressed
          ? 'border-border-primary bg-background-dim-darker'
          : downloaded
            ? 'border-b-border-primary border-b-[3px]'
            : 'border-transparent',
        disabled && 'pointer-events-none opacity-60',
      )}
    >
      <div className='aspect-square w-full overflow-hidden'>
        <img
          src={imageSrc}
          width={size}
          height={size}
          alt={imageAlt}
          className='h-full w-full object-cover'
        />
      </div>

      {disabled && (
        <div className='bg-background-dim-darkest pointer-events-none absolute inset-0 z-20' />
      )}

      {pressed && (
        <div className='bg-element-primary absolute top-1 right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full'>
          <Check
            width={12}
            height={12}
            strokeWidth={2}
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
