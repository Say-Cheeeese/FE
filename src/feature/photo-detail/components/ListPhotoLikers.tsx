import { usePhotoLikersQuery } from '../hooks/usePhotoLikersQuery';
import ItemMemberData from './ItemMemberData';

interface ListPhotoLikersProps {
  albumId: string;
  photoId: number;
}

export default function ListPhotoLikers({
  albumId,
  photoId,
}: ListPhotoLikersProps) {
  const { data, isPending, isError } = usePhotoLikersQuery({
    albumId,
    photoId,
  });

  if (isPending) return null;
  if (isError) return null;
  if (!data || !data.photoLikers) return null;

  return (
    <div className='flex flex-col'>
      {data.photoLikers.map(({ name, profileImageUrl, role, isMe }, index) => (
        <ItemMemberData
          key={index}
          profileImageUrl={profileImageUrl ?? ''}
          nickname={name ?? ''}
          isMe={isMe ?? false}
          isMaker={role === 'MAKER'}
        />
      ))}
    </div>
  );
}
