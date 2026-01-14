import { AlbumParticipantResponseSchema } from '@/global/api/ep';
import CopyShareButton from './CopyShareButton';
import KakaoShareButton from './KakaoShareButton';
import MoreShareButton from './MoreShareButton';
import QrcodeShareButton from './QrcodeShareButton';

interface BottomSheetContentShareProps {
  albumId: string;
  accessType: AlbumParticipantResponseSchema['myRole'];
}

export default function BottomSheetContentShare({
  albumId,
  accessType,
}: BottomSheetContentShareProps) {
  return (
    <div className='mx-6 mt-6 mb-10'>
      <div className='pb-8'>
        <h3 className='typo-heading-md-bold text-text-basic mb-1'>
          친구 초대하기
        </h3>
        <span className='typo-body-lg-medium text-text-subtle'>
          사진이 채워지는 동안 친구에게 앨범을 공유해보세요.
        </span>
      </div>
      <div className='typo-body-sm-medium text-text-subtle flex justify-between'>
        <KakaoShareButton albumId={albumId} accessType={accessType} />
        <QrcodeShareButton albumId={albumId} accessType={accessType} />
        <CopyShareButton albumId={albumId} accessType={accessType} />
        <MoreShareButton albumId={albumId} accessType={accessType} />
      </div>
    </div>
  );
}
