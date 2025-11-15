import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import QRCode from 'react-qr-code';
import { useGetAlbumInfo } from '../../detail/hooks/useGetAlbumInfo';

interface CardAlbumQrcodeProps {
  albumId: string;
}

export default function CardAlbumQrcode({ albumId }: CardAlbumQrcodeProps) {
  const { data, isPending, isError } = useGetAlbumInfo(albumId);

  if (isPending) return null;
  if (isError) return null;
  if (!data) return null;

  const qrValue = `${process.env.NEXT_PUBLIC_CLIENT_URL}/album/entry/${albumId}`;

  return (
    <section className='flex flex-col items-center rounded-[20px] bg-white px-10 py-8 text-center shadow-[0px_10px_30px_rgba(98,78,44,0.08)]'>
      <div className='bg-element-gray-lighter mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl'>
        {data.themeEmoji ? convertUnicodeToEmoji(data.themeEmoji) : '😀'}
      </div>
      <h1 className='typo-heading-sm-semibold text-text-basic mb-3 break-keep'>
        {data.title}
      </h1>
      <p className='typo-body-sm-regular text-text-subtler mb-3'>
        {data.eventDate}
      </p>
      <div className='bg-element-gray-lighter h-[250px] w-[250px]'>
        <QRCode
          value={qrValue}
          size={250}
          style={{ width: '250px', height: '250px' }}
        />
      </div>
    </section>
  );
}
