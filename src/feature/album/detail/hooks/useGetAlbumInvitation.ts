import {
  AlbumInvitationResponse,
  getAlbumInvitation,
} from '@/feature/upload/api/getAlbumInvitation';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useGetAlbumInvitation(
  albumId: string,
  options?: UseQueryOptions<AlbumInvitationResponse, Error>,
) {
  return useQuery<AlbumInvitationResponse, Error>({
    queryKey: ['albumInvitation', albumId],
    queryFn: () => getAlbumInvitation(albumId),
    enabled: !!albumId,
    ...options,
  });
}
