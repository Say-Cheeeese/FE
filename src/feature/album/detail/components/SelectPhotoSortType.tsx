import { DrawerClose } from '@/components/ui/drawer';
import { Check } from 'lucide-react';
import type { PhotoSortType } from '../constants/photoSort';
import { photoSortOptions } from '../constants/photoSort';

interface SelectPhotoSortTypeProps {
  sort: PhotoSortType;
  onChange: (newType: PhotoSortType) => void;
}

export default function SelectPhotoSortType({
  sort,
  onChange,
}: SelectPhotoSortTypeProps) {
  return (
    <div className='mb-5 px-2'>
      <ul className='flex flex-col'>
        {photoSortOptions.map((item) => {
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
