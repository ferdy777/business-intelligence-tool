import { axiosConfig, RequestConfig } from "@/config/axios";
import { Api } from "@/types";
import { AxiosResponse } from "axios";

export const getAnalyticsService = async (
  config?: RequestConfig<Api.Dashboard.GetAnalytics.Response>
): Promise<Api.Dashboard.GetAnalytics.Response> => {
  return axiosConfig
    .get<
      Api.Dashboard.GetAnalytics.Response,
      AxiosResponse<Api.Dashboard.GetAnalytics.Response>,
      Api.Dashboard.GetAnalytics.Response
    >("/analytics", config)
    .then((res) => res.data);
};
