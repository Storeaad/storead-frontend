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

    const { status, data, error, isFetching, isPlaceholderData } = useProfileArticlesQuery(page-1);

    useEffect(() => {
        if (!isPlaceholderData && data?.next) {
            queryClient.prefetchQuery({
                queryKey: ['articles', page],
                queryFn: () => getArticleList(new URLSearchParams(`?page=${page + 1}`)),
            })
        }
    }, [data, isPlaceholderData, page, queryClient]);

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
                    <PaginationPrevious href={`${pathname}?page=${page-1}`} isActive={page > 1} />
                </PaginationItem>
                {Boolean(data?.previous) && page > 4 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                {/* {페이지 버튼들} */}
                {Boolean(data?.next) && <PaginationItem><PaginationEllipsis /></PaginationItem> }
                <PaginationItem>
                    <PaginationNext href={`${pathname}?page=${page+1}`} isActive={Boolean(data?.next)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </div>
}

export default ProfileArticles;