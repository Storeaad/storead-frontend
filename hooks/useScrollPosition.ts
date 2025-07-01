"use client";

import { useCallback, useEffect, useRef } from "react";

export const useScrollPosition = (key: string) => {
  const elementRef = useRef<HTMLDivElement>(null);

  // 스크롤 위치 저장
  const saveScrollPosition = useCallback(() => {
    if (elementRef.current) {
      const scrollTop = elementRef.current.scrollTop;
      sessionStorage.setItem(`scroll-${key}`, scrollTop.toString());
    }
  }, [key]);

  // 스크롤 위치 복원
  const restoreScrollPosition = useCallback(() => {
    const savedPosition = sessionStorage.getItem(`scroll-${key}`);
    if (savedPosition && elementRef.current) {
      elementRef.current.scrollTop = parseInt(savedPosition, 10);
    }
  }, [key]);

  // 컴포넌트 마운트 시 스크롤 위치 복원
  useEffect(() => {
    const timer = setTimeout(() => {
      restoreScrollPosition();
    }, 100); // 약간의 지연을 두어 컨텐츠가 로드된 후 스크롤 위치 복원

    return () => clearTimeout(timer);
  }, [restoreScrollPosition]);

  return {
    elementRef,
    saveScrollPosition,
    restoreScrollPosition,
  };
};
