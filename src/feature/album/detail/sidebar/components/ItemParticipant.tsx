import { Participant } from './ScreenAlbumSidebar';

interface ItemParticipantProps {
  participant: Participant;
}

export default function ItemParticipant({ participant }: ItemParticipantProps) {
  return (
    <div className={`flex items-center justify-between gap-3 py-2`}>
      <div className='flex items-center gap-3 overflow-hidden'>
        <img
          src='/assets/onboarding/smile1.svg'
          width={36}
          height={36}
          alt='프로필사진'
        />
        <div className='typo-body-lg-medium text-text-basic truncate'>
          {participant.name}
          {participant.role === 'maker' && (
            <span className='typo-caption-sm-medium text-text-secondary bg-element-primary-lighter ml-2 rounded-full px-2'>
              메이커
            </span>
          )}
          {participant.isMe && (
            <span className='typo-caption-sm-medium text-text-subtler bg-element-gray-light ml-2 rounded-full px-[3.5px]'>
              나
            </span>
          )}
        </div>
      </div>
      <div className='flex gap-2'></div>
    </div>
  );
}
