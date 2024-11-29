import { useCallback, useState } from "react";
import { useToasty } from "../useToasty";

export type ApiError = {
  status: number;
  message: string;
};

type State<T> = Promise<
  | {
      error: ApiError;
      data?: undefined;
    }
  | {
      data: T;
      error?: undefined;
    }
>;

type UseServerActions<T, P> = {
  requestFn: (params: P) => State<T>;
};

export const useServerActions = <T, P>(options: UseServerActions<T, P>) => {
  const { requestFn } = options;
  const { errorOnToast } = useToasty();

  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<ApiError | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const execRequest = useCallback(
    async (params: P) => {
      setIsLoading(true);
      const response = await requestFn(params);
      if (response.error) {
        setIsLoading(false);
        setError(response.error);
        errorOnToast(response.error.message);
        throw response.error;
      }
      setData(response.data);
      setIsLoading(false);
      return response.data;
    },
    [requestFn]
  );

  return {
    data,
    error,
    isLoading,
    execRequest,
  };
};
