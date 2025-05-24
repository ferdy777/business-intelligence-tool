import { axiosConfig, RequestConfig } from "@/config/axios";
import { Api } from "@/types";
import { AxiosResponse } from "axios";

export const loginService = async (
  payload: Api.Auth.Login.Request,
  config?: RequestConfig<Api.Auth.Login.Request>
): Promise<Api.Auth.Login.Response> => {
  return axiosConfig
    .post<
      Api.Auth.Login.Response,
      AxiosResponse<Api.Auth.Login.Response>,
      Api.Auth.Login.Request
    >("/login", payload, config)
    .then((res) => res.data);
};

export const registerService = async (
  payload: Api.Auth.Register.Request,
  config?: RequestConfig<Api.Auth.Register.Request>
): Promise<Api.Auth.Register.Response> => {
  return axiosConfig
    .post<
      Api.Auth.Register.Response,
      AxiosResponse<Api.Auth.Register.Response>,
      Api.Auth.Register.Request
    >("/register", payload, config)
    .then((res) => res.data);
};
