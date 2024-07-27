declare module "api-domain" {
  export type BookSearchResponse = {
    lastBuildDate: string;
    total: number;
    start: number;
    display: number;
    items: BookDetail[];
  };

  export type BookDetail = {
    title: string;
    link: string;
    image: string;
    author: string;
    discount: string;
    publisher: string;
    pubdate: string;
    isbn: string;
    description: string;
  };

  export type CommonResponse<T> = {
    status_code: number;
    status: boolean;
    results: {
      message: string | null;
      data: T;
    };
  };
}
