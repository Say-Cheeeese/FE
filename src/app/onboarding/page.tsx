import { Suspense } from 'react';
import OnBoardingClient from '@/feature/onboarding/components/OnBoardingClient';

export default function OnBoardingPage() {
  return (
    <Suspense>
      <OnBoardingClient />
    </Suspense>
  );
}
