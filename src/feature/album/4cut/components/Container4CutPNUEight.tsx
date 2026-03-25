'use client';

import Container4Cut, { type Container4CutProps } from './Container4Cut';

export type Container4CutPNUEightProps = Omit<Container4CutProps, 'template'>;

/** 네컷 프리뷰 — 부산대(PNU) 템플릿 8 (`Svg4CutPNUEight`). */
export default function Container4CutPNUEight(
  props: Container4CutPNUEightProps,
) {
  return <Container4Cut {...props} template='pnu_eight' />;
}
