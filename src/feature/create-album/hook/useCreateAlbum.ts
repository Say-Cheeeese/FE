import { useMutation } from '@tanstack/react-query';
import {
  createAlbumApi,
  type CreateAlbumRequest,
  type CreateAlbumResponse,
} from '../api/createAlbumApi';

export type CreateAlbumApiResponse = {
  result: CreateAlbumResponse;
  code: number;
  isSuccess: boolean;
  message: string;
};

export type CreateAlbumError = {
  code: number;
  isSuccess: boolean;
  message: string;
};

export function useCreateAlbum() {
  return useMutation<
    CreateAlbumApiResponse,
    CreateAlbumError,
    CreateAlbumRequest
  >({
    mutationFn: createAlbumApi,
  });
}
