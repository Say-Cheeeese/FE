import { useMutation } from '@tanstack/react-query';
import {
  createAlbumApi,
  type CreateAlbumRequest,
  type CreateAlbumResponse,
} from '../api/createAlbumApi';

export function useCreateAlbum() {
  return useMutation<CreateAlbumResponse, Error, CreateAlbumRequest>({
    mutationFn: createAlbumApi,
  });
}
