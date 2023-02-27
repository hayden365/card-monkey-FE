import axios from "axios";
import { setCookie } from "../utils/cookie";

const { VITE_URL } = import.meta.env;

class MonkeySetToken {
  axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: VITE_URL,
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });
  }

  /** 회원가입 */
  async signUp({ userId, password, name, benefit }: SignType) {
    return this.axiosInstance
      .post("/signup", {
        userId: userId,
        password: password,
        name: name,
        benefit: benefit,
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /** 로그인 */
  async signIn({ userId, password }: LoginType) {
    return this.axiosInstance
      .post("/login", {
        userId: userId,
        password: password,
      })
      .then((result) => {
        const res = result.data;
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            name: res.name,
            role: res.role,
            userId: res.userId,
          }),
        );
        setCookie(res.token);
        return res;
      })
      .catch((error) => console.log(error));
  }

  /** 아이디 중복 체크 */
  async idCheck(userId: string) {
    return this.axiosInstance
      .post("/userIdValidation", {
        userId: userId,
      })
      .then((result) => result.data)
      .catch((error) => console.log(error));
  }
}

const setTokenApi = new MonkeySetToken();

export default setTokenApi;
