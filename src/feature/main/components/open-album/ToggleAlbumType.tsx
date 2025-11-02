export type AlbumType = 'all' | 'mine';

interface ToggleAlbumTypeProps {
  value: AlbumType;
  onChange: (next: AlbumType) => void;
  labels?: Record<AlbumType | string, string>;
}

export default function ToggleAlbumType({
  value,
  onChange,
  labels = { all: '전체', mine: '내가 만든 앨범' },
}: ToggleAlbumTypeProps) {
  return (
    <div
      className={
        'bg-element-gray-light mb-4 flex w-full gap-[2px] rounded-full p-1'
      }
    >
      {Object.entries(labels).map(([key, label]) => {
        const albumType = key as AlbumType;
        const isActive = value === albumType;

        return (
          <button
            key={albumType}
            type='button'
            onClick={() => onChange(albumType)}
            className={[
              'typo-body-md-medium flex-1 rounded-full py-2 transition-all',
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
