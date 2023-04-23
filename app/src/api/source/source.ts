/**
 * Generated by orval v6.14.4 🍺
 * Do not edit manually.
 * Cherry Pick - FoodPrint
 * FoodPrint API description
 * OpenAPI spec version: 1.0
 */
import { useQuery } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type { SourceControllerSearchParams } from ".././model";
import { customInstance } from "../../../api/mutator/custom-instance";
import type { ErrorType } from "../../../api/mutator/custom-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

/**
 * @summary Search for sources
 */
export const sourceControllerSearch = (
  params: SourceControllerSearchParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<void>(
    { url: `/api/source/search`, method: "get", params, signal },
    options
  );
};

export const getSourceControllerSearchQueryKey = (
  params: SourceControllerSearchParams
) => [`/api/source/search`, ...(params ? [params] : [])] as const;

export const getSourceControllerSearchQueryOptions = <
  TData = Awaited<ReturnType<typeof sourceControllerSearch>>,
  TError = ErrorType<unknown>
>(
  params: SourceControllerSearchParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof sourceControllerSearch>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryOptions<
  Awaited<ReturnType<typeof sourceControllerSearch>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getSourceControllerSearchQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof sourceControllerSearch>>
  > = ({ signal }) => sourceControllerSearch(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type SourceControllerSearchQueryResult = NonNullable<
  Awaited<ReturnType<typeof sourceControllerSearch>>
>;
export type SourceControllerSearchQueryError = ErrorType<unknown>;

export const useSourceControllerSearch = <
  TData = Awaited<ReturnType<typeof sourceControllerSearch>>,
  TError = ErrorType<unknown>
>(
  params: SourceControllerSearchParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof sourceControllerSearch>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getSourceControllerSearchQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
