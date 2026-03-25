'use client';

import Container4Cut, { type Container4CutProps } from './Container4Cut';

export type Container4CutPNUFourProps = Omit<Container4CutProps, 'template'>;

/** 네컷 프리뷰 — 부산대(PNU) 템플릿 4 (`Svg4CutPNUFour`). */
export default function Container4CutPNUFour(props: Container4CutPNUFourProps) {
  return <Container4Cut {...props} template='pnu_four' />;
}
