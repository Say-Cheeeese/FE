'use client';

import Container4Cut, { type Container4CutProps } from './Container4Cut';

export type Container4CutPNUProps = Omit<Container4CutProps, 'template'>;

/**
 * 네컷 프리뷰 — 부산대(PNU) 전용 템플릿 (`Svg4CutPNUOne`).
 * 데이터/퍼블리싱 프레임은 `Container4Cut`과 동일하고 SVG만 다릅니다.
 */
export default function Container4CutPNU(props: Container4CutPNUProps) {
  return <Container4Cut {...props} template='pnu_one' />;
}
