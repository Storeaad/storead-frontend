"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

interface Props {
  firstLayout: ReactNode;
  secondLayout: ReactNode;
}

export default function SwitchTwoLayout({ firstLayout, secondLayout }: Props) {
  const [isMainVisible, setIsMainVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
  //   const lastScrollY = useRef(0);
  //   const isScrollingDown = useRef(false);
  const postsContainerRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     const handleScroll = (event: WheelEvent) => {
  //       // 메인 페이지일 때
  //       if (isMainVisible) {
  //         if (event.deltaY > 0) {
  //           isScrollingDown.current = true;
  //           setIsMainVisible(false);
  //         }
  //         return;
  //       }

  //       // 서평 목록 페이지일 때
  //       const postsContainer = postsContainerRef.current;
  //       if (!postsContainer) return;

  //       // 서평 목록의 스크롤 위치 확인
  //       const isAtTop = postsContainer.scrollTop === 0;

  //       if (event.deltaY < 0 && isAtTop) {
  //         // 서평 목록의 최상단에서 위로 스크롤할 때만 메인 화면으로 전환
  //         isScrollingDown.current = false;
  //         setIsMainVisible(true);
  //       }
  //     };

  //     // 스크롤 이벤트 리스너 추가
  //     window.addEventListener("wheel", handleScroll, { passive: false });

  //     // 클린업 함수
  //     return () => {
  //       window.removeEventListener("wheel", handleScroll);
  //     };
  //   }, [isMainVisible]);
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

      // 서평 목록 페이지일 때
      const postsContainer = postsContainerRef.current;
      if (!postsContainer) return;

      // 서평 목록의 스크롤 위치 확인
      const isAtTop = postsContainer.scrollTop === 0;

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
  //   const mainPageVariants = {
  //     initial: { opacity: 1 },
  //     exit: {
  //       opacity: 0,
  //       transition: { duration: 0.5 },
  //     },
  //   };

  //   const allPostsVariants = {
  //     initial: { opacity: 0 },
  //     animate: {
  //       opacity: 1,
  //       transition: { duration: 0.5, delay: 0.3 },
  //     },
  //   };

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
            {firstLayout}
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
            <div
              ref={postsContainerRef}
              className="h-screen p-8 overflow-y-auto"
            >
              {secondLayout}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
