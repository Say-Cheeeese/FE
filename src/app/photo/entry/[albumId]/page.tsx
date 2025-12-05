import ScreenPhotoShareEntry from '@/feature/photo-entry/components/ScreenPhotoShareEntry';
import { Suspense } from 'react';

export default function Page({ params }: { params: { albumId: string } }) {
  const { albumId } = params;

  return (
    <Suspense fallback={null}>
      <ScreenPhotoShareEntry albumId={albumId} />
    </Suspense>
  );
}
