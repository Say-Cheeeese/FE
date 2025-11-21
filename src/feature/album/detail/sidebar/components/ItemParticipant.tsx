interface ItemParticipantProps {
  name: string;
  profileImage?: string;
  role?: 'MAKER' | 'GUEST' | 'BLACK';
  isMe?: boolean;
}

export default function ItemParticipant({
  profileImage,
  name,
  isMe,
  role,
}: ItemParticipantProps) {
  return (
    <div className={`flex items-center justify-between gap-3 py-2`}>
      <div className='flex items-center gap-3 overflow-hidden'>
        <img
          src={profileImage ?? `/assets/onboarding/smile1.svg`}
          width={36}
          height={36}
          alt='프로필사진'
          className='rounded-full'
        />
        <div className='typo-body-lg-semibold text-text-basic truncate'>
          {name}
          {role === 'MAKER' && (
            <span className='typo-caption-sm-medium text-text-secondary bg-element-primary-lighter ml-2 rounded-full px-2 py-0.5'>
              메이커
            </span>
          )}
          {isMe && (
            <span className='typo-caption-sm-medium text-text-subtler bg-element-gray-light ml-2 rounded-full px-[3.5px] py-0.5'>
              나
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
