import { NextRequest, NextResponse } from "next/server";

/**
 * @description 클라이언트에서 GET proxy 요청이 필요한 경우 사용
 */
export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const { slug } = await params;
  const url = `${slug.join("/")}`;

  try {
    const response = await fetch(url);

    return response;
  } catch (error) {
    return new NextResponse("Failed to fetch", { status: 500 });
  }
};
