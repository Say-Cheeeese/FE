'use client';

import { useEffect, useState } from 'react';

export const useABTestGroup = () => {
  const [abGroup, setAbGroup] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/(^| )ab_test_group=([^;]+)/);
    if (match) {
      setAbGroup(match[2] as 'A' | 'B');
    }
  }, []);

  return abGroup;
};
