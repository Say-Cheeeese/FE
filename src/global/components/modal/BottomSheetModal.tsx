'use client';

import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

type BottomSheetModalProps = {
  /** 트리거 버튼/노드 (예: <button>열기</button>) */
  trigger: React.ReactNode;
  /** 모달 className (높이, 너비, 스타일 등) */
  className?: string;
  /** 모달 내용 */
  children: React.ReactNode;
  /** 닫기 버튼 표시 여부 */
  showCloseButton?: boolean;
  /** 모달 제목 (화면에 표시, 없으면 스크린리더용만 사용) */
  title?: string;
  /** 드래그/스와이프 등으로 닫기 허용 여부 (기본값: true) */
  dismissible?: boolean;
  /** 상단 드래그 바 표시 여부 (기본값: true) */
  showHandle?: boolean;
};

export default function BottomSheetModal({
  trigger,
  children,
  className = 'max-h-[80vh] w-full',
  showCloseButton = false,
  title,
  dismissible = true,
  showHandle = true,
}: BottomSheetModalProps) {
  return (
    <Drawer dismissible={dismissible} shouldScaleBackground={false}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent
        className={cn(
          className,
          'mx-auto flex max-w-[430px] flex-col border-none',
        )}
        showHandle={showHandle}
      >
        {/* 스크린리더용 제목 (항상 필요) */}
        <DrawerTitle className={title ? '' : 'sr-only'}>
          {title || '모달'}
        </DrawerTitle>

        {showCloseButton && (
          <div className='relative'>
            <DrawerClose className='text-text-subtle hover:text-text-basic absolute top-4 right-4 transition-colors'>
              ✕
            </DrawerClose>
          </div>
        )}
        {children}
      </DrawerContent>
    </Drawer>
  );
}
