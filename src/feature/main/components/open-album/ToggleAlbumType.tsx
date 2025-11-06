'use client';

interface ToggleAlbumTypeProps<T extends string> {
  value: T;
  onChange: (next: T) => void;
  labels: Record<T, string>;
}

export default function ToggleAlbumType<T extends string>({
  value,
  onChange,
  labels,
}: ToggleAlbumTypeProps<T>) {
  const keys = Object.keys(labels) as T[];

  return (
    <div className='bg-element-gray-light flex w-full gap-[2px] rounded-full p-1'>
      {keys.map((key) => {
        const isActive = value === key;
        const label = labels[key];

        return (
          <button
            key={key}
            type='button'
            onClick={() => onChange(key)}
            className={[
              'typo-body-md-medium flex-1 rounded-full py-2',
              isActive
                ? 'bg-element-white text-text-basic drop-shadow-sm'
                : 'text-text-disabled bg-transparent',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
