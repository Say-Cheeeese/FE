interface AlbumPreviewCardProps {
  imageUrl: string;
  nickname: string;
  profileUrl: string;
}

export default function AlbumPreviewCard({
  imageUrl,
  nickname,
  profileUrl,
}: AlbumPreviewCardProps) {
  return (
    <div>
      <img
        src={imageUrl}
        alt='미리보기 이미지'
        width={180}
        height={180}
        className='h-[180px] w-[180px] rounded-3xl object-cover'
      />
      <div className='mt-2 flex items-center gap-2'>
        <img
          src={profileUrl}
          width={24}
          height={24}
          alt={`${nickname}님의 프로필사진`}
          className='bg-element-gray-lighter h-6 w-6 rounded-full object-cover'
        />
        <span className='typo-body-sm-semibold truncate'>{nickname}</span>
      </div>
    </div>
  );
}
