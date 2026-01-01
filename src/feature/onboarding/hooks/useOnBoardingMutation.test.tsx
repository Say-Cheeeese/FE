import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useOnBoardingMutation } from './useOnBoardingMutation';

// Mock api
vi.mock('@/global/utils/api', () => ({
  api: {
    post: vi.fn(),
  },
}));

// Mock useMutation
vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn(),
}));

describe('useOnBoardingMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call useMutation with correct mutationFn', () => {
    useOnBoardingMutation();

    expect(useMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationFn: expect.any(Function),
      }),
    );
  });

  it('should call api.post when mutationFn is executed', async () => {
    // Capture the mutationFn passed to useMutation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let capturedMutationFn: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (useMutation as any).mockImplementation(({ mutationFn }: any) => {
      capturedMutationFn = mutationFn;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return {} as any;
    });

    useOnBoardingMutation();

    const mockPayload = {
      name: 'Test User',
      imageCode: 'img-123',
      isServiceAgreement: true,
      isUserInfoAgreement: true,
      isMarketingAgreement: false,
      isThirdPartyAgreement: true,
    };

    const mockResponse = { result: { success: true } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.post as any).mockResolvedValue(mockResponse);

    // Execute the captured mutationFn
    await capturedMutationFn(mockPayload);

    expect(api.post).toHaveBeenCalledWith({
      path: expect.stringContaining('/user/onboarding'),
      body: mockPayload,
    });
  });
});
