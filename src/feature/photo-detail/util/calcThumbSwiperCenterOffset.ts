interface CalcThumbSwiperCenterOffsetProps {
  /**
   * 현재 뷰포트(또는 Swiper 컨테이너)의 전체 너비 (px 단위)
   * - 기본적으로 window.innerWidth를 사용
   * - 반응형 환경에서는 부모 컨테이너 width를 넘겨도 됨
   */
  viewportWidth: number;

  /**
   * 활성(선택된) 썸네일의 실제 렌더링 폭 (px 단위)
   */
  activeWidth: number;

  /**
   * 활성 썸네일의 좌우 margin 값 (px 단위)
   */
  activeMargin: number;

  /**
   * 비활성 썸네일의 폭 (px 단위)
   */
  inactiveWidth: number;

  /**
   * 비활성 썸네일의 좌우 margin 값 (px 단위)
   */
  inactiveMargin: number;

  /**
   * 현재 활성화된 슬라이드의 인덱스
   */
  index: number;
}

/** preview swiper의 active요소를 화면 중앙에 정렬시키기 위한 translate(오른쪽으로부터 얼마나 떨어져있는지) 계산 */
export const calcThumbSwiperCenterOffset = ({
  viewportWidth,
  activeWidth,
  activeMargin,
  inactiveWidth,
  inactiveMargin,
  index,
}: CalcThumbSwiperCenterOffsetProps) => {
  // 화면 중앙에서 활성 썸네일의 중심까지 거리
  const baseOffset = viewportWidth / 2 - (activeMargin + activeWidth / 2);

  // 인덱스만큼 비활성 썸네일 폭만큼 왼쪽으로 이동
  const indexOffset = (inactiveWidth + inactiveMargin) * index;

  return baseOffset - indexOffset;
};
