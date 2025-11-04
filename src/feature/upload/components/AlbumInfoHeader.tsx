import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import { getAlbumInvitationServer } from '../api/getAlbumInvitation.server';

type AlbumInfoHeaderProps = {
  albumId: string;
  photoCount: number;
};
export default async function AlbumInfoHeader({
  albumId,
  photoCount,
}: AlbumInfoHeaderProps) {
  const albumInfo = await getAlbumInvitationServer(albumId);
  const emoji = convertUnicodeToEmoji(albumInfo.themeEmoji);

  return (
    <div className='flex w-full flex-col items-center'>
      <div className='bg-element-gray-lighter flex h-20 w-20 items-center justify-center rounded-full'>
        <span className='text-4xl'>{emoji}</span>
      </div>

      <div className='mt-3 flex flex-col items-center px-6'>
        <h2
          className={
            photoCount === 0
              ? 'typo-heading-md-bold text-text-brand'
              : 'typo-heading-md-semibold text-text-basic'
          }
        >
          {albumInfo.title}
        </h2>
        {photoCount === 0 ? (
          <p className='typo-heading-sm-semibold text-text-subtle'>
            앨범을 채워주세요
          </p>
        ) : (
          <p className='typo-body-md-medium text-text-subtle'>
            {albumInfo.eventDate}
          </p>
        )}
      </div>
    </div>
  );
}
