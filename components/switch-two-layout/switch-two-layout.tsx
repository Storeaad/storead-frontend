"use client";

import React, { ReactNode, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  firstLayout: ReactNode;
  secondLayout: ReactNode;
}

export default function SwitchTwoLayout({ firstLayout, secondLayout }: Props) {
  const [isMainVisible, setIsMainVisible] = useState(() => {
    // 초기 상태를 sessionStorage에서 가져오기
    if (typeof window !== "undefined") {
      const savedState = sessionStorage.getItem(
        "switchTwoLayout:isMainVisible",
      );
      return savedState ? JSON.parse(savedState) : true;
    }
    return true;
  });
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");

  // 상태 변경 시 sessionStorage에 저장
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "switchTwoLayout:isMainVisible",
        JSON.stringify(isMainVisible),
      );
    }
  }, [isMainVisible]);

  const handleScrollToReviews = () => {
    setScrollDirection("down");
    setIsMainVisible(false);
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      // 메인 페이지일 때
      if (isMainVisible) {
        if (event.deltaY > 0) {
          setScrollDirection("down");
          setIsMainVisible(false);
        }
        return;
      }

      // 서평 목록 페이지일 때 - ReviewList 내부의 스크롤 컨테이너를 찾음
      const reviewListContainer = document.querySelector(
        "[data-review-list-container]",
      ) as HTMLDivElement;
      if (!reviewListContainer) return;

      // 서평 목록의 스크롤 위치 확인
      const isAtTop = reviewListContainer.scrollTop === 0;

      if (event.deltaY < 0 && isAtTop) {
        // 서평 목록의 최상단에서 위로 스크롤할 때 메인 화면으로 전환
        setScrollDirection("up");
        setIsMainVisible(true);
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("wheel", handleScroll, { passive: false });

    // 클린업 함수
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isMainVisible]);

  const pageVariants = {
    initial: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: scrollDirection === "down" ? -50 : 50,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isMainVisible && (
          <motion.div
            key="main-page"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className="absolute top-0 left-0 w-full h-full"
          >
            {/* 메인 페이지 컨텐츠 */}
            {React.cloneElement(firstLayout as React.ReactElement, {
              onScrollToReviews: handleScrollToReviews,
            })}
          </motion.div>
        )}

        {!isMainVisible && (
          <motion.div
            key="posts-page"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className="absolute top-0 left-0 w-full h-full"
          >
            {/* 전체 게시글 페이지 컨텐츠 */}
            {secondLayout}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
