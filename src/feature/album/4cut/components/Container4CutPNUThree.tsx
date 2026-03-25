'use client';

import Container4Cut, { type Container4CutProps } from './Container4Cut';

export type Container4CutPNUThreeProps = Omit<Container4CutProps, 'template'>;

/**
 * 네컷 프리뷰 — 부산대(PNU) 템플릿 3 (`Svg4CutPNUThree`).
 */
export default function Container4CutPNUThree(
  props: Container4CutPNUThreeProps,
) {
  return <Container4Cut {...props} template='pnu_three' />;
}
