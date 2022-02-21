import { AccessTokenPayload } from "@customTypes/token";
import jwt from "jwt-decode";
const AUTH_TOKEN = "accessToken";
export const getToken = () => localStorage.getItem(AUTH_TOKEN);
export const setToken = (token: string) =>
  localStorage.setItem(AUTH_TOKEN, token);
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN);

export function getTokenPayload() {
  const token = getToken();
  if (!token) return null;

  const payload = jwt(token) as AccessTokenPayload;
  return payload;
}
