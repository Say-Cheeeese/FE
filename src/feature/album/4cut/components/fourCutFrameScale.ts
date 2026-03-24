import { FOUR_CUT_BASE_WIDTH } from './fourCutLayoutConstants';

/** 디자인 기준(너비 216)에서의 값을 현재 렌더 너비에 맞게 스케일 */
export function scaleFourCutDesignPx(
  designPx: number,
  widthPx: number,
): number {
  return designPx * (widthPx / FOUR_CUT_BASE_WIDTH);
}
