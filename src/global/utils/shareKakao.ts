interface ShareKakaoProps {
  /** 공유 카드 상단에 표시될 제목. */
  title: string;
  /** 공유 카드의 본문 설명. */
  description?: string;
  /** 공유 카드 클릭 시 이동할 웹 URL. */
  link: string;
  /** 공유에 사용할 썸네일 이미지 URL */
  imageUrl: string;
  /** 공유에 사용할 썸네일 width */
  imageWidth?: number;
  /** 공유에 사용할 썸네일 height */
  imageHeight?: number;
  /** 버튼에 들어갈 문구 */
  buttonTitle?: string;
  /** 버튼에 삽입 될 URL */
  buttonLink?: string;
}

export function shareKakao({
  title,
  description,
  link,
  imageUrl,
  imageWidth,
  imageHeight,
  buttonTitle,
  buttonLink,
}: ShareKakaoProps) {
  if (typeof window === 'undefined' || !window.Kakao) return;

  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: title,
      description: description,
      imageUrl,
      ...(imageWidth && { imageWidth }),
      ...(imageHeight && { imageHeight }),
      link: {
        webUrl: link,
        mobileWebUrl: link,
      },
    },
    ...(buttonTitle &&
      buttonLink && {
        buttons: [
          {
            title: buttonTitle,
            link: {
              webUrl: buttonLink,
              mobileWebUrl: buttonLink,
            },
          },
        ],
      }),
  });
}
