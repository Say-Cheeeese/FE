import { useMutation, UseMutationOptions } from '@tanstack/react-query';
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

export function useCreateAlbum(
  options?: UseMutationOptions<
    CreateAlbumApiResponse,
    CreateAlbumError,
    CreateAlbumRequest
  >,
) {
  return useMutation<
    CreateAlbumApiResponse,
    CreateAlbumError,
    CreateAlbumRequest
  >({
    mutationKey: ['createAlbum'],
    mutationFn: createAlbumApi,
    ...options,
  });
}
