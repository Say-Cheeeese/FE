'use client';

import Container4Cut, { type Container4CutProps } from './Container4Cut';

export type Container4CutPNUTwoProps = Omit<Container4CutProps, 'template'>;

/**
 * 네컷 프리뷰 — 부산대(PNU) 템플릿 2 (`Svg4CutPNUTwo`).
 */
export default function Container4CutPNUTwo(props: Container4CutPNUTwoProps) {
  return <Container4Cut {...props} template='pnu_two' />;
}
