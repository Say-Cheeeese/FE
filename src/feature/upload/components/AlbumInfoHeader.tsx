import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';

export interface AlbumParticipant {
  name?: string;
  profileImage?: string;
  role?: string; // "MAKER" | "GUEST" 등으로 좁힐 수 있음
  isMe?: boolean;
}

export interface AlbumInvitation {
  currentParticipantCount?: number;
  eventDate?: string;
  expiredAt?: string;
  isExpired?: boolean;
  maxParticipantCount?: number;
  myRole?: string;
  participants?: AlbumParticipant[];
  themeEmoji?: string;
  title?: string;
}

type AlbumInfoHeaderProps = {
  albumId: string;
  photoCount: number;
  albumData: AlbumInvitation;
};

export default function AlbumInfoHeader({
  albumId,
  photoCount,
  albumData,
}: AlbumInfoHeaderProps) {
  const emoji = convertUnicodeToEmoji(albumData.themeEmoji || '');

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
          {albumData.title || '제목 없음'}
        </h2>
        {photoCount === 0 ? (
          <p className='typo-heading-sm-semibold text-text-subtle'>
            앨범을 채워주세요
          </p>
        ) : (
          <p className='typo-body-md-medium text-text-subtle'>
            {albumData.eventDate || '날짜 없음'}
          </p>
        )}
      </div>
    </div>
  );
}
