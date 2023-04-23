/**
 * Generated by orval v6.14.4 🍺
 * Do not edit manually.
 * Cherry Pick - FoodPrint
 * FoodPrint API description
 * OpenAPI spec version: 1.0
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type {
  Recipe,
  CreateRecipeDto,
  RecipeControllerUnbookmark200,
  RecipeControllerBookmark201,
  RecipeControllerTimelineParams,
  UpdateRecipeDto,
} from ".././model";
import { customInstance } from ".././mutator/custom-instance";
import type { ErrorType, BodyType } from ".././mutator/custom-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

/**
 * @summary Create a new recipe - WIP
 */
export const recipeControllerCreate = (
  createRecipeDto: BodyType<CreateRecipeDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  const formData = new FormData();
  formData.append("description", createRecipeDto.description);
  formData.append("file", createRecipeDto.file);
  if (createRecipeDto.ingredientIds !== undefined) {
    createRecipeDto.ingredientIds.forEach((value) =>
      formData.append("ingredientIds", value)
    );
  }
  formData.append("name", createRecipeDto.name);

  return customInstance<Recipe>(
    {
      url: `/api/recipe`,
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    },
    options
  );
};

export const getRecipeControllerCreateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof recipeControllerCreate>>,
    TError,
    { data: BodyType<CreateRecipeDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof recipeControllerCreate>>,
  TError,
  { data: BodyType<CreateRecipeDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof recipeControllerCreate>>,
    { data: BodyType<CreateRecipeDto> }
  > = (props) => {
    const { data } = props ?? {};

    return recipeControllerCreate(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RecipeControllerCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof recipeControllerCreate>>
>;
export type RecipeControllerCreateMutationBody = BodyType<CreateRecipeDto>;
export type RecipeControllerCreateMutationError = ErrorType<unknown>;

export const useRecipeControllerCreate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof recipeControllerCreate>>,
    TError,
    { data: BodyType<CreateRecipeDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getRecipeControllerCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Unbookmark a recipe by id
 */
export const recipeControllerUnbookmark = (
  id: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<RecipeControllerUnbookmark200>(
    { url: `/api/recipe/bookmark/${id}`, method: "delete" },
    options
  );
};

export const getRecipeControllerUnbookmarkMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof recipeControllerUnbookmark>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof recipeControllerUnbookmark>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof recipeControllerUnbookmark>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return recipeControllerUnbookmark(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RecipeControllerUnbookmarkMutationResult = NonNullable<
  Awaited<ReturnType<typeof recipeControllerUnbookmark>>
>;

export type RecipeControllerUnbookmarkMutationError = ErrorType<unknown>;

export const useRecipeControllerUnbookmark = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof recipeControllerUnbookmark>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getRecipeControllerUnbookmarkMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Bookmark a recipe by id
 */
export const recipeControllerBookmark = (
  id: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<RecipeControllerBookmark201>(
    { url: `/api/recipe/bookmark/${id}`, method: "post" },
    options
  );
};

export const getRecipeControllerBookmarkMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof recipeControllerBookmark>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof recipeControllerBookmark>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof recipeControllerBookmark>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return recipeControllerBookmark(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RecipeControllerBookmarkMutationResult = NonNullable<
  Awaited<ReturnType<typeof recipeControllerBookmark>>
>;

export type RecipeControllerBookmarkMutationError = ErrorType<unknown>;

export const useRecipeControllerBookmark = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof recipeControllerBookmark>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getRecipeControllerBookmarkMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary This will be the fancy AI Search - TODO
 */
export const recipeControllerSearch = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<string>(
    { url: `/api/recipe/search`, method: "get", signal },
    options
  );
};

export const getRecipeControllerSearchQueryKey = () =>
  [`/api/recipe/search`] as const;

export const getRecipeControllerSearchQueryOptions = <
  TData = Awaited<ReturnType<typeof recipeControllerSearch>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof recipeControllerSearch>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryOptions<
  Awaited<ReturnType<typeof recipeControllerSearch>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getRecipeControllerSearchQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof recipeControllerSearch>>
  > = ({ signal }) => recipeControllerSearch(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type RecipeControllerSearchQueryResult = NonNullable<
  Awaited<ReturnType<typeof recipeControllerSearch>>
>;
export type RecipeControllerSearchQueryError = ErrorType<unknown>;

export const useRecipeControllerSearch = <
  TData = Awaited<ReturnType<typeof recipeControllerSearch>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof recipeControllerSearch>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getRecipeControllerSearchQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Get timeline - WIP
 */
export const recipeControllerTimeline = (
  params?: RecipeControllerTimelineParams,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<Recipe[]>(
    { url: `/api/recipe/timeline`, method: "get", params, signal },
    options
  );
};

export const getRecipeControllerTimelineQueryKey = (
  params?: RecipeControllerTimelineParams
) => [`/api/recipe/timeline`, ...(params ? [params] : [])] as const;

export const getRecipeControllerTimelineQueryOptions = <
  TData = Awaited<ReturnType<typeof recipeControllerTimeline>>,
  TError = ErrorType<unknown>
>(
  params?: RecipeControllerTimelineParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof recipeControllerTimeline>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryOptions<
  Awaited<ReturnType<typeof recipeControllerTimeline>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getRecipeControllerTimelineQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof recipeControllerTimeline>>
  > = ({ signal }) => recipeControllerTimeline(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type RecipeControllerTimelineQueryResult = NonNullable<
  Awaited<ReturnType<typeof recipeControllerTimeline>>
>;
export type RecipeControllerTimelineQueryError = ErrorType<unknown>;

export const useRecipeControllerTimeline = <
  TData = Awaited<ReturnType<typeof recipeControllerTimeline>>,
  TError = ErrorType<unknown>
>(
  params?: RecipeControllerTimelineParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof recipeControllerTimeline>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getRecipeControllerTimelineQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Get a recipe by id
 */
export const recipeControllerFindOne = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<Recipe>(
    { url: `/api/recipe/${id}`, method: "get", signal },
    options
  );
};

export const getRecipeControllerFindOneQueryKey = (id: string) =>
  [`/api/recipe/${id}`] as const;

export const getRecipeControllerFindOneQueryOptions = <
  TData = Awaited<ReturnType<typeof recipeControllerFindOne>>,
  TError = ErrorType<unknown>
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof recipeControllerFindOne>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryOptions<
  Awaited<ReturnType<typeof recipeControllerFindOne>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getRecipeControllerFindOneQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof recipeControllerFindOne>>
  > = ({ signal }) => recipeControllerFindOne(id, requestOptions, signal);

  return { queryKey, queryFn, enabled: !!id, ...queryOptions };
};

export type RecipeControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof recipeControllerFindOne>>
>;
export type RecipeControllerFindOneQueryError = ErrorType<unknown>;

export const useRecipeControllerFindOne = <
  TData = Awaited<ReturnType<typeof recipeControllerFindOne>>,
  TError = ErrorType<unknown>
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof recipeControllerFindOne>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getRecipeControllerFindOneQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Update a recipe by id - WIP
 */
export const recipeControllerUpdate = (
  id: string,
  updateRecipeDto: BodyType<UpdateRecipeDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<string>(
    {
      url: `/api/recipe/${id}`,
      method: "patch",
      headers: { "Content-Type": "application/json" },
      data: updateRecipeDto,
    },
    options
  );
};

export const getRecipeControllerUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof recipeControllerUpdate>>,
    TError,
    { id: string; data: BodyType<UpdateRecipeDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof recipeControllerUpdate>>,
  TError,
  { id: string; data: BodyType<UpdateRecipeDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof recipeControllerUpdate>>,
    { id: string; data: BodyType<UpdateRecipeDto> }
  > = (props) => {
    const { id, data } = props ?? {};

    return recipeControllerUpdate(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type RecipeControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof recipeControllerUpdate>>
>;
export type RecipeControllerUpdateMutationBody = BodyType<UpdateRecipeDto>;
export type RecipeControllerUpdateMutationError = ErrorType<unknown>;

export const useRecipeControllerUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof recipeControllerUpdate>>,
    TError,
    { id: string; data: BodyType<UpdateRecipeDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getRecipeControllerUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
