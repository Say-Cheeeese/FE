'use client';

import Container4Cut, { type Container4CutProps } from './Container4Cut';

export type Container4CutPNUSevenProps = Omit<Container4CutProps, 'template'>;

/** 네컷 프리뷰 — 부산대(PNU) 템플릿 7 (`Svg4CutPNUSeven`). */
export default function Container4CutPNUSeven(
  props: Container4CutPNUSevenProps,
) {
  return <Container4Cut {...props} template='pnu_seven' />;
}
