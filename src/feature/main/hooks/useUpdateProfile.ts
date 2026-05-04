import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 이름 수정용 타입
type UpdateNamePayload = {
  name: string;
};

// 프로필 이미지 수정용 타입
type UpdateProfileImagePayload = {
  imageCode: string;
};

// 이름 수정 Mutation
export function useUpdateName() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateNamePayload) => {
      return await api.patch<ApiReturns['user.userMeName']>({
        path: EP.user.userMeName(),
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EP.user.userMe()] });
    },
  });
}

// 프로필 이미지 수정 Mutation
export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfileImagePayload) => {
      return await api.patch<ApiReturns['user.userMeProfileImage']>({
        path: EP.user.userMeProfileImage(),
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EP.user.userMe()] });
    },
  });
}
