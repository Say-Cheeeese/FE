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
  const { sort: _sort } = await searchParams;

  const sort = ((Array.isArray(_sort) ? _sort[0] : _sort) ??
    'CREATE_AT') as PhotoSorting;

  return <ScreenPhotoDetail albumId={albumId} sort={sort} />;
}
