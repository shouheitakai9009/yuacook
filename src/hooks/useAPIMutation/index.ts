import { ZodError } from "zod";
import { useToasty } from "../useToasty";
import { useState } from "react";

const isZodErrorInResponse = <TResponse = Response>(
  response: Awaited<TResponse>
): boolean => {
  return (
    typeof response === "object" &&
    response &&
    "name" in response &&
    "issues" in response &&
    response?.name === "ZodError" &&
    Array.isArray(response?.issues) &&
    response?.issues.length > 0
  );
};

export const useAPIMutation = ({
  requestFn,
}: {
  requestFn: <TResponse = Response, TParams = {}>(
    params?: TParams | undefined
  ) => Promise<TResponse>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { errorOnToast } = useToasty();
  const mutation = async <TResponse = Response, TParams = {}>(
    params?: TParams
  ) => {
    try {
      setIsLoading(true);
      const response = await requestFn<TResponse, TParams>(params);
      if (isZodErrorInResponse(response)) {
        const error = response as ZodError;
        error.issues.forEach((issue) => {
          errorOnToast(issue.message);
        });
        throw error;
      }
      setIsLoading(false);
      return response;
    } catch (e) {
      if (e instanceof Error) {
        errorOnToast(e.message);
      }
      setIsLoading(false);
      throw e;
    }
  };

  return {
    mutation,
    isLoading,
  };
};
