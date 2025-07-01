import SearchResultLayout from "@/components/article-search/search-result-layout/search-result-layout";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function SearchPage({ searchParams }: Props) {
  const { query } = await searchParams;

  return (
    <div className="p-8 w-full flex flex-col gap-8 items-center">
      {/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {`"${query}" 검색결과`}
      </h1> */}
      <SearchResultLayout />
    </div>
  );
}

export default SearchPage;
