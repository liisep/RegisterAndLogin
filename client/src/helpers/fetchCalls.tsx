import { HeaderToken, RegObj, LoginObj } from "../interfaces/Interfaces";

export const fetchGetData = async (url: string, method: string, headers: HeaderToken) => {
  const res = await fetch(url, {
    method: method,
    headers: { ...headers }
  });
  return await res.json();
};

export const fetchPostData = async (url: string, body: RegObj | LoginObj) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return await res.json();
};