import ScreenAlbumQrcode from '@/feature/album/qrcode/components/ScreenAlbumQrcode';

interface PageProps {
  params: Promise<{
    albumId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;
  return <ScreenAlbumQrcode albumId={albumId} />;
}
