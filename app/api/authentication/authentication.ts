/**
 * Generated by orval v6.14.4 🍺
 * Do not edit manually.
 * Cherry Pick - FoodPrint
 * FoodPrint API description
 * OpenAPI spec version: 1.0
 */
import { useMutation } from "@tanstack/react-query";
import type {
  UseMutationOptions,
  MutationFunction,
} from "@tanstack/react-query";
import type { LoginDto } from ".././model";
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
 * @summary Logins the user
 */
export const authControllerLogin = (
  loginDto: BodyType<LoginDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: `/api/auth/login`,
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: loginDto,
    },
    options
  );
};

export const getAuthControllerLoginMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: BodyType<LoginDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof authControllerLogin>>,
  TError,
  { data: BodyType<LoginDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof authControllerLogin>>,
    { data: BodyType<LoginDto> }
  > = (props) => {
    const { data } = props ?? {};

    return authControllerLogin(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type AuthControllerLoginMutationResult = NonNullable<
  Awaited<ReturnType<typeof authControllerLogin>>
>;
export type AuthControllerLoginMutationBody = BodyType<LoginDto>;
export type AuthControllerLoginMutationError = ErrorType<unknown>;

export const useAuthControllerLogin = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof authControllerLogin>>,
    TError,
    { data: BodyType<LoginDto> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getAuthControllerLoginMutationOptions(options);

  return useMutation(mutationOptions);
};