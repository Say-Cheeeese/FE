import ScreenPhotoDetail from '@/feature/photo-detail/components/ScreenPhotoDetail';
import { PhotoSorting } from '@/global/api/ep';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ albumId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { albumId } = await params;
  const { sort: _sort, photoId: _photoId } = await searchParams;

  const sort = ((Array.isArray(_sort) ? _sort[0] : _sort) ??
    'CREATED_AT') as PhotoSorting;
  const photoId = Number(Array.isArray(_photoId) ? _photoId[0] : _photoId);

  return <ScreenPhotoDetail albumId={albumId} sort={sort} photoId={photoId} />;
}
