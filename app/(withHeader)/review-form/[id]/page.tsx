interface Props {
  params: Promise<{ id: string }>;
}

async function ReviewEditFormPage({ params }: Props) {
  // 수정할 게시글 id
  const { id } = await params;
  return <div>{id}</div>;
}

export default ReviewEditFormPage;
