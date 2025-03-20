import { BookCard } from "@/components/book-card";
import Comments from "@/components/comments/comments";
import TUIViewer from "@/components/tui-editor/tui-viewer";
import { getArticleDetail } from "@/lib/apis/article/retrieveSingleArticle";
import { getMyProfile } from "@/lib/apis/profile/myProfile";

import Info from "../components/info";
import Recommend from "../components/recommend";

interface Props {
  params: Promise<{ id: string }>;
}

async function ReviewDetail({ params }: Props) {
  const { id } = await params;
  const [article, profile] = await Promise.all([
    getArticleDetail(id),
    getMyProfile(),
  ]);

  // TODO: body가 문자열이 아닌 게시글이 있어서 배포 후에는 삭제할것
  const parseJSON = (body: string) => {
    const content = JSON.parse(body);

    if (typeof content === "string") {
      return content;
    } else {
      return body;
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-8">
      <Info article={article} />
      <BookCard
        title={article.book.title}
        image={article.book.thumbnail_url ?? ""}
        author={article.book.author}
        description={article.book.description}
      />
      <TUIViewer initialValue={parseJSON(article.body)} />
      {profile != null && (
        <Recommend
          articleId={article.id}
          recommendCount={parseInt(article.recommend_count)}
          profile={profile}
        />
      )}
      <Comments
        articleId={id}
        isUser={Boolean(profile)}
      />
    </div>
  );
}

export default ReviewDetail;
