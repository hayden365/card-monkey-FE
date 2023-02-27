import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
const { VITE_URL } = import.meta.env;

const cookies = new Cookies();

export const setCookie = (token: string) => {
  return cookies.set("token", token, {
    path: "/",
    maxAge: 1,
  });
};

export const getCookie = () => {
  const token = cookies.get("token");
  return token;
};

export const removeCookie = () => {
  return cookies.set("token", "", {
    path: "/",
    maxAge: -1,
  });
};
