import { AlbumInvitationResponse } from '@/feature/upload/api/getAlbumInvitation';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';

interface AlbumInfoSummaryProps {
  albumInfo?: AlbumInvitationResponse;
  isLoading: boolean;
  isError: boolean;
}

export function AlbumInfoSummary({
  albumInfo,
  isLoading,
  isError,
}: AlbumInfoSummaryProps) {
  if (isLoading) {
    return <div style={{ height: '98px' }} />;
  }
  if (isError || !albumInfo) {
    return <div style={{ height: '98px' }} />;
  }

  const emoji = convertUnicodeToEmoji(albumInfo.themeEmoji);

  return (
    <div className='mb-6 flex items-center gap-5'>
      <div className='bg-element-gray-lighter flex h-[74px] w-[74px] items-center justify-center rounded-full text-[28px]'>
        {emoji}
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='typo-heading-md-bold text-text-basic truncate'>
          {albumInfo.title}
        </h1>
        <span className='typo-body-sm-regular text-text-subtler'>
          {albumInfo.eventDate}
        </span>
      </div>
    </div>
  );
}
