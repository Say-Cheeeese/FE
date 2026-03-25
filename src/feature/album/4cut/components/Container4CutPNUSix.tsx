'use client';

import Container4Cut, { type Container4CutProps } from './Container4Cut';

export type Container4CutPNUSixProps = Omit<Container4CutProps, 'template'>;

/** 네컷 프리뷰 — 부산대(PNU) 템플릿 6 (`Svg4CutPNUSix`). */
export default function Container4CutPNUSix(props: Container4CutPNUSixProps) {
  return <Container4Cut {...props} template='pnu_six' />;
}
