import { EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 프로필 수정 페이로드 타입 (name, imageCode 선택적 포함)
type UpdateProfilePayload = {
  name?: string;
  imageCode?: string;
};

// 통합된 프로필 수정 Mutation
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      return await api.patch<void>({
        path: EP.user.userMe(),
        body: payload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EP.user.userMe()] });
    },
  });
}
