import { useMutation } from '@tanstack/react-query';
import {
  createAlbumApi,
  type CreateAlbumRequest,
  type CreateAlbumResponse,
} from '../api/createAlbumApi';

type CreateAlbumApiResponse = {
  result: CreateAlbumResponse;
  code: number;
  isSuccess: boolean;
  message: string;
};

export function useCreateAlbum() {
  return useMutation<CreateAlbumApiResponse, Error, CreateAlbumRequest>({
    mutationFn: createAlbumApi,
  });
}
