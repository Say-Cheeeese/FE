import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { checkImages, type CheckImagesResult } from '../utils/checkImages';

export type CheckImagesVariables = {
  files: File[];
  albumId: string;
};

export function useCheckImages(
  options?: UseMutationOptions<
    CheckImagesResult,
    unknown,
    CheckImagesVariables
  >,
) {
  return useMutation<CheckImagesResult, unknown, CheckImagesVariables>({
    mutationKey: ['checkImages'],
    mutationFn: ({ files, albumId }) => checkImages(files, albumId),
    ...options,
  });
}
