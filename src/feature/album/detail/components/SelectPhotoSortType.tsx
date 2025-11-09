import { DrawerClose } from '@/components/ui/drawer';
import { Check } from 'lucide-react';

const SORT_OPTIONS: { value: PhotoSortType; label: string }[] = [
  { value: 'uploaded', label: '최근 업로드된 사진순' },
  { value: 'shot', label: '최근 촬영한 시간순' },
  { value: 'liked', label: '띠 많은 순' },
];

export type PhotoSortType = 'uploaded' | 'shot' | 'liked';

interface SelectPhotoSortTypeProps {
  sort: PhotoSortType;
  onChange: (newType: PhotoSortType) => void;
}

export default function SelectPhotoSortType({
  sort,
  onChange,
}: SelectPhotoSortTypeProps) {
  return (
    <div className='px-2'>
      <ul className='flex flex-col'>
        {SORT_OPTIONS.map((item) => {
          const isActive = sort === item.value;
          return (
            <li key={item.value}>
              <DrawerClose
                type='button'
                onClick={() => {
                  onChange(item.value);
                }}
                className='flex w-full items-center gap-2.5 py-4'
              >
                <span className='flex w-6 justify-center'>
                  {isActive && (
                    <Check
                      width={24}
                      height={24}
                      color='var(--color-text-basic)'
                    />
                  )}
                </span>
                <span className={'typo-body-lg-medium text-text-basic'}>
                  {item.label}
                </span>
              </DrawerClose>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
