interface ItemMemberDataProps {
  profileImageUrl: string | undefined;
  nickname: string;
  isMe: boolean;
  isMaker: boolean;
}

export default function ItemMemberData({
  profileImageUrl,
  nickname,
  isMe,
  isMaker,
}: ItemMemberDataProps) {
  return (
    <div className='flex items-center gap-3 py-2'>
      <div className='flex h-9 w-9 items-center justify-center overflow-hidden rounded-full'>
        <img
          src={profileImageUrl ?? '/assets/onboarding/smile1.svg'}
          alt={`${nickname}의 프로필 이미지`}
          width={36}
          height={36}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='flex items-center gap-2'>
        <span className='typo-body-lg-semibold text-text-subtle'>
          {nickname}
        </span>

        <div className='flex items-center gap-1'>
          {isMe && (
            <span className='typo-caption-sm-medium text-text-subtler bg-element-gray-light inline-flex items-center rounded-full px-1'>
              나
            </span>
          )}

          {isMaker && (
            <span className='typo-caption-sm-medium bg-element-primary-lighter text-text-secondary inline-flex items-center rounded-full px-2'>
              메이커
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
