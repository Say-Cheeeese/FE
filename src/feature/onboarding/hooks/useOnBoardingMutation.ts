import { ApiReturns, EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

// 온보딩 API에 필요한 전체 파라미터 타입 정의
type OnboardingPayload = {
  name: string;
  imageCode: string;
  isServiceAgreement: boolean;
  isUserInfoAgreement: boolean;
  isMarketingAgreement: boolean;
  isThirdPartyAgreement: boolean;
};

async function postUserOnboarding(payload: OnboardingPayload) {
  const res = await api.post<ApiReturns['user.userOnboarding']>({
    path: EP.user.userOnboarding(),
    body: payload,
  });
  return res.result;
}

export function useOnBoardingMutation() {
  return useMutation({
    mutationFn: (payload: OnboardingPayload) => postUserOnboarding(payload),
  });
}
