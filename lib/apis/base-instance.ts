export type BaseInstancePayload = {
  endPoint: string;
  payload: RequestInit;
  params?: URLSearchParams;
};

export interface InstanceInit extends RequestInit {
  endPoint: string;
  params?: URLSearchParams;
  includeAuth?: boolean;
}

export const baseInstance = async ({
  endPoint,
  payload,
  params,
}: BaseInstancePayload) => {
  const baseUrl =
    typeof window === "undefined"
      ? `${process.env.BASE_URL}`
      : `${process.env.NEXT_PUBLIC_VARIABLE_URL}`;

  const response = await fetch(
    `${baseUrl}${endPoint}` + (params && params.size > 0 ? `?${params}` : ""),
    payload,
  );

  return response;
};
