import { PhotoSorting } from '@/global/api/ep';

export type PhotoSortType = 'uploaded' | 'shot' | 'liked';

export const photoSortOptions: { value: PhotoSortType; label: string }[] = [
  { value: 'uploaded', label: '최근 업로드된 사진순' },
  { value: 'shot', label: '최근 촬영한 시간순' },
  { value: 'liked', label: '띱 많은 순' },
];

export const photoSortToApiSorting: Record<PhotoSortType, PhotoSorting> = {
  uploaded: 'CREATED_AT',
  shot: 'CAPTURED_AT',
  liked: 'POPULAR',
};
