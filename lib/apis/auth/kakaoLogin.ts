import { serverInstance } from "../server-instance";

//FIXME: serverInstance를 쓰도록 인스턴스 수정 필요
export const kakaoLogin = async (params: URLSearchParams) => {
  // return serverInstance({
  //   endPoint: `/auth/connections/kakao`,
  //   method: "GET",
  //   params,
  //   includeAuth: false,
  // });
  const { access_token } = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=510fbb712daffaec9d6c9c0f7524e008&redirect_uri=http://localhost:3000/auth/kakao&code=${params.get("code")}`).then(data => data.json())

  return fetch(`http://13.124.59.112:8081/api/v1/auth/kakao`, {
    headers: {
      'Authorization': `${access_token}`,
    }
  })
};
