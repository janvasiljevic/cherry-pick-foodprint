import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";

// https://orval.dev/guides/custom-axios

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "https://b80d-88-200-37-213.ngrok-free.app",
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("at");

    console.log("oken", token);

    console.log("hey");

    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  },
  (error) => Promise.reject(error)
);

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
// export type BodyType<BodyData> = CamelCase<BodyType>;
