import customAxios from "../../global-config/axios.ts";

import { LoginFormRequest } from "./login-types.ts";

export const LogIn = async (body: LoginFormRequest) => {
  const response = await customAxios.post("auth/login", {
    ...body,
    clientId: 1,
  });
  const jwt = response.data.data.token;

  localStorage.setItem("jwt", jwt);

  return response;
};
