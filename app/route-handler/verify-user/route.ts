import { cookies } from "next/headers";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/identifier";

export async function GET() {
  let response = new Response(null, { status: 401 });
  const cookieStore = await cookies();
  const [access_token, refresh_token] = [
    cookieStore.get(ACCESS_TOKEN)?.value,
    cookieStore.get(REFRESH_TOKEN)?.value,
  ];

  if (access_token) {
    response = await fetch(
      `${process.env.BASE_URL}/api/v1/auth/tokens/verify`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ token: access_token }),
      },
    );
  }

  if (refresh_token && response.status === 401) {
    response = await fetch(
      `${process.env.BASE_URL}/api/v1/auth/tokens/refresh`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: `refresh_token=${refresh_token}`,
        },
        cache: "no-store",
      },
    );

    const setCookies = response.headers.getSetCookie();

    response = new Response(null, {
      status: 200,
      headers: { "Set-Cookie": `${setCookies.join(", ")}` },
    });
  }

  return response;
}
