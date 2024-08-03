import SearchResultLayout from "@/components/article-search/search-result-layout/search-result-layout";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

function SearchPage({ searchParams: { query } }: Props) {
  return (
    <div className="p-8 w-full flex flex-col gap-8 items-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {`"${query}" 검색결과`}
      </h1>
      <SearchResultLayout />
    </div>
  );
}

export default SearchPage;
