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
import React, { ReactNode } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CustomHeaderProps {
  /** 헤더 중앙에 표시될 타이틀 */
  title: string;
  /** 헤더 오른쪽에 표시될 컴포넌트들 (16px gap으로 배치) - 배열 또는 단일 컴포넌트 */
  rightContent?: ReactNode | ReactNode[];
  /** 뒤로가기 버튼 클릭 핸들러 (기본: router.back()) */
  onBackClick?: () => void;
}

export default function CustomHeader({
  title,
  rightContent,
  onBackClick,
}: CustomHeaderProps) {
  const router = useRouter();

  function handleBackClick() {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  }

  return (
    <div className='w-full max-w-[430px] h-18 fixed top-0 left-1/2 -translate-x-1/2 bg-white z-50 flex items-center justify-between px-5 border-b border-divider-gray'>
      {/* 왼쪽: 뒤로가기 + 타이틀 */}
      <div className='flex gap-2 items-center'>
        <button
          onClick={handleBackClick}
          className='p-0 m-0 bg-transparent border-none'
          aria-label='뒤로가기'
        >
          <ChevronLeft width={24} height={24} color='#424349' />
        </button>
        <span className='text-heading-md-bold text-text-subtle'>{title}</span>
      </div>

      {/* 오른쪽: 커스텀 컴포넌트 */}
      {rightContent && (
        <div className='flex items-center gap-4'>{rightContent}</div>
      )}
    </div>
  );
}
