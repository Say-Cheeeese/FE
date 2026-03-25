'use client';

import Container4Cut, { type Container4CutProps } from './Container4Cut';

export type Container4CutPNUFiveProps = Omit<Container4CutProps, 'template'>;

/** 네컷 프리뷰 — 부산대(PNU) 템플릿 5 (`Svg4CutPNUFive`). */
export default function Container4CutPNUFive(props: Container4CutPNUFiveProps) {
  return <Container4Cut {...props} template='pnu_five' />;
}
