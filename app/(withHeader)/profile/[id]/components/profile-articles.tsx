"use client"

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useProfileArticlesQuery } from "../hooks/query/useProfileArticlesQuery";
import { getArticleList } from "@/lib/apis/article/articleList";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

function ProfileArticles() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(parseInt(searchParams.get("page") ?? "1"));

    const { status, data, error, isFetching, isPlaceholderData } = useProfileArticlesQuery(page - 1);
    
      // 페이지 버튼 생성 함수
  const renderPageButtons = () => {
    const buttons = [];
    
    // 현재 페이지를 중심으로 이전, 현재, 다음 페이지 3개 표시
    const startPage = Math.max(1, page - 1);
    const endPage = page + 1;
    
    for (let i = startPage; i <= endPage; i++) {
      // 마지막 페이지를 넘어가면 중단 (data?.next가 없으면 현재가 마지막 페이지)
      if (i > page && !data?.next) break;
      
      // 페이지가 1보다 작으면 건너뛰기
      if (i < 1) continue;
      
      buttons.push(
        <PaginationItem key={i}>
          <PaginationLink 
            href={`${pathname}?page=${i}`} 
            isActive={i === page}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return buttons;
  };

    useEffect(() => {
        const newPage = searchParams.get("page");

        if (!isPlaceholderData && data?.next) {
            queryClient.prefetchQuery({
                queryKey: ['articles', page],
                queryFn: () => getArticleList(new URLSearchParams(`?page=${page + 1}`)),
            })
        }

        if (newPage && parseInt(newPage) !== page) {
            setPage(parseInt(newPage));
        }
    }, [data, isPlaceholderData, page, queryClient, searchParams]);

    return <div className="w-full h-full">
        {status === 'pending' ? <Skeleton className="w-500 h-500" />
            : status === 'error'
                ? <div>Error: {error.message}</div>
                : <div>{data.results.map((article) => (
                    <p key={article.id}>{article.title}</p>))}
                </div>}
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`${pathname}?page=${page-1}`}/>
                </PaginationItem>
                {Boolean(data?.previous) && page > 4 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                {renderPageButtons()}
                {Boolean(data?.next) && <PaginationItem><PaginationEllipsis /></PaginationItem> }
                <PaginationItem>
                    <PaginationNext href={`${pathname}?page=${page+1}`}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
}

export default ProfileArticles;