'use client';

import ScreenAlbumSidebar from '@/feature/album/detail/sidebar/components/ScreenAlbumSidebar';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const albumId = params.albumId as string;

  const handleClose = () => {
    router.back();
  };

  return <ScreenAlbumSidebar albumId={albumId} isOpen={true} onClose={handleClose} />;
}
