import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { InfiniteQueryObserverResult } from "@tanstack/react-query";

export const useInfiniteScrollObserver = <T>(
  fetchNextPage: () => Promise<InfiniteQueryObserverResult<T, Error>>,
  hasNextPage: boolean,
) => {
  const { ref: observerRef, inView } = useInView();

  // 무한 스크롤 로직
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return { observerRef };
};
