/**
 * CustomHeader Component
 *
 * 재사용 가능한 커스텀 헤더 컴포넌트
 * - 왼쪽: 뒤로가기 버튼 + 타이틀
 * - 오른쪽: 커스텀 컴포넌트 (단일 또는 배열)
 *
 * @example
 * // 기본 사용 (타이틀만)
 * <CustomHeader title="설정" />
 *
 * @example
 * // 오른쪽에 버튼 1개
 * <CustomHeader
 *   title="프로필"
 *   rightContent={
 *     <button className="text-primary-400">저장</button>
 *   }
 * />
 *
 * @example
 * // 오른쪽에 여러 버튼 (배열)
 * <CustomHeader
 *   title="편집"
 *   rightContent={[
 *     <button key="cancel">취소</button>,
 *     <button key="done">완료</button>,
 *   ]}
 * />
 *
 * @example
 * // Fragment 방식
 * <CustomHeader
 *   title="앨범"
 *   rightContent={
 *     <>
 *       <IconButton icon={Search} />
 *       <IconButton icon={Share} />
 *     </>
 *   }
 * />
 *
 * @example
 * // 커스텀 뒤로가기 핸들러
 * <CustomHeader
 *   title="사진"
 *   onBackClick={() => router.push('/home')}
 *   rightContent={<button>저장</button>}
 * />
 */

'use client';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export const HEADER_HEIGHT = 72;

interface CustomHeaderProps {
  /** 헤더 중앙에 표시될 타이틀 */
  title: string;
  /** 헤더 오른쪽에 표시될 컴포넌트들 (16px gap으로 배치) - 배열 또는 단일 컴포넌트 */
  rightContent?: ReactNode | ReactNode[];
  /** 뒤로가기 버튼 클릭 핸들러 (기본: router.back()) */
  onBackClick?: () => void;
  isShowBack?: boolean;
  border?: boolean;
  /** 헤더를 완전히 숨길지 여부 */
  isHidden?: boolean;
}

export default function CustomHeader({
  title,
  rightContent,
  onBackClick,
  isShowBack,
  border = true,
  isHidden = false,
}: CustomHeaderProps) {
  const router = useRouter();

  function handleBackClick() {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  }

  // 숨김 처리
  if (isHidden) return null;

  return (
    <>
      <div
        className={[
          'border-divider-gray fixed top-0 left-1/2 z-50 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-between border-b bg-white px-5',
          ,
          border ? 'border-divider-gray border-b' : '',
        ].join(' ')}
        style={{ height: HEADER_HEIGHT }}
      >
        {/* 왼쪽: 뒤로가기 + 타이틀 */}
        <div className='flex items-center gap-2'>
          {isShowBack && (
            <button
              onClick={handleBackClick}
              className='m-0 border-none bg-transparent p-0'
              aria-label='뒤로가기'
            >
              <ChevronLeft width={24} height={24} color='#424349' />
            </button>
          )}

          <span className='typo-heading-md-bold text-text-subtle'>{title}</span>
        </div>

        {/* 오른쪽: 커스텀 컴포넌트 */}
        {rightContent && (
          <div className='flex items-center gap-4'>{rightContent}</div>
        )}
      </div>
      {/* 헤더로 인해 가려지는 영역이 없도록 아래 요소 추가 */}
      <div
        style={{ height: HEADER_HEIGHT }}
        className={`[height:${HEADER_HEIGHT}px]`}
      />
    </>
  );
}
