import OnBoardingClient from '@/feature/onboarding/components/OnBoardingClient';
import Spinner from '@/global/components/Spinner';
import { Suspense } from 'react';

export default function OnBoardingPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <OnBoardingClient />
    </Suspense>
  );
}
